'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Mobile Drawer Animation
  useEffect(() => {
    if (menuRef.current) {
      if (menuOpen) {
        menuRef.current.style.display = 'block';
        gsap.fromTo(
          menuRef.current,
          { x: '100%' },
          { x: 0, duration: 0.4, ease: 'power2.out' }
        );
      } else {
        gsap.to(menuRef.current, {
          x: '100%',
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            if (menuRef.current) menuRef.current.style.display = 'none';
          },
        });
      }
    }
  }, [menuOpen]);

  const logoSrc = isScrolled
    ? '/assets/logo_dark.png'
    : '/assets/logo_white.png';

  return (
    <header
      className={`fixed top-0 w-full z-50 px-5 md:px-10 py-4 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center w-[80vw] ">
        {/* Logo */}
       <div className="relative w-[100px] h-[36px] md:w-[140px] md:h-[40px]">

          <Image src={logoSrc} alt="Logo" fill className="object-contain" />
        </div>

        {/* Desktop Nav */}
        <nav
          className={`hidden md:flex space-x-8 text-base font-medium transition-all ${
            isScrolled ? 'text-black' : 'text-white'
          }`}
        >
          {['Home', 'News', 'Demos', 'Contact'].map((item, index) => (
            <Link
              key={index}
              href="#"
              className="relative group transition-all"
            >
              {item}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Icon */}
        {!menuOpen && (
          <div
            className={`md:hidden z-50 text-3xl font-bold cursor-pointer ${
              isScrolled ? 'text-black' : 'text-white'
            }`}
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-[80%] h-full bg-orange-500 z-40 p-8 text-white"
        style={{ transform: 'translateX(100%)', display: 'none' }}
      >
        {/* Close Icon */}
        <div className="flex justify-end mb-6">
          <button
            className="text-3xl font-bold"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </div>

        {/* Mobile Menu Links */}
        <nav className="space-y-6 text-lg font-semibold">
          {['Home', 'News', 'Demos', 'Contact'].map((item, index) => (
            <Link
              key={index}
              href="#"
              onClick={() => setMenuOpen(false)}
              className="block underline underline-offset-4 hover:text-black transition-all"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Contact Info */}
        <div className="mt-10 text-sm font-medium leading-relaxed">
          <p className="font-bold">About Salient</p>
          <p>
            The Castle<br />
            Unit 345<br />
            2500 Castle Dr<br />
            Manhattan, NY
          </p>
          <p className="mt-4">T: +216 (0)40 3629 4753</p>
          <p>E: hello@themenectar.com</p>
        </div>
      </div>
    </header>
  );
}
