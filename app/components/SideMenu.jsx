import React from "react";
import Link from "next/link";
import { FaHome, FaCompass, FaBookmark, FaUserCircle } from "react-icons/fa";

export default function Sidebar({ isOpen }) {
  // Conditionally set the width and transform property based on the 'isOpen' prop
  const sidebarStyles = isOpen
    ? "fixed top-0 left-0 h-screen w-0 sm:w-96 bg-gray-900 text-white z-30 transform translate-x-0 transition-transform duration-300 ease-in-out"
    : "fixed top-0 left-0 h-screen w-0 sm:w-64 bg-gray-900 text-white z-30 transition-all transform -translate-x-full duration-300 ease-in-out";

  return (
    <aside className={sidebarStyles}>
      <nav className="mt-10 p-16">
        <div className="">
          <h2 className="text-xl font-bold uppercase">Menu</h2>
          <ul className="space-y-2 p-8 text-xl font-normal font-roboto">
            <li>
              <Link href="/">
                <div className="flex items-center space-x-6 p-2 hover:bg-gray-800">
                  <FaHome className="text-2xl" />
                  <span>Home</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/explore">
                <div className="flex items-center space-x-6 text-lg p-2 hover:bg-gray-800">
                  <FaCompass />
                  <span>Explore</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/bookmarks">
                <div className="flex items-center space-x-6 text-lg p-2 hover:bg-gray-800">
                  <FaBookmark />
                  <span>Bookmarks</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/favorites">
                <div className="flex items-center space-x-6 text-lg p-2 hover:bg-gray-800">
                  <FaUserCircle />
                  <span>Favorites</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
