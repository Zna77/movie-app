import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  return (
    <header className="py-5 text-white uppercase">
      <nav className="flex flex-row justify-around items-center text-sm lg:text-lg lg:justify-start lg:ml-6">
        <ul className="flex justify-center items-center">
          <li>
            <Link href="/" className="text-2xl font-bold tracking-widest">
              Net<span className="text-violet-600">znix</span>
            </Link>
          </li>
          <li className="space-x-6 mx-20">
            <Link href="/">Home</Link>
            <Link href="/trending">Trending</Link>
            <Link href="/trending">Discover</Link>
            <Link href="/trending">People</Link>
            <Link href="/trending">Genres</Link>
            <Link href="/trending">Favorites</Link>
          </li>
        </ul>
        <div className="ml-9 relative flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-950 px-3 py-2 pl-10 border border-gray-700 rounded-full focus:outline-none focus:border-gray-300"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 text-gray-500"
          />
        </div>
      </nav>
    </header>
  );
};
