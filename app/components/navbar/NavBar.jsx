"use client";
import React from "react";
import Link from "next/link";
import MobileNav from "./MobileNav";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <>
      <nav className="w-full flex flex-row justify-between items-center text-white p-4 z-50">
        <Link href="/" className="text-2xl font-semibold">
          <span className="text-violet-600 text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tighter text-red-600">
            Movix
          </span>
        </Link>
        <div className="mx-auto">
          <SearchBar />
        </div>
      </nav>

      <MobileNav />
    </>
  );
}
