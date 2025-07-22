'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

export default function BrandSection({ texts }) {
  const textRef = useRef(null);
  const imagesRef = useRef([]);

  const brands = texts
    .filter(t => t.type === 'image_url')
    .splice(16, 26)
    .map(t => t.value.trim());

  useEffect(() => {
    gsap.from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
      },
    });

    imagesRef.current.forEach((img, i) => {
      if (img) {
        gsap.fromTo(
          img,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: img,
              start: 'top 90%',
            },
          }
        );
      }
    });
  }, []);

  return (
    <section className="py-32 bg-white">
      <div className="container w-full mx-auto px-6 py-24">
        <h2
          ref={textRef}
          className="text-3xl md:text-5xl font-semibold text-black gap-5"
        >
          <p>{texts.filter((txt) => txt.type === 'text_content')[6]?.value}</p>
        </h2>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {brands.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Brand ${i + 1}`}
              className="opacity-25 w-full max-w-[200px] mx-auto"
              ref={(el) => (imagesRef.current[i] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
