import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import HomeBelowFold from "./components/HomeBelowFold";

export default function Home() {
  return (
    <>
      <Preloader />
      <main id="main-content" className="min-h-screen overflow-x-clip bg-black text-white">
        <Navbar />

        <Hero />
        <HomeBelowFold />
      </main>
    </>
  );
}
