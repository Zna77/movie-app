import React from "react";
import Link from "next/link";
import { FaHome, FaCompass, FaBookmark, FaUserCircle } from "react-icons/fa";

export default function Sidebar({ isOpen }) {
  // Conditionally set the width and transform property based on the 'isOpen' prop
  const sidebarStyles = isOpen
    ? "hidden sm:block sm:fixed sm:top-0 sm:left-0 sm:h-screen sm:w-96 sm:bg-gray-900 sm:text-white sm:z-30 sm:transform sm:translate-x-0 sm:transition-transform sm:duration-300 sm:ease-in-out"
    : "fixed top-0 left-0 h-screen bg-gray-900 text-white z-30 transition-all transform -translate-x-full duration-300 ease-in-out";

  return (
    <aside className={sidebarStyles}>
      <nav className="mt-10 p-16">
        <div className="">
          <h2 className="text-xl font-bold uppercase">Menu</h2>
          <ul className="space-y-2 p-8 text-xl font-semibold font-roboto">
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
                  <FaCompass className="text-2xl" />
                  <span>Explore</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/bookmarks">
                <div className="flex items-center space-x-6 text-lg p-2 hover:bg-gray-800">
                  <FaBookmark className="text-2xl" />
                  <span>Bookmarks</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/favorites">
                <div className="flex items-center space-x-6 text-lg p-2 hover:bg-gray-800">
                  <FaUserCircle className="text-2xl" />
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
