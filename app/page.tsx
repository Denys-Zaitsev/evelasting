import FinalSection from "./components/FinalSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero/Hero";
import Music from "./components/Music";
import Navbar from "./components/Navbar";
import { PlayerProvider } from "./components/PlayerContext";
import { LanguageProvider } from "./components/LanguageContext";
import PerformanceMotionConfig from "./components/PerformanceMotionConfig";
import Preloader from "./components/Preloader";
import Story from "./components/Story";
import DeferredSoundCloudPlayer from "./components/DeferredSoundCloudPlayer";
import SectionTransition from "./components/SectionTransition";

export default function Home() {
  return (
    <LanguageProvider>
      <PlayerProvider>
      <PerformanceMotionConfig>
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

        <DeferredSoundCloudPlayer />
      </main>
      </PerformanceMotionConfig>
    </PlayerProvider>
    </LanguageProvider>
  );
}
