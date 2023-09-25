"use client";
import React, { useState } from "react";
import Link from "next/link";
import MobileNav from "./MobileNav";
import Menu from "./Menu";
import Sidebar from "../SideMenu";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <nav className="w-full h-24 bg-gray-950 flex flex-row justify-between items-center text-white p-4 z-50">
        <Link href="/" className="text-2xl font-semibold">
          <span className="text-violet-600 text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tighter text-red-600">
            Movix
          </span>
        </Link>
        <Menu toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} />
      </nav>

      <MobileNav />
    </>
  );
}
