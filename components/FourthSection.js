"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {fetchWpImageById} from "../app/utils/getImage";

gsap.registerPlugin(ScrollTrigger);

export default function FourthSection({ texts }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphsRef = useRef(null);
  const imageRef = useRef(null);

  const [heading, setHeading] = useState("");
  const [listItems, setListItems] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

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
useEffect(() => {
  const loadData = async () => {
    const headingBlock = texts.filter(t => t.type === "text_content")[3]; // 3rd heading
    if (headingBlock) setHeading(headingBlock.value);

    const lis = texts.filter(t => t.type === "li").map(t => t.value);
    setListItems(lis);

    const imageObj = texts.filter(t => t.type === "background_image")[1]; // 1st image
    if (imageObj) {
      const img = await fetchWpImageById(imageObj.value);
      setImageUrl(img?.url || "");
    }
  };

  if (texts?.length) loadData();
}, [texts]);


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
            {heading.split(" ").slice(0, 4).join(" ")} <br />
            {heading.split(" ").slice(4).join(" ")}
          </h2>

          <div
            ref={paragraphsRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base sm:text-[18px] text-black leading-relaxed"
          >
            <ul className="space-y-3">
              {listItems.slice(0, 3).map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
            <ul className="space-y-3">
              {listItems.slice(3).map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 text-orange-500 font-bold text-sm hover:underline cursor-pointer">
            {texts.filter((txt)=>txt.type==='link_text')[2]?.value}
          </div>
        </div>

        {/* Right Image Column */}
        <div ref={imageRef}>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Section"
              className="w-full max-w-sm md:max-w-md h-auto object-cover  shadow-md"
            />
          )}
        </div>
      </div>
    </section>
  );
}
