"use client"
import Image from "next/image";
import Hero from "../components/Hero";
import Header from "../components/Header";
import SecondSection from "../components/SecondSection";
import ThirdSection from "../components/ThirdSection";
import FourthSection from "../components/FourthSection";
import VideoSection from "@/components/VideoSection";
import TeamSection from "../components/TeamSection";
import ScrollSection from "../components/ScrollSection";
import BrandSection from "@/components/BrandSection";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <main className="relative ">
      <Hero />
      <Header />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <VideoSection />
      <TeamSection />
      <ScrollSection />
      <BrandSection />
      <Footer />
    </main>
  );
}
