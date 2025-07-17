"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FourthSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(paragraphsRef.current, {
        x: -30,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: paragraphsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 md:px-16 py-16 bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Text Column */}
        <div>
          <h2
            ref={headingRef}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-10"
          >
            Our company mission is <br />
            to exceed expectations
          </h2>

          <div
            ref={paragraphsRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base sm:text-[18px] text-black leading-relaxed"
          >
            <ul className="space-y-3">
              <li>• 275+ premium section templates to mix and match</li>
              <li>• Page builder with front-end and back-end editing</li>
              <li>• Massive element library with extensive options</li>
            </ul>
            <ul className="space-y-3">
              <li>• 275+ premium section templates to mix and match</li>
              <li>• Page builder with front-end and back-end editing</li>
              <li>• Updated frequently with new features</li>
            </ul>
          </div>

          <div className="mt-6 text-orange-500 font-bold text-sm hover:underline cursor-pointer">
            ← Meet The Team
          </div>
        </div>

        {/* Right Image Column (unchanged from your original) */}
        <div ref={imageRef}>
          <img
            src="http://localhost/wordpress/wp-content/uploads/2019/09/sheng-li-KC5x7jyd33U-unsplash-small.jpg"
            alt="Mission"
            className="w-150 h-auto object-cover shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
