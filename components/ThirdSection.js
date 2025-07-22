"use client"
 
import React, { useEffect, useRef, useState } from 'react'
 
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchWpImageById } from '../app/utils/getImage';
 
gsap.registerPlugin(ScrollTrigger);
const ThirdSection = ({ texts }) => {
  const section4ref = useRef(null)
  const section4headingref = useRef(null)
 
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section4headingref.current,
        { opacity: 0, y: 300 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: section4ref.current,
            start: "top 50%", // when top of section hits 80% of viewport height
            toggleActions: "play none none reverse",
            // markers: true
          },
        }
      )
      gsap.fromTo(".section4images", {
        opacity: 0, y: 300
      }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: section4ref.current,
          start: "top 50%", // when top of section hits 80% of viewport height
          toggleActions: "play none none reverse",
          // markers: true
        },
 
      })
    }, section4ref)
 
    return () => ctx.revert()
  }, [])
 
 
  // const section4AllImages = images.filter((img) => {
  //   if (img.id === 20 || img.id === 16 || img.id === 5996 || img.id === 15)
  //     return img
  // })
 
  // console.log(section4AllImages)
 
 
  const allTexts = texts.filter((txt) => txt.type === "h2")
  const hovertext = texts.filter((txt) => txt.type === "hover_content")
  const headingText = texts.filter((txt)=> txt.type==="text_content")[2]
 
 
  let [images,setImages] = useState([])
  useEffect(()=>{
 
   
  const loadBackgroundImage = async () => {
    const img = texts.filter((txt) => txt.type === 'image_url').slice(0, 4);
 
    const imagePromises = img.map(async (element) => {
      if (element?.value) {
        const imageData = await fetchWpImageById(element.value);
        return imageData?.url;
      }
      return null;
    });
 
    const resolvedImages = await Promise.all(imagePromises);
    setImages(resolvedImages.filter(Boolean))
 
    // console.log(images); // Now in correct order
  };
 
  loadBackgroundImage()
 
  },[texts])
 
  //  console.log("imgurl",images)
  console.log(allTexts, hovertext,headingText?.value)
 
 
  return (
    <div className='flex flex-col my-28 gap-16 items-center justify-center w-full min-h-[80vh]' id="section4" ref={section4ref}>
      <div className='text-3xl md:text-5xl w-[90%] md:w-[40%] text-center font-bold' ref={section4headingref}>
        {headingText?.value}
      </div>
 
      <div id="section4images" className='flex flex-col md:flex-row flex-wrap md:justify-around gap-3 p-3 items-center w-full'>
        {
       
        [
          { img: images[0], text: allTexts[0]?.value ,hover_text:hovertext[0]?.value},
          { img: images[1], text: allTexts[1]?.value ,hover_text:hovertext[1]?.value},
          { img: images[2], text: allTexts[2]?.value ,hover_text:hovertext[2]?.value},
          { img: images[3], text: allTexts[3]?.value ,hover_text:hovertext[3]?.value}
        ].map((imgUrl, idx) => (
          // <div
          //   key={idx}
          //   className="section4images relative flex flex-col justify-end p-5 w-[90%] md:w-[22%] h-[60vh] cursor-pointer bg-cover bg-center bg-no-repeat transition-all duration-500 hover:bg-[length:110%_110%]"
          //   style={{ backgroundImage: `url(${imgUrl})` }}
          // >
          <div
            key={idx}
            className="section4images relative flex flex-col justify-end p-5 w-[80%] md:w-[22%] h-[50vh] cursor-pointer overflow-hidden">
            <img src={`${imgUrl.img}`} alt="image" className="section4imagestag w-full h-full object-cover absolute top-0 left-0 " />
         
 
            <h2 className='text-3xl md:text-4xl absolute font-bold text-white z-10 section4imagestext flex items-center justify-center flex-col'>
              <svg role="presentation" version="1.1" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 32 32">
              <path fill='white' d="M15.959 30.639c-0.368 0-0.667-0.3-0.667-0.667v-28c0-0.367 0.299-0.667 0.667-0.667 0.367 0 0.667 0.3 0.667 0.667v28c0 0.367-0.3 0.667-0.667 0.667zM15.955 4.024c-0.136 0-0.269-0.039-0.384-0.121l-2.204-1.552c-0.301-0.212-0.373-0.629-0.161-0.928 0.212-0.303 0.629-0.368 0.929-0.161l1.828 1.287 1.917-1.295c0.305-0.205 0.72-0.125 0.925 0.179 0.205 0.305 0.125 0.72-0.18 0.925l-2.3 1.552c-0.112 0.079-0.241 0.115-0.371 0.115zM15.955 9.988c-0.136 0-0.269-0.036-0.384-0.12l-2.204-1.552c-0.301-0.213-0.373-0.631-0.161-0.927 0.212-0.303 0.629-0.369 0.929-0.161l1.828 1.288 1.917-1.299c0.305-0.204 0.72-0.128 0.925 0.18 0.205 0.305 0.125 0.719-0.18 0.924l-2.3 1.552c-0.112 0.075-0.241 0.115-0.371 0.115zM18.251 30.86c-0.128 0-0.257-0.036-0.372-0.115l-1.917-1.295-1.828 1.287c-0.301 0.211-0.717 0.139-0.929-0.161-0.212-0.303-0.139-0.716 0.161-0.927l2.204-1.552c0.228-0.159 0.528-0.161 0.756-0.008l2.3 1.552c0.305 0.205 0.385 0.62 0.18 0.924-0.128 0.192-0.339 0.295-0.555 0.295zM18.251 24.896c-0.128 0-0.257-0.036-0.372-0.115l-1.917-1.297-1.828 1.287c-0.301 0.213-0.717 0.139-0.929-0.161-0.212-0.305-0.139-0.716 0.161-0.927l2.204-1.552c0.228-0.156 0.528-0.159 0.756-0.005l2.3 1.552c0.305 0.203 0.385 0.62 0.18 0.921-0.128 0.196-0.339 0.297-0.555 0.297zM29.959 16.639h-28c-0.368 0-0.667-0.3-0.667-0.667s0.299-0.667 0.667-0.667h28c0.367 0 0.667 0.3 0.667 0.667s-0.3 0.667-0.667 0.667zM1.805 18.917c-0.133 0-0.267-0.039-0.384-0.12-0.301-0.213-0.373-0.631-0.161-0.929l1.287-1.828-1.295-1.917c-0.205-0.305-0.125-0.719 0.18-0.919 0.305-0.211 0.719-0.132 0.925 0.177l1.552 2.301c0.155 0.229 0.152 0.529-0.008 0.756l-1.552 2.2c-0.127 0.179-0.333 0.279-0.544 0.279zM7.769 18.917c-0.133 0-0.265-0.039-0.384-0.12-0.301-0.213-0.372-0.631-0.16-0.929l1.287-1.828-1.296-1.917c-0.204-0.305-0.125-0.719 0.181-0.919 0.305-0.211 0.72-0.132 0.924 0.177l1.552 2.301c0.155 0.229 0.152 0.529-0.008 0.756l-1.552 2.2c-0.127 0.179-0.335 0.279-0.544 0.279zM30.195 18.917c-0.209 0-0.416-0.099-0.545-0.281l-1.553-2.205c-0.16-0.227-0.163-0.528-0.008-0.753l1.553-2.304c0.207-0.305 0.62-0.388 0.925-0.177 0.305 0.204 0.385 0.62 0.18 0.924l-1.296 1.917 1.288 1.828c0.212 0.305 0.139 0.719-0.161 0.929-0.115 0.083-0.249 0.123-0.383 0.123zM24.233 18.917c-0.209 0-0.417-0.099-0.545-0.281l-1.553-2.205c-0.16-0.227-0.163-0.528-0.008-0.753l1.553-2.304c0.204-0.305 0.62-0.388 0.924-0.177 0.305 0.204 0.385 0.62 0.181 0.924l-1.297 1.917 1.289 1.828c0.211 0.305 0.139 0.719-0.161 0.929-0.116 0.083-0.252 0.123-0.383 0.123zM25.959 26.688c-0.171 0-0.341-0.065-0.472-0.195l-20.028-20.028c-0.26-0.256-0.26-0.687 0-0.943 0.259-0.256 0.683-0.256 0.943 0l20.028 20.027c0.26 0.26 0.26 0.688 0 0.943-0.129 0.131-0.3 0.196-0.471 0.196zM4.368 8.217c-0.319 0-0.6-0.227-0.656-0.552-0.063-0.361 0.181-0.705 0.543-0.772l2.204-0.383 0.44-2.271c0.071-0.36 0.417-0.587 0.783-0.527 0.361 0.072 0.597 0.417 0.528 0.781l-0.528 2.724c-0.052 0.272-0.268 0.48-0.541 0.527l-2.657 0.465c-0.037 0.004-0.076 0.007-0.115 0.007zM8.584 12.433c-0.319 0-0.6-0.227-0.656-0.552-0.063-0.361 0.18-0.705 0.544-0.771l2.204-0.383 0.44-2.271c0.069-0.361 0.415-0.591 0.781-0.528 0.36 0.071 0.596 0.417 0.527 0.781l-0.527 2.724c-0.052 0.272-0.268 0.48-0.54 0.527l-2.659 0.465c-0.039 0.004-0.075 0.007-0.115 0.007zM24.444 28.289c-0.037 0-0.077-0.003-0.116-0.011-0.361-0.063-0.605-0.412-0.541-0.771l0.463-2.659c0.048-0.271 0.259-0.487 0.529-0.539l2.723-0.528c0.363-0.076 0.711 0.167 0.781 0.528s-0.167 0.711-0.528 0.781l-2.272 0.44-0.384 2.203c-0.057 0.325-0.337 0.555-0.655 0.555zM20.228 24.073c-0.037 0-0.077-0.003-0.115-0.011-0.363-0.063-0.607-0.409-0.543-0.771l0.461-2.656c0.048-0.273 0.259-0.489 0.529-0.541l2.724-0.527c0.361-0.076 0.711 0.167 0.781 0.527 0.071 0.361-0.167 0.711-0.528 0.781l-2.273 0.44-0.383 2.203c-0.056 0.323-0.339 0.555-0.655 0.555zM5.929 26.688c-0.171 0-0.341-0.065-0.472-0.195-0.26-0.255-0.26-0.683 0-0.943l20.028-20.027c0.26-0.256 0.684-0.256 0.943 0 0.26 0.256 0.26 0.687 0 0.943l-20.027 20.025c-0.132 0.131-0.303 0.196-0.472 0.196zM7.553 28.289c-0.317 0-0.599-0.229-0.655-0.552l-0.384-2.204-2.272-0.44c-0.361-0.073-0.597-0.421-0.528-0.781 0.071-0.361 0.417-0.593 0.781-0.528l2.723 0.528c0.272 0.052 0.483 0.268 0.529 0.539l0.463 2.656c0.063 0.361-0.18 0.705-0.541 0.771-0.039 0.009-0.079 0.012-0.116 0.012zM11.769 24.073c-0.317 0-0.599-0.229-0.655-0.555l-0.383-2.203-2.273-0.44c-0.361-0.071-0.597-0.417-0.528-0.781 0.071-0.36 0.417-0.585 0.781-0.527l2.724 0.527c0.272 0.055 0.483 0.271 0.529 0.541l0.461 2.659c0.061 0.359-0.18 0.705-0.544 0.768-0.036 0.008-0.076 0.011-0.113 0.011zM27.628 8.217c-0.037 0-0.077-0.003-0.115-0.011l-2.657-0.461c-0.273-0.047-0.488-0.257-0.54-0.528l-0.528-2.724c-0.072-0.361 0.167-0.711 0.528-0.781 0.361-0.073 0.712 0.167 0.781 0.528l0.44 2.272 2.204 0.383c0.361 0.063 0.607 0.411 0.543 0.769-0.055 0.324-0.337 0.553-0.656 0.553zM23.412 12.433c-0.037 0-0.076-0.003-0.115-0.011l-2.659-0.461c-0.273-0.047-0.488-0.257-0.54-0.528l-0.527-2.724c-0.071-0.361 0.167-0.711 0.528-0.781 0.36-0.076 0.711 0.167 0.78 0.528l0.439 2.272 2.205 0.383c0.361 0.063 0.607 0.411 0.543 0.769-0.053 0.324-0.336 0.553-0.655 0.553z"></path>
              </svg>
              {imgUrl.text}
            </h2>
            <div className='bg-black bg-gradient-to-br absolute top-0 opacity-40 left-0 h-full w-full' />
            <div className='bg-orange-400 bg-gradient-to-br absolute -bottom-[350px] left-0 h-full w-full section4overlay flex flex-col justify-end items-center'>
              <div className="text-l md:text-2xl absolute text-white bottom-10 left-15 italic overlaytext px-2">
                {imgUrl.hover_text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
 
  )
}
 
export default ThirdSection