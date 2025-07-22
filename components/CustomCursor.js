// src/components/CustomCursor.js
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import "./CustomCursor.css"; // styles for cursor
 
const CustomCursor = ({ onClick }) => {
  const cursorRef = useRef(null);
 
  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
      });
    };
 
    window.addEventListener("mousemove", moveCursor);
 
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);
 
  return <div className="custom-cursor md:flex md:flex-row flex flex-col items-center justify-center" ref={cursorRef}  onClick={onClick}><FontAwesomeIcon icon={faTimes} className="text-black text-4xl" /></div>;
};
 
export default CustomCursor;