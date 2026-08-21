import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar";
import { PlayerProvider } from "./components/PlayerContext";
import { LanguageProvider } from "./components/LanguageContext";
import PerformanceMotionConfig from "./components/PerformanceMotionConfig";
import Preloader from "./components/Preloader";
import DeferredSoundCloudPlayer from "./components/DeferredSoundCloudPlayer";
import DeferredHomeContent from "./components/DeferredHomeContent";

export default function Home() {
  return (
    <LanguageProvider>
      <PlayerProvider>
      <PerformanceMotionConfig>
      <Preloader />
      <main id="main-content" className="min-h-screen overflow-x-clip bg-black text-white">
        <Navbar />

        <Hero />
        <DeferredHomeContent />

        <DeferredSoundCloudPlayer />
      </main>
      </PerformanceMotionConfig>
    </PlayerProvider>
    </LanguageProvider>
  );
}
