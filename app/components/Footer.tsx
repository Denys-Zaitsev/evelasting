"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useLanguage } from "./LanguageContext";

export default function Footer(){
 const {t}=useLanguage(); const pathname=usePathname();
 const sectionHref=(section:string)=>pathname==="/"?`#${section}`:`/#${section}`;
 const nav=[{name:t("music"),href:sectionHref("music")},{name:t("story"),href:sectionHref("story")},{name:t("about"),href:"/about"},{name:t("contact"),href:sectionHref("contact")},{name:"Privacy",href:"/privacy"}];
 return <motion.footer initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{duration:.85,ease:[.22,1,.36,1]}} className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-10 text-white md:px-12"><div className="mx-auto flex max-w-6xl flex-col gap-10"><div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><a href="#" aria-label={t("backTop")} className="inline-block text-sm font-semibold tracking-[.28em] transition-opacity hover:opacity-60">EVELASTING</a><p className="mt-3 text-xs text-white/30">{t("soundReturns")}</p></div><nav aria-label={t("footerNav")} className="flex flex-wrap items-center gap-x-6 gap-y-3">{nav.map(item=><Link key={item.href} href={item.href} className="text-[10px] uppercase tracking-[.24em] text-white/35 transition-colors hover:text-white">{item.name}</Link>)}</nav></div><div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[.2em] text-white/20 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Evelasting</p><p>{t("location")}</p></div></div></motion.footer>;
}
