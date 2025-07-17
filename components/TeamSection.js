'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  // First row
  {
    role: 'CEO, Founder',
    name: 'James Warren',
    desc: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
    img: 'http://localhost/wordpress/wp-content/uploads/2019/09/albert-dera-ILip77SbmOE-unsplash-1.jpg',
  },
  {
    role: 'Designer',
    name: 'Zachary Miller',
    desc: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts',
    img: 'http://localhost/wordpress/wp-content/uploads/2019/09/team-6.jpg',
  },
  {
    role: 'UX Designer',
    name: 'Kara Lucas',
    desc: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts',
    img: 'http://localhost/wordpress/wp-content/uploads/2019/09/team7.jpg',
  },
  // Second row
  {
    role: 'Developer',
    name: 'Corey Willams',
    desc: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts',
    img: 'http://localhost/wordpress/wp-content/uploads/2019/09/team5.jpg',
  },
  {
    role: 'Art Director',
    name: 'Daniel Wilson',
    desc: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts',
    img: 'http://localhost/wordpress/wp-content/uploads/2019/09/team2.jpg',
  },
  {
    role: 'Marketing',
    name: 'Sophia Johnson',
    desc: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts',
    img: 'http://localhost/wordpress/wp-content/uploads/2019/09/matheus-ferrero-W7b3eDUb_2I-unsplash.jpg',
  },
];

export default function TeamSection() {
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Heading animation
    gsap.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });

    // Cards animation
    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: cardsRef.current[0],
        start: 'top 80%',
      },
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power2.out',
    });

    // Hover shrink effect
    cardsRef.current.forEach((card) => {
      const img = card.querySelector('img');
      if (img) {
        img.addEventListener('mouseenter', () => {
          gsap.to(img, { scale: 0.95, duration: 0.1, ease: 'power2.out' });
        });
        img.addEventListener('mouseleave', () => {
          gsap.to(img, { scale: 1, duration: 0.1, ease: 'power2.out' });
        });
      }
    });
  }, []);

  return (
    <section className="px-4 md:px-16 py-20 bg-white">
      <h2
        ref={headingRef}
        className="text-3xl md:text-5xl font-semibold text-center mb-16 text-black"
      >
        Our team is comprised of genuinely gifted minds
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-1 gap-y-1">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`flex flex-col items-center transition-transform`}
          >
            {/* Image Container */}
            <div
              className={`overflow-hidden w-90 h-120 shadow-md hover:shadow-xl transition-shadow ${
                index === 0 || index === 2 || index===3 || index===5 ? 'mt-30' : ''
              }`}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-300"
              />
            </div>

            {/* Text Container */}
            <div className="text-center mt-4">
              <p className="text-sm text-black">{member.role}</p>
              <h3 className="text-black text-2xl font-bold ">{member.name}</h3>
              <p className="text-black mt-2 text-xl max-w-xs mx-auto">
                {member.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
