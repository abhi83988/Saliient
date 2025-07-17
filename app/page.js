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
import { useEffect, useState } from "react";
import axios from "axios";
import he from "he";
export default function Home() {

  const [content, setContent] = useState("");
  const [extractedTexts, setExtractedTexts] = useState([]);

  function extractAttributeBlocks(content) {
    if (!content) return [];

    const decoded = he.decode(content);
    const normalized = decoded
      .replace(/\\+"/g, '"') // convert \" → "
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'");

    const results = [];

    // Extract values from these attributes including team_member_bio
    const attributes = ['text_content', 'link_text', 'title', 'heading', 'label', 'alt', 'team_member_bio', 'quote', 'hover_content',
      'name', 'subtitle', 'bg_image', 'image_url', 'images', 'video_mp4', 'background_image', 'team_member_mini_bio', 'job_position', 'bio_alt_image_url'];
    attributes.forEach(attr => {
      const regex = new RegExp(`${attr}="([^"]+)"`, 'g');
      for (const match of normalized.matchAll(regex)) {
        results.push({ type: attr, value: match[1].trim() });
      }
    });

    // Extract text inside [vc_...] shortcodes
    const regex = /\[vc_column_text[^\]]*](.*?)\[\/vc_column_text]/gis;

    for (const match of content.matchAll(regex)) {
      const text = match[1].trim();
      if (text) {
        results.push({ type: "inner_text", value: text });
      }
    }

    // Extract text inside HTML content tags
    const tagNames = ['p', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'strong', 'em', 'b', 'i'];
    tagNames.forEach(tag => {
      const regex = new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, 'gis');
      for (const match of normalized.matchAll(regex)) {
        const textContent = match[1].trim().replace(/<[^>]+>/g, '').trim(); // Remove nested tags
        if (textContent) {
          results.push({ type: tag, value: textContent });
        }
      }
    });

    return results;
  }



  useEffect(() => {
    axios
      .get("http://localhost/wordpress/wp-json/custom/v1/wpbakery-page/5909")
      .then((res) => {
        if (res.data) {
          console.log("data from api", res.data)
          console.log("rendered", res.data.data.content_html)
          setContent(res.data.data.content_html);

        }
      });
  }, []);

  useEffect(() => {
    const extractedTexts = extractAttributeBlocks(content)
    console.log("extracted text", extractedTexts)
    setExtractedTexts(extractedTexts)
    console.log("extracted texts", extractedTexts)

  }, [content])



  return (
    <main className="relative ">
      <Hero texts={extractedTexts}/>
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
