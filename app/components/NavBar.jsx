// Navbar.js
import React from "react";
import Link from "next/link";
import {
  FaBars,
  FaHome,
  FaCompass,
  FaBookmark,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";

export default function Navbar() {
  return (
    <>
      <nav className="w-full flex flex-row justify-between items-center text-white p-4 z-50">
        <Link href="/" className="text-2xl font-semibold">
          {/* Updated styling for "Netznix" */}
          <span className="text-violet-600 text-4xl font-extrabold uppercase tracking-tighter text-red-600">
            Movix
          </span>
        </Link>
        <button className="sm:hidden sm:text-xl">
          <FaSearch />
        </button>
        <div className="hidden sm:inline-block text-2xl mr-2">
          <FaBars />
        </div>
      </nav>
      <div className="sm:hidden z-50 flex flex-row justify-center items-center space-x-16 fixed bottom-0 bg-black/80 text-white/60 backdrop-blur-md w-full h-16 font-semibold">
        <Link href="/">
          <div>
            <FaHome size={24} />
          </div>
        </Link>

        <Link href="/">
          <div>
            <FaCompass size={24} />
          </div>
        </Link>

        <Link href="/">
          <div>
            <FaBookmark size={24} />
          </div>
        </Link>

        <Link href="/">
          <div>
            <FaUserCircle size={24} />
          </div>
        </Link>
      </div>
    </>
  );
}
