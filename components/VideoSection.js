import Header from '@/components/Header';

export default function VideoSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Header on top */}
      <Header />

      {/* Background Video (zoom on hover) */}
      <div className="group absolute inset-0 overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50  transition-transform duration-500 ease-in-out hover:scale-110"
        >
          <source src="http://themenectar.com/demo/salient-corporate-3/wp-content/uploads/2019/09/travelpockets_iceland_land_of_fire_and_ice.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
        {/* Play button inside circle with pop + hover scale */}
        <div className="group relative flex items-center justify-center mb-6 transition-transform duration-300 ease-out hover:scale-110 animate-ping-once cursor-pointer">
          <div className="w-25 h-25 rounded-full border-2 border-white flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Heading text */}
        <h1 className="text-3xl md:text-4xl font-sm text-center mt-5">
         <p>This isn&rsquo;t just another video</p>

        </h1>
      </div>
    </div>
  );
}
