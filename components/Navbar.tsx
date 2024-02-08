import Link from "next/link";
import { ThemeButton } from "./ThemeButton";


const Navbar = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex justify-between items-center w-full">
          <Link href="/">
            <h1 className="text-3xl font-medium">
              Geoff <span className="text-sky-500">Blog</span>
            </h1>
          </Link>
          <ThemeButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
