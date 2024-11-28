import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="w-full relative flex items-center justify-between max-w-3xl mx-auto px-4 py-5">
      <Link
        href="/"
        className="text-3xl font-bold font-display"
      >
        Stephen<span className="text-primary">Trading</span>
      </Link>
      <ModeToggle />
    </nav>
  )
}
