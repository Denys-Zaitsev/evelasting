import FinalSection from "./components/FinalSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero/Hero";
import Music from "./components/Music";
import Navbar from "./components/Navbar";
import { PlayerProvider } from "./components/PlayerContext";
import { LanguageProvider } from "./components/LanguageContext";
import Preloader from "./components/Preloader";
import Story from "./components/Story";
import SoundCloudPlayer from "./components/SoundCloudPlayer";
import SectionTransition from "./components/SectionTransition";

export default function Home() {
  return (
    <LanguageProvider>
      <PlayerProvider>
      <Preloader />
      <main id="main-content" className="min-h-screen overflow-x-clip bg-black text-white">
        <Navbar />

        <Hero />
        <SectionTransition labelKey="enterSound" />

        <Music />
        <SectionTransition labelKey="behindMusic" />

        <Story />
        <SectionTransition labelKey="nextChapter" />

        <FinalSection />

        <Footer />

        <SoundCloudPlayer />
      </main>
    </PlayerProvider>
    </LanguageProvider>
  );
}