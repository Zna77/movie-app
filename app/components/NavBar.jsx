// Navbar.js
"use client";
// Navbar.js
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/50 backdrop-blur-sm bg-opacity-90 text-black p-4">
      <div className="w-full h-12 flex flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-semibold">
          Your Logo
        </Link>
        <button onClick={toggleMobileMenu} className="text-white">
          <FontAwesomeIcon icon={faBars} size="lg" className="text-black" />
        </button>

        <button className="text-white">
          <FontAwesomeIcon icon={faSearch} size="lg" className="text-black" />
        </button>
      </div>

      <div
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 w-64 h-screen bg-slate-100 transform transition-transform ease-in-out duration-300`}
      >
        {/* Sidebar Content */}
        <div className="p-6 mt-16 text-left">
          <div className="flex flex-col gap-5 mx-6 font-semibold">
            <Link href="/">
              <div>Home</div>
            </Link>
            <Link href="/">
              <div>Tending</div>
            </Link>
            <Link href="/">
              <div>Discovery</div>
            </Link>
            <Link href="/">
              <div>Community</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          className="fixed top-0 left-0 w-full h-screen"
        ></div>
      )}
    </nav>
  );
}
