"use client";
import { motion } from "motion/react";
import { useLanguage } from "../LanguageContext";
export default function StoryIntro() {
 const { t } = useLanguage();
 return <div className="relative z-20 flex min-h-[52vh] items-start pb-12 pt-20 md:min-h-[58vh] md:pb-16 md:pt-24"><div className="w-full">
  <motion.p initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.7}} transition={{duration:.6,ease:[.22,1,.36,1]}} className="text-xs uppercase tracking-[.3em] text-red-400">{t("storyEyebrow")}</motion.p>
  <motion.h2 initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.6}} transition={{duration:.8,delay:.06,ease:[.22,1,.36,1]}} className="mt-6 max-w-5xl text-5xl font-bold tracking-[-.055em] text-white sm:text-6xl md:text-8xl lg:text-[7rem] lg:leading-[.9]">{t("storyTitle1")}<span className="block text-white/25">{t("storyTitle2")}</span></motion.h2>
  <motion.div initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.7}} transition={{duration:.65,delay:.2,ease:[.22,1,.36,1]}} className="mt-10 flex items-center gap-5 md:mt-12"><span className="h-px w-10 bg-red-500/65 md:w-14"/><p className="text-lg font-medium tracking-tight text-white/80 md:text-xl">{t("soundReturns")}</p></motion.div>
 </div></div>;
}
