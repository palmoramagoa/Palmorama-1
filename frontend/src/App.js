import React from "react";
import "./App.css";
import Loader from "@/components/site/Loader";
import Navigation from "@/components/site/Navigation";
import Hero from "@/components/site/Hero";
import Story from "@/components/site/Story";
import Rooms from "@/components/site/Rooms";
import Cafe from "@/components/site/Cafe";
import Gallery from "@/components/site/Gallery";
import Srot from "@/components/site/Srot";
import Testimonials from "@/components/site/Testimonials";
import Attractions from "@/components/site/Attractions";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import ScrollProgress from "@/components/site/ScrollProgress";
import { useLenis } from "@/hooks/useLenis";

function App() {
  useLenis();
  return (
    <div className="App">
      <Loader />
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <Story />
        <Rooms />
        <Cafe />
        <Gallery />
        <Srot />
        <Testimonials />
        <Attractions />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
