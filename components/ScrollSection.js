'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {fetchWpImageById} from '../app/utils/getImage';  //adjust this import as per your project

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSection({ texts }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [images, setImages] = useState([]);

  const cursorSVG = `bg-[url("data:image/svg+xml,%3Csvg%20width%3D'60'%20height%3D'60'%20viewBox%3D'0%200%2060%2060'%20fill%3D'none'%20xmlns%3D'http://www.w3.org/2000/svg'%3E%3Ccircle%20cx%3D'30'%20cy%3D'30'%20r%3D'18'%20stroke%3D'gray'%20stroke-width%3D'1'%20fill%3D'none'/%3E%3C/svg%3E")]`;

  // ✅ Load dynamic image URLs
  useEffect(() => {
    const loadImages = async () => {
      const ids = texts.find(t => t.type === 'images')?.value
        ?.split(',')
        .map(id => id.trim())
        .filter(Boolean)
        .slice(0, 5); // Optional: limit to first 5

      if (!ids?.length) return;

      const fetched = await Promise.all(
        ids.map(async id => {
          const img = await fetchWpImageById(id);
          return img?.url || '';
        })
      );

      setImages(fetched.filter(Boolean));
    };

    loadImages();
  }, [texts]);

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

  // GSAP scroll animation
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
    <section ref={containerRef} className="relative w-full bg-white overflow-hidden pt-16 md:pt-24">
      {/* Cursor */}
      <div
        ref={cursorRef}
        className={clsx(
          'pointer-events-none absolute z-50 w-20 h-20 bg-no-repeat bg-contain hidden md:block transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200',
          cursorSVG,
          { 'opacity-100': isHovering, 'opacity-0': !isHovering }
        )}
      />

      {/* Title */}
      <div ref={textRef} className="text-center max-w-3xl mx-auto px-4 md:px-8 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
           <p>{texts.filter((txt)=>txt.type==='text_content')[5]?.value}</p>
        </h2>
      </div>

      {/* Images */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 px-10 py-6 md:px-20 md:py-10 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent"
        style={{ scrollbarWidth: 'thin' }}
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
              className={clsx('shrink-0 relative group transition-transform duration-300', baseWidth)}
            >
              <img
                src={src}
                alt={`Image ${idx}`}
                className="relative object-cover w-80vw h-[300px] sm:h-[400px] md:h-[600px] group-hover:scale-105"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
