import Link from "next/link";
import { FaHome, FaCompass, FaBookmark, FaUserCircle } from "react-icons/fa";

export default function MobileNav() {
  return (
    <div className="sm:hidden w-full z-50 flex flex-row justify-center items-center space-x-16 fixed bottom-0 bg-black/80 text-white/60 backdrop-blur-md h-16 font-semibold">
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
  );
}
