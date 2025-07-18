'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  '/assets/scroll_1.jpg',
  '/assets/scroll_2.jpg',
  '/assets/scroll_3.jpg',
  '/assets/scroll_4.jpg',
  '/assets/scroll_5.jpg',
];

export default function ScrollSection() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const cursorSVG = `bg-[url("data:image/svg+xml,%3Csvg%20width%3D'60'%20height%3D'60'%20viewBox%3D'0%200%2060%2060'%20fill%3D'none'%20xmlns%3D'http://www.w3.org/2000/svg'%3E%3Ccircle%20cx%3D'30'%20cy%3D'30'%20r%3D'18'%20stroke%3D'gray'%20stroke-width%3D'1'%20fill%3D'none'/%3E%3C/svg%3E")]`;

  // Cursor movement
  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;

    if (!container || !cursor) return;

    const moveCursor = (e) => {
      const bounds = container.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    };

    container.addEventListener('mousemove', moveCursor);
    return () => container.removeEventListener('mousemove', moveCursor);
  }, []);

  // Scroll with mouse move
  useEffect(() => {
    const container = containerRef.current;
    const scroll = scrollRef.current;

    const handleMouseMove = (e) => {
      if (!container || !scroll || window.innerWidth < 768) return;

      const bounds = container.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const percent = mouseX / bounds.width;

      const maxScroll = scroll.scrollWidth - bounds.width;
      scroll.scrollLeft = maxScroll * percent;
    };

    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP scroll animation for text area
  useEffect(() => {
    gsap.from(textRef.current, {
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
      },
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white overflow-hidden pt-16 md:pt-24"
    >
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={clsx(
          'pointer-events-none absolute z-50 w-20 h-20 bg-no-repeat bg-contain hidden md:block transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200',
          cursorSVG,
          { 'opacity-100': isHovering, 'opacity-0': !isHovering }
        )}
      />

      {/* Text Area */}
      <div
        ref={textRef}
        className="text-center max-w-3xl mx-auto px-4 md:px-8 mb-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
          A vibrant work culture that flows with creativity is our secret
        </h2>
        <p className="text-gray-600 text-lg">
          Our team thrives in an atmosphere of collaboration and bold ideas.
        </p>
      </div>

      {/* Scrollable Images */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 px-10 py-6 md:px-20 md:py-10 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent"
        style={{
          scrollbarWidth: 'thin',
        }}
      >
        {images.map((src, idx) => {
          let baseWidth = 'w-[80vw] sm:w-[60vw] md:w-[30vw]';
          if (idx === 0) baseWidth = 'w-[90vw] sm:w-[70vw] md:w-[40vw] lg:w-[15vw]';
          if (idx === 3) baseWidth = 'w-[60vw] sm:w-[50vw] md:w-[35vw] lg:w-[15vw]';

          return (
            <div
              key={idx}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={clsx(
                'shrink-0 relative group transition-transform duration-300',
                baseWidth
              )}
            >
              <Image
                src={src}
                alt={`Image ${idx}`}
                width={800}
                height={600}
                className="relative object-cover w-full h-[300px] sm:h-[400px] md:h-[600px] group-hover:scale-105"
              />
            </div>
          );
        })}
      </div>

      {/* Thin Decorative Scroll Line
      <div className="h-[1px] bg-black w-[80vw] mx-auto mt-6" /> */}
    </section>
  );
}
