'use client';

import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import Destinations from "@/src/components/Destinations";
import Tours from "@/src/components/Tours";
import Testimonials from "@/src/components/Testimonials";
import Footer from "@/src/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Destinations />
      <Tours />
      <Testimonials />
      <Footer />
    </main>
  );
}
