import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center overflow-hidden bg-black px-6 text-white">
      <div className="relative max-w-3xl text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/20 blur-[120px]" />
        <p className="relative text-[10px] uppercase tracking-[0.42em] text-red-400">404 · Lost signal</p>
        <h1 className="relative mt-6 text-[clamp(3.2rem,10vw,8rem)] font-semibold leading-[0.88] tracking-[-0.07em]">
          This track was<br />never released.
        </h1>
        <p className="relative mx-auto mt-7 max-w-lg text-sm leading-7 text-white/45">
          The page does not exist, but the sound still returns.
        </p>
        <Link
          href="/"
          className="relative mt-10 inline-flex rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 text-[10px] uppercase tracking-[0.28em] transition hover:border-red-500/50 hover:bg-red-600"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
