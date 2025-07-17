'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ThirdSection() {
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        delay: index * 0.2,
      });
    });
  }, []);

  const services = [
    {
      title: 'Exclusive Design',
      image: 'http://localhost/wordpress/wp-content/uploads/2019/09/cristian-palmer-763347-unsplash-1-small-1.jpg',
    },
    {
      title: 'Visual Builder',
      image: 'http://localhost/wordpress/wp-content/uploads/2019/09/thanai-manasathit-7rvQWFxJZKE-unsplash-small.jpg',
    },
    {
      title: 'Powerful Tools',
      image: 'http://localhost/wordpress/wp-content/uploads/2019/09/adrian-cuj-69FRyWD5Rt0-unsplash.jpg',
    },
    {
      title: 'Quick Importer',
      image: 'http://localhost/wordpress/wp-content/uploads/2019/09/jason-briscoe-5IGprlBT5g4-unsplash-small.jpg',
    },
  ];

  const renderSVGIcon = () => (
    <svg
      role="presentation"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 32 32"
      className="fill-white mb-2"
    >
      <path d="M15.959 30.639c-0.368 0-0.667-0.3-0.667-0.667v-28c0-0.367 0.299-0.667 0.667-0.667 0.367 0 0.667 0.3 0.667 0.667v28c0 0.367-0.3 0.667-0.667 0.667zM15.955 4.024c-0.136 0-0.269-0.039-0.384-0.121l-2.204-1.552c-0.301-0.212-0.373-0.629-0.161-0.928 0.212-0.303 0.629-0.368 0.929-0.161l1.828 1.287 1.917-1.295c0.305-0.205 0.72-0.125 0.925 0.179 0.205 0.305 0.125 0.72-0.18 0.925l-2.3 1.552c-0.112 0.079-0.241 0.115-0.371 0.115zM15.955 9.988c-0.136 0-0.269-0.036-0.384-0.12l-2.204-1.552c-0.301-0.213-0.373-0.631-0.161-0.927 0.212-0.303 0.629-0.369 0.929-0.161l1.828 1.288 1.917-1.299c0.305-0.204 0.72-0.128 0.925 0.18 0.205 0.305 0.125 0.719-0.18 0.924l-2.3 1.552c-0.112 0.075-0.241 0.115-0.371 0.115zM18.251 30.86c-0.128 0-0.257-0.036-0.372-0.115l-1.917-1.295-1.828 1.287c-0.301 0.211-0.717 0.139-0.929-0.161-0.212-0.303-0.139-0.716 0.161-0.927l2.204-1.552c0.228-0.159 0.528-0.161 0.756-0.008l2.3 1.552c0.305 0.205 0.385 0.62 0.18 0.924-0.128 0.192-0.339 0.295-0.555 0.295zM18.251 24.896c-0.128 0-0.257-0.036-0.372-0.115l-1.917-1.297-1.828 1.287c-0.301 0.213-0.717 0.139-0.929-0.161-0.212-0.305-0.139-0.716 0.161-0.927l2.204-1.552c0.228-0.156 0.528-0.159 0.756-0.005l2.3 1.552c0.305 0.203 0.385 0.62 0.18 0.921-0.128 0.196-0.339 0.297-0.555 0.297zM29.959 16.639h-28c-0.368 0-0.667-0.3-0.667-0.667s0.299-0.667 0.667-0.667h28c0.367 0 0.667 0.3 0.667 0.667s-0.3 0.667-0.667 0.667zM1.805 18.917c-0.133 0-0.267-0.039-0.384-0.12-0.301-0.213-0.373-0.631-0.161-0.929l1.287-1.828-1.295-1.917c-0.205-0.305-0.125-0.719 0.18-0.919 0.305-0.211 0.719-0.132 0.925 0.177l1.552 2.301c0.155 0.229 0.152 0.529-0.008 0.756l-1.552 2.2c-0.127 0.179-0.333 0.279-0.544 0.279zM7.769 18.917c-0.133 0-0.265-0.039-0.384-0.12-0.301-0.213-0.372-0.631-0.16-0.929l1.287-1.828-1.296-1.917c-0.204-0.305-0.125-0.719 0.181-0.919 0.305-0.211 0.72-0.132 0.924 0.177l1.552 2.301c0.155 0.229 0.152 0.529-0.008 0.756l-1.552 2.2c-0.127 0.179-0.335 0.279-0.544 0.279zM30.195 18.917c-0.209 0-0.416-0.099-0.545-0.281l-1.553-2.205c-0.16-0.227-0.163-0.528-0.008-0.753l1.553-2.304c0.207-0.305 0.62-0.388 0.925-0.177 0.305 0.204 0.385 0.62 0.18 0.924l-1.296 1.917 1.288 1.828c0.212 0.305 0.139 0.719-0.161 0.929-0.115 0.083-0.249 0.123-0.383 0.123zM24.233 18.917c-0.209 0-0.417-0.099-0.545-0.281l-1.553-2.205c-0.16-0.227-0.163-0.528-0.008-0.753l1.553-2.304c0.204-0.305 0.62-0.388 0.924-0.177 0.305 0.204 0.385 0.62 0.181 0.924l-1.297 1.917 1.289 1.828c0.211 0.305 0.139 0.719-0.161 0.929-0.116 0.083-0.252 0.123-0.383 0.123zM25.959 26.688c-0.171 0-0.341-0.065-0.472-0.195l-20.028-20.028c-0.26-0.256-0.26-0.687 0-0.943 0.259-0.256 0.683-0.256 0.943 0l20.028 20.027c0.26 0.26 0.26 0.688 0 0.943-0.129 0.131-0.3 0.196-0.471 0.196zM5.929 26.688c-0.171 0-0.341-0.065-0.472-0.195-0.26-0.255-0.26-0.683 0-0.943l20.028-20.027c0.26-0.256 0.684-0.256 0.943 0 0.26 0.256 0.26 0.687 0 0.943l-20.027 20.025c-0.132 0.131-0.303 0.196-0.472 0.196z"/>
    </svg>
  );

  return (
    <section className="w-full px-6 md:px-16 py-16 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
        We offer a wide array of services
        <br /> aimed at simplifying your life
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {services.map((service, i) => {
          const isActive = activeIndex === i;

          return (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              onClick={() => setActiveIndex(isActive ? null : i)}
              className="relative overflow-hidden group shadow-lg cursor-pointer"
            >
              {/* Image */}
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-120 object-cover transform scale-100 transition-transform duration-[8000ms] ease-in-out group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-30 group-hover:bg-opacity-60 transition duration-500 z-10"></div>

              {/* Title + Icon */}
              <div
                className={`
                  absolute bottom-16 left-5 z-10 text-white transition-all duration-500
                  ${isActive ? 'translate-y-[-1rem]' : ''}
                  group-hover:translate-y-[-1rem]
                `}
              >
                {renderSVGIcon()}
                <h3 className="text-2xl font-bold">{service.title}</h3>
              </div>

              {/* Gradient + Mobile/hover text */}
              <div
                className={`
                  absolute inset-0 bg-gradient-to-t from-orange-500 to-transparent 
                  transition-opacity duration-500 
                  ${isActive ? 'opacity-90' : 'opacity-0'} 
                  group-hover:opacity-90
                `}
              >
                <div
                  className={`
                    text-xl absolute bottom-4 left-4 right-4 text-white 
                    transition-all duration-500 ease-out 
                    ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    group-hover:opacity-100 group-hover:translate-y-0
                  `}
                >
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
