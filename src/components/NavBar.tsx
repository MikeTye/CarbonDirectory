"use client";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-tce-ink/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full border border-tce-line" />
          <span className="text-xs tracking-widest text-tce-faint">THE<br/>CARBON<br/>ECONOMY</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-tce-mist">
          <Link href="#">Home</Link>
          <Link href="#">About us</Link>
          <Link href="#">Services</Link>
        </nav>
        <Link
          href="#"
          className="rounded-full border border-tce-line px-4 py-2 text-sm text-tce-mint hover:bg-white/5"
        >
          Contact Us
        </Link>
      </div>
    </header>
  );
}