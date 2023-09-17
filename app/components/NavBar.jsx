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
    <nav className="fixed top-0 w-full bg-slate-900 text-white p-4 z-50">
      <div className="w-full h-12 flex flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-semibold">
          Netznix
        </Link>
        <button
          onClick={toggleMobileMenu}
          className="text-white order-last mx-2"
        >
          <FontAwesomeIcon
            icon={faBars}
            size="lg"
            className="text-white select-none"
          />
        </button>

        <button className="text-white ml-28">
          <FontAwesomeIcon icon={faSearch} size="lg" className="text-white" />
        </button>
      </div>

      <div
        className={`${
          isMobileMenuOpen ? "translate-y-16" : "-translate-y-full"
        } fixed top-4 left-0 w-full h-screen bg-slate-900 transform transition-transform ease-in-out duration-500`}
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
