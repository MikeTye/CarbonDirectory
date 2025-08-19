import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-tce-line/40">
      <div className="mx-auto max-w-7xl px-4 py-10 text-xs text-tce-faint">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full border border-tce-line" />
          <div>
            <p>The carbon economy is a new operating system for climate action.</p>
            <p className="mt-1">© {new Date().getFullYear()} The Carbon Economy. All Rights Reserved.</p>
          </div>
        </div>
        <div className="mt-6 flex gap-6">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms &amp; Conditions</Link>
          <Link href="#">Support</Link>
        </div>
      </div>
    </footer>
  );
}