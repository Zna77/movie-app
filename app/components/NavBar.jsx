// Navbar.js
"use client";
// Navbar.js
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="w-full text-white p-4 z-50">
        <Link href="/" className="text-2xl font-semibold">
          Netznix
        </Link>
      </nav>
      <div className="z-50 fixed bottom-0 bg-black/80 backdrop-blur-md w-full h-16 rounded-tl-3xl rounded-tr-3xl"></div>
    </>
  );
}
