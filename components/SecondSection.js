"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
gsap.registerPlugin(ScrollTrigger)
export default function SecondSection() {
  const imageRef = useRef(null)
  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
      }
    )
  }, [])
  const textRef = useRef(null);

useEffect(() => {
  gsap.fromTo(
    textRef.current,
    {
      y: 50,
      opacity: 0,
      scale: 0.95,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.7,
      stagger: 0.2,
    }
  );
}, []);

  return (
<section className="py-20 px-5 md:px-20 bg-white">
<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image */}
<div ref={imageRef} className="w-full h-full">
<Image
            src = "/assets/sectionsection.jpg"
            alt="People"
            width={800}
            height={600}
            className=" w-40vw h-auto object-cover shadow-lg"
          />
</div>
        {/* Content */}
<div ref={textRef} className="space-y-6 ">
<h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            We can take your <br /> business to the next level
</h2>
<p className="text-gray-700 text-base leading-relaxed">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
            there live the blind texts. Separated they live in Bookmarksgrove right at the coast of
            the Semantics, a large language ocean.
</p>
<a href="#" className="text-orange-500 font-medium hover:underline">
            → View Services
</a>
<hr className="my-6 border-gray-300" />
          {/* Testimonial */}
<blockquote className="text-gray-800 italic text-lg">
            “I had a great experience with Salient from start to finish.”
</blockquote>
<div className="flex items-center gap-3 mt-4">
<div className="w-10 h-10 rounded-full overflow-hidden shadow-sm relative">
  <Image
    src="/assets/section2_l.jpg"
    alt="User"
    fill
    className="object-cover"
  />
</div>

<div className="text-sm">
<p className="font-bold text-gray-900">Phil Martinez</p>
<p className="text-gray-600">Designer, Owl Eyes</p>
</div>
</div>
</div>
</div>
</section>
)}
 