'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const images = [
  'http://localhost/wordpress/wp-content/uploads/2019/09/v2osk-pQ7GIGO6esE-unsplash.jpg',
  'http://localhost/wordpress/wp-content/uploads/2019/09/andre-benz-ITzzbdwnCvY-unsplash.jpg',
  'http://localhost/wordpress/wp-content/uploads/2019/09/blake-wisz-q3o_8MteFM0-unsplash.jpg',
  'http://localhost/wordpress/wp-content/uploads/2019/09/room-mt8G98XVxlg-unsplash.jpg',
  'http://localhost/wordpress/wp-content/uploads/2019/09/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg',
];

export default function ScrollSection() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const cursorSVG = `bg-[url("data:image/svg+xml,%3Csvg%20width%3D'60'%20height%3D'60'%20viewBox%3D'0%200%2060%2060'%20fill%3D'none'%20xmlns%3D'http://www.w3.org/2000/svg'%3E%3Ccircle%20cx%3D'30'%20cy%3D'30'%20r%3D'18'%20stroke%3D'gray'%20stroke-width%3D'1'%20fill%3D'none'/%3E%3C/svg%3E")]`;

  // Move cursor within container
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

  // Scroll image container with mouse (desktop only)
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

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[70vh] md:h-[70vh] overflow-hidden bg-white lg:w-full h-screen"
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

      {/* Scrollable Images */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 px-10 py-6 md:px-20 md:py-10"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
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

      {/* Decorative Scrollbar Line */}
      <div className="bottom-0 left-10 md:left-20 w-[80vw] h-[2px] bg-black lg: mt-40 bottom-0 " />
    </section>
  );
}
