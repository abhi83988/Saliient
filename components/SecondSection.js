"use client"
 
import React, { useEffect, useRef, useState } from 'react'
 
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchWpImageById, getImage } from '../app/utils/getImage';
 
gsap.registerPlugin(ScrollTrigger);
 
 
const SecondSection = ({images,texts}) => {
    const section3ref = useRef(null)
    const section3imgref = useRef(null)
    const section3heading = useRef(null)
    const section3text = useRef(null)
    const section3bottom = useRef(null)
 
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                section3imgref.current,
                { scale: 0.2, opacity: 0 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    stagger: 0.3,
                    scrollTrigger: {
                        trigger: section3ref.current,
                        start: "top 60%", // when top of section hits 80% of viewport height
                        toggleActions: "play none none reverse",
                        // markers: true
                    },
                }
            )
            gsap.fromTo([section3heading.current, section3text.current, section3bottom.current], {
                opacity: 0, y: 100
            }, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: section3ref.current,
                    start: "top 60%", // when top of section hits 80% of viewport height
                    toggleActions: "play none none reverse",
                    // markers: true
                },
 
            })
        }, section3ref)
 
        return () => ctx.revert()
    }, [])
 
    // const section3image = images.find(img=> img.id===10)
 
      const [section3BgUrl, setSection3BgUrl] = useState(null);
      const [section3BottomImg, setSection3BottomImg] = useState(null)
      useEffect(() => {
        const loadBackgroundImage = async () => {
          const bgImg = texts.filter(item => item.type === 'background_image')[0];
          const bottomImg = texts.filter(item => item.type === 'image')[2];
          if (bgImg?.value) {
            const imageData = await fetchWpImageById(bgImg.value);
            setSection3BgUrl(imageData?.url || null);
          }
 
            if (bottomImg?.value) {
            const imageData = await fetchWpImageById(bottomImg.value);
            setSection3BottomImg(imageData?.url || null);
          }
        };
     
        loadBackgroundImage();
      }, [texts]);
 
 
 
    return (
       <div
  className="flex flex-col items-center justify-center px-4 py-10 text-base md:flex-row md:justify-center md:items-center md:gap-x-20 md:mt-56"
  id="section-3"
  ref={section3ref}
>
  {/* Image Section */}
  <div id="section3-img" className="mb-6 md:mb-0">
    <img
      src={section3BgUrl}
      ref={section3imgref}
      className="w-100 md:w-[40em] h-auto md:h-[40em] object-cover"
      alt="Section"
    />
  </div>
 
  {/* Text Section */}
  <div id="section3Text" className="flex flex-col gap-5 max-w-xl md:w-[30%]">
    <h1
      className="text-2xl font-bold md:text-4xl sm:text-left md:text-left"
      ref={section3heading}
    >
      {texts.filter((txt)=>txt.type==='text_content')[1]?.value}
    </h1>
 
    <p
      className="text-sm md:text-lg sm:text-left md:text-left md:w-[80%]"
      ref={section3text}
    >
      {texts.filter((txt)=>txt.type==='inner_text')[0]?.value}
    </p>
 
    <button
      className="bg-white text-amber-600 font-semibold text-sm md:text-lg px-5 py-2 rounded-full w-fit self-center md:self-start sm:text-left"
    >
      &#8594; {texts.filter((txt)=>txt.type==='link_text')[1]?.value}
    </button>
 
    <hr className="my-4 border-gray-300" />
 
    <div id="section3-bottomtext" ref={section3bottom}>
      <h4 className="text-xl md:text-lg font-semibold text-justify md:w-[50%]">
        {texts.filter((txt)=>txt.type==='quote')[0]?.value}
      </h4>
 
      <div
        id="section3-bottom-img"
        className="flex items-center gap-3 mt-3 sm:justify-left md:justify-start"
      >
        <img
          src={section3BottomImg}
          className="w-10 h-10 rounded-full object-cover"
          alt="Author"
        />
        <div className="text-left">
          <span className="font-bold text-sm md:text-sm">{texts.filter((txt)=>txt.type==='name')[0]?.value}</span><br/>
 
          <span className="text-gray-500 text-sm font-semibold">{texts.filter((txt)=>txt.type==='title')[0]?.value}</span>
          {/* <span className="text-xs md:text-sm">Designer, Owl Eyes</span> */}
        </div>
      </div>
    </div>
  </div>
</div>
 
 
    )
}
 
export default SecondSection
 
 