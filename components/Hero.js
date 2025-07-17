"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Hero() {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, []);

  return (
    <section
      className="relative min-h-[95vh] bg-cover bg-center px-5 md:px-10 pt-24"
      style={{
        backgroundImage:
          'url("./assets/bg.jpg")',
      }}
    >
      {/* 🔳 Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

      {/* Text Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-white">
        <div
          ref={textRef}
          className="text-white w-full space-y-6 max-w-3xl"
        >
          <h1 className="text-4xl mt-20 md:text-5xl font-bold leading-tight ">
            Breathing life into <br /> brands through <br /> stunning design
          </h1>
          <Link href="#">
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full transition-all duration-300">
              → Discover More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
