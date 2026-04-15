/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import Destinations from "@/src/components/Destinations";
import Tours from "@/src/components/Tours";
import Testimonials from "@/src/components/Testimonials";
import Footer from "@/src/components/Footer";

export default function App() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Destinations />
      <Tours />
      <Testimonials />
      <Footer />
    </main>
  );
}
