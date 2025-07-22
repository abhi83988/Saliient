// components/Loader.jsx
"use client";
import { useState, useEffect } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-[9999] flex items-center justify-center">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-orange-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-orange-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-orange-500 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
}
