import React from "react";
import { Link } from "react-router-dom";

function Navbar(): JSX.Element {
  return (
    <nav className="flex flex-row justify-start p-2 border-b-2 border-gray-900 sticky top-0">
      <Link
        to="mock1"
        aria-label="link-mock1"
        className="border-r-2 border-gray-900 p-2 hover:text-gray-600"
      >
        Mock 1
      </Link>
      <Link
        to="mock2"
        aria-label="link-mock2"
        className="border-r-2 border-gray-900 p-2 hover:text-gray-600"
      >
        Mock 2
      </Link>
    </nav>
  );
}

export default Navbar;
