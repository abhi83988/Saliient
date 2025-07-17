'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

const brands = Array(10).fill('http://themenectar.com/demo/dummy-data-imgs/tn-sample-logo-grey.png'); 

export default function BrandSection() {
  const textRef = useRef(null);
  const imagesRef = useRef([]);

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

    gsap.from(imagesRef.current, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
      },
    });
  }, []);

  return (
    <section className="py-32 bg-white">
      <div className="container w-full mx-auto px-6 py-24">
        <h2
          ref={textRef}
          className="text-3xl md:text-5xl font-semibold text-black  gap-5"
        >
          We've worked with some<br />of the biggest brands
        </h2>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {brands.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Brand Logo"
              className="opacity-25  w-full  max-w-[200px] mx-auto"
              ref={el => (imagesRef.current[i] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
