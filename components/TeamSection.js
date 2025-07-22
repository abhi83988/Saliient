import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchWpImageById } from '../app/utils/getImage';
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Social from '@/app/Social';
import CustomCursor from './CustomCursor';
 
gsap.registerPlugin(ScrollTrigger);
 
const TeamSection = ({ texts }) => {
  const teamsectionref = useRef(null)
  const teamsectionheadingref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null);
 
 
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(teamsectionheadingref.current,
        { opacity: 0, y: 200, scale: 0.3 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 1.2,
          scale: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 1.2,
          scrollTrigger: {
            trigger: teamsectionref.current,
            start: "top -30%", // when top of section hits 80% of viewport height
            toggleActions: "play none none reverse",
            // markers: true
          },
        }
      )
      gsap.fromTo(".teamimages", {
        opacity: 0, y: 200
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: teamsectionref.current,
          start: "top -40%", // when top of section hits 80% of viewport height
          toggleActions: "play none none reverse",
          // markers: true
        },
 
      })
    }, teamsectionref)
 
    return () => ctx.revert()
  }, [])
 
 
 
 
  const names = texts.filter((txt) => txt.type === "name")?.slice(1, 7)
  // console.log("names are", names)
 
  const cardTexts = texts.filter((txt) => txt.type === "team_member_mini_bio")
  // console.log("names are", cardTexts)
 
  const position = texts.filter((txt) => txt.type === "job_position")
  // console.log("names are", position)
 
  const headText = texts.filter((txt) => txt.type === "text_content")[4]
 
  const cardTextsFull = texts.filter((txt) => txt.type === "team_member_bio")
  // console.log("names are", headText)
 
 
 
 
 
  let [images, setImages] = useState([]);
 
  useEffect(() => {
    const loadBackgroundImage = async () => {
      const imageText = texts.filter((txt) => txt.type === 'image_url')?.slice(4, 15);
 
      if (!imageText || imageText.length === 0) {
        console.warn("No image text entries found");
        return;
      }
 
      const imagePromises = imageText.map(async (imgobj) => {
        const id = imgobj?.value?.trim();
        if (!isNaN(id) && id !== '') {
          const imageData = await fetchWpImageById(id);
          return imageData?.url;
        }
        return null;
      });
 
      const resolvedImages = await Promise.all(imagePromises);
      setImages(resolvedImages.filter(Boolean));
    };
 
    if (texts && texts.length > 0) {
      loadBackgroundImage();
    }
  }, [texts]);
 
 
  useEffect(() => {
    if (!isVisible) {
      const timeout = setTimeout(() => {
        setSelectedMember(null);
      }, 800); // match animation duration
 
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);
 
 
 
 
  const teamsectiondata = [
    [
      { designation: position[0]?.value, img: images[0], name: names[0]?.value, text: cardTexts[0]?.value, fullText: cardTextsFull[0]?.value },
      { designation: position[1]?.value, img: images[1], name: names[1]?.value, text: cardTexts[1]?.value, fullText: cardTextsFull[1]?.value }
    ],
 
    [
      { designation: position[2]?.value, img: images[2], name: names[2]?.value, text: cardTexts[2]?.value, fullText: cardTextsFull[2]?.value },
      { designation: position[3]?.value, img: images[3], name: names[3]?.value, text: cardTexts[3]?.value, fullText: cardTextsFull[3]?.value }
    ],
    [
      { designation: position[4]?.value, img: images[4], name: names[4]?.value, text: cardTexts[4]?.value, fullText: cardTextsFull[4]?.value },
      { designation: position[5]?.value, img: images[5], name: names[5]?.value, text: cardTexts[5]?.value, fullText: cardTextsFull[5]?.value }
    ]
  ]
 
  return (
    <div id="teamsection" className="flex flex-col mt-[10%] gap-[5em] items-center px-4" ref={teamsectionref}>
      <div className="w-full md:w-[50%] mb-5">
        <h4 className="text-3xl sm:text-4xl md:text-5xl text-center md:text-left font-bold" ref={teamsectionheadingref}>
          {headText?.value}
        </h4>
      </div>
 
      <div id="teamsectioncards" className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-30 w-full">
        {/* Card Column 1 */}
        {
 
          teamsectiondata && teamsectiondata.map((data, idx) => {
            return (idx % 2 === 1) ? (<div key={`div1-${idx}`} className="w-full md:w-[20%] flex flex-col gap-10 md:translate-y-[-6%]">
              {/* Card 3 */}
              <div key={idx} className="flex flex-col gap-2 teamimages text-center md:text-left ">
                <img
                  src={data[0].img}
                  className="w-full object-cover transition-transform duration-500 ease-in-out hover:scale-95 cursor-pointer shadow-lg"
                />
                <p className="font-medium text-xs">{data[0].designation}</p>
                <div>
                  <h4 className="font-semibold text-2xl sm:text-3xl mb-2">
                    {data[0].name}
                  </h4>
                  <p className="text-lg">
                    {data[0].text}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedMember(data[0]);
                      setIsVisible(true);
                    }}
                    className="bg-amber-600 text-white py-3 px-6 rounded-full text-lg md:text-xl font-medium"
                  >
                    click
                  </button>
 
                </div>
              </div>
 
              {/* Card 4 */}
              <div key={`div2-${idx}`} className="flex flex-col gap-2 teamimages text-center md:text-left ">
                <img
                  src={data[1].img}
                  className="w-full object-cover transition-transform duration-500 ease-in-out hover:scale-95 cursor-pointer shadow-lg"
                />
                <p className="font-medium text-xs">{data[1].designation}</p>
                <div>
                  <h4 className="font-semibold text-2xl sm:text-3xl mb-2">{data[1].name}</h4>
                  <p className="text-lg">
                    {data[1].text}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedMember(data[1]);
                      setIsVisible(true);
                    }}
                    className="bg-amber-600 text-white py-3 px-6 rounded-full text-lg md:text-xl font-medium"
                  >
                    click
                  </button>
 
                </div>
 
              </div>
            </div>)
 
              : (<div key={`div3-${idx}`} className="w-full md:w-[20%] flex flex-col gap-10">
                {/* Card 1 */}
                <div className="flex flex-col gap-2 teamimages text-center md:text-left ">
                  <img src={data[0].img} className="w-full object-cover transition-transform duration-500 ease-in-out hover:scale-95 cursor-pointer shadow-lg" />
                  <p className="font-medium text-xs">{data[0].designation}</p>
                  <div>
                    <h4 className="font-semibold text-2xl sm:text-3xl mb-2">{data[0].name}</h4>
                    <p className="text-lg">
                      {data[0].text}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedMember(data[0]);
                        setIsVisible(true);
                      }}
                      className="bg-amber-600 text-white py-3 px-6 rounded-full text-lg md:text-xl font-medium"
                    >
                      click
                    </button>
 
                  </div>
 
                </div>
 
                {/* Card 2 */}
                <div key={`div4-${idx}`} className="flex flex-col gap-2 teamimages text-center md:text-left ">
                  <img
                    src={data[1].img}
                    className="w-full object-cover transition-transform duration-500 ease-in-out hover:scale-95 cursor-pointer shadow-lg"
                  />
                  <p className="font-medium text-xs">{data[1].designation}</p>
                  <div>
                    <h4 className="font-semibold text-2xl sm:text-3xl mb-2">{data[1].name}</h4>
                    <p className="text-lg">
                      {data[1].text}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedMember(data[1]);
                        setIsVisible(true);
                      }}
                      className="bg-amber-600 text-white py-3 px-6 rounded-full text-lg md:text-xl font-medium"
                    >
                      click
                    </button>
 
                  </div>
 
                </div>
              </div>)
          })
        }
 
 
      </div>
 
      <AnimatePresence>
        {isVisible && selectedMember && (
          <motion.div
            key="team-modal"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50"
          >
            <div className="relative flex flex-col md:flex-row w-full h-full text-black text-center text-xl md:text-3xl">
              {/* Left Section (Text) */}
              <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 px-6 py-10 md:p-20 items-center md:items-start">
                <p className="text-sm font-semibold">{selectedMember.designation}</p>
                <h4 className="text-2xl md:text-5xl font-bold">{selectedMember.name}</h4>
                <p className="text-sm md:text-xl text-center md:text-left">{selectedMember.fullText}</p>
                <div><Social /></div>
              </div>
 
              {/* Right Section (Image + Close Button + Cursor) */}
              <div className="w-full md:w-1/2 relative h-full md:h-auto">
                <img
                  src={selectedMember.img}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover shadow-lg"
                />
 
                {/* Hide floating cursor on small screens */}
                <div className="hidden sm:block">
                  <CustomCursor onClick={() =>{
                    setSelectedMember(null);
                    setIsVisible(false)}
                }
                   
                  />
                </div>
              </div>
 
               {/* Close Button */}
                <button
                  onClick={() => {
                    setSelectedMember(null);
                    setIsVisible(false);
                  }}
                  className="absolute block md:hidden top-4 right-4 text-black text-xl md:text-2xl  p-2 rounded-full"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
 
          </motion.div>
        )}
      </AnimatePresence>
 
 
 
    </div>
 
  )
}
 
export default TeamSection