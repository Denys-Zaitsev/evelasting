"use client";
import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "./LanguageContext";

type LabelKey = "enterSound" | "behindMusic" | "nextChapter";
export default function SectionTransition({ labelKey }: { labelKey: LabelKey }) {
  const reduced = useReducedMotion(); const { t } = useLanguage();
  return <div className="section-transition" aria-hidden="true"><motion.div className="section-transition-glow" animate={reduced ? undefined : { scaleX:[.72,1,.72], opacity:[.22,.55,.22] }} transition={{duration:5.8,repeat:Infinity,ease:"easeInOut"}}/><div className="section-transition-line"/><span>{t(labelKey)}</span></div>;
}
