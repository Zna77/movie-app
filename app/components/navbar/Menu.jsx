// Menu.js
import React from "react";
import { FaBars } from "react-icons/fa";

export default function Menu({ toggleSidebar }) {
  return (
    <div className="hidden sm:inline-block text-2xl mr-2 cursor-pointer">
      <FaBars onClick={toggleSidebar} />
    </div>
  );
}
