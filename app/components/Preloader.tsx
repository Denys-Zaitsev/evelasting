"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => { const id = window.setTimeout(() => setVisible(false), 1100); return () => window.clearTimeout(id); }, []);
  return <AnimatePresence>{visible && <motion.div initial={{opacity:1}} exit={{opacity:0}} transition={{duration:.65}} className="fixed inset-0 z-[100] grid place-items-center bg-black"><div className="text-center"><p className="text-lg font-semibold tracking-[.45em] text-white">EVELASTING</p><div className="mx-auto mt-5 h-px w-36 overflow-hidden bg-white/10"><motion.div className="h-full bg-red-500" initial={{x:"-100%"}} animate={{x:"100%"}} transition={{duration:.9,ease:[.22,1,.36,1]}} /></div></div></motion.div>}</AnimatePresence>;
}
