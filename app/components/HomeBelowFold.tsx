import FinalSection from "./FinalSection";
import Footer from "./Footer";
import Music from "./Music";
import SectionTransition from "./SectionTransition";
import Story from "./Story";

export default function HomeBelowFold() {
  return (
    <>
      <SectionTransition labelKey="enterSound" />
      <Music />
      <SectionTransition labelKey="behindMusic" />
      <Story />
      <SectionTransition labelKey="nextChapter" />
      <FinalSection />
      <Footer />
    </>
  );
}
