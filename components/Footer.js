'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <footer className="bg-black text-white px-4 md:px-20 py-16 w-full">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Animated Heading & CTA */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center md:text-left"
          >
            Enough Talk, Let&apos;s Build<br />
            Something Together
          </h2>

          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300  ">
            Reach out now
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700" />

        {/* Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-400 text-xl">
          {/* Column 1: Copyright */}
          <div>
            <p className="mb-2">&copy; 2019 Salient WordPress Theme.</p>
            <p className="mb-2">Built with love in New York</p>
            <p>All rights reserved.</p>
          </div>

          
          {/* Column 2: Archives */}
          <div>
            <h4 className="text-orange-500 font-semibold mb-2 text-2xl">Archives</h4>
            <ul className="space-y-1 text-xl text-white">
              {['July 2025', 'September 2019', 'July 2019', 'April 2019', 'March 2019', 'February 2019'].map((item, index) => (
                <li key={index} className="relative group cursor-pointer w-fit">
                  <span>{item}</span>
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
                </li>
              ))}
            </ul>
          </div>


          {/* Column 3: Categories */}
          <div>
            <h4 className="text-orange-500 font-semibold mb-2 text-2xl">Categories</h4>
            <ul className="space-y-1 text-xl text-white">
              {["Food for thought", "Gaming", "Music", "Uncategorized"].map((item, i) => (
                <li
                  key={i}
                  className="transition-all duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Recent Posts */}
          <div>
            <h4 className="text-orange-500 font-semibold mb-2 text-2xl">Recent Posts</h4>
            <ul className="space-y-1 text-xl text-white">
              {["Hello world!", "Wake up and smell the roses", "Doing a cross country road trip", "We encountered a food paradise"].map((item, i) => (
                <li
                  key={i}
                  className="transition-all duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
