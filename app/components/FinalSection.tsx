"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "./LanguageContext";
import { siteConfig } from "@/lib/site";

const platforms = [
  { name: "Spotify", href: siteConfig.links.spotify, key: "listenStory" as const },
  { name: "YouTube", href: siteConfig.links.youtube, key: "watchVisuals" as const },
  { name: "Apple Music", href: siteConfig.links.appleMusic, key: "openCatalog" as const },
  { name: "SoundCloud", href: siteConfig.links.soundcloud, key: "enterArchive" as const },
  { name: "TikTok", href: siteConfig.links.tiktok, key: "watchVisuals" as const },
  { name: "Instagram", href: siteConfig.links.instagram, key: "followProcess" as const },
  { name: "Telegram", href: siteConfig.links.telegram, key: "receiveUpdates" as const },
  { name: "Email", href: siteConfig.links.email, key: "startConversation" as const },
];

export default function FinalSection(){
 const reduced=useReducedMotion(); const {t}=useLanguage();
 return <section id="contact" className="group/contact relative isolate overflow-hidden border-t border-white/10 bg-black px-6 py-24 md:px-12 md:py-36">
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-30 overflow-hidden bg-black">
   <Image src="/images/final/workspace.jpg" alt="" fill sizes="100vw" priority={false} className="object-cover object-[54%_48%] brightness-[.34] contrast-[1.06] saturate-[.82] blur-[1px] transition-transform duration-[2400ms] ease-out group-hover/contact:scale-[1.025]"/>
  </div>
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-r from-black/80 via-black/55 to-black/75"/>
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-black/80 via-black/30 to-black/90"/>
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,transparent_16%,rgba(0,0,0,.72)_100%)]"/>
  <motion.div aria-hidden className="pointer-events-none absolute left-1/2 top-[38%] h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/10 blur-[150px]" animate={reduced?undefined:{scale:[1,1.12,1],opacity:[.28,.58,.28]}} transition={{duration:11,repeat:Infinity,ease:"easeInOut"}}/>
  <motion.div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-700/[.08] blur-[130px]" animate={reduced?undefined:{x:[0,80,0],y:[0,-25,0]}} transition={{duration:14,repeat:Infinity,ease:"easeInOut"}}/>
  <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.035] [background-image:radial-gradient(circle_at_center,white_0.7px,transparent_0.8px)] [background-size:18px_18px]"/>
  <div className="relative mx-auto max-w-6xl">
   <motion.div initial={{opacity:0,y:36}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.35}} transition={{duration:.9,ease:[.22,1,.36,1]}} className="border-y border-white/10 py-20 text-center md:py-28">
    <p className="text-[10px] uppercase tracking-[.38em] text-white/35">{t("fromKryvyiRih")}</p>
    <h2 className="mt-6 text-[clamp(4rem,10vw,9rem)] font-semibold leading-[.82] tracking-[-.075em] text-white">{t("toWorld")}</h2>
    <p className="mx-auto mt-8 max-w-xl text-base leading-7 text-white/48 md:text-lg">{t("continueListening")}</p>
    <div className="mx-auto mt-10 h-px w-20 bg-gradient-to-r from-transparent via-red-500 to-transparent"/>
   </motion.div>

   <div className="mt-16 md:mt-24">
    <p className="text-center text-[10px] uppercase tracking-[.34em] text-white/35">{t("availableOn")}</p>
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {platforms.map((platform,index)=><motion.a key={platform.name} href={platform.href} target={platform.href.startsWith("mailto:")?undefined:"_blank"} rel={platform.href.startsWith("mailto:")?undefined:"noreferrer"} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{duration:.65,delay:index*.045,ease:[.22,1,.36,1]}} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[.025] p-6 transition duration-500 hover:-translate-y-1 hover:border-red-500/40 hover:bg-white/[.05]">
       <div className="absolute inset-0 translate-y-full bg-gradient-to-t from-red-700/10 to-transparent transition-transform duration-700 group-hover:translate-y-0"/>
       <div className="relative flex items-end justify-between gap-5"><div><p className="text-[10px] uppercase tracking-[.24em] text-red-400/80">{t(platform.key)}</p><h3 className="mt-3 text-2xl font-semibold tracking-[-.035em] text-white">{platform.name}</h3></div><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-white/65 transition duration-500 group-hover:border-red-500/50 group-hover:bg-red-600 group-hover:text-white">↗</span></div>
      </motion.a>)}
    </div>
   </div>
  </div>
 </section>;
}
