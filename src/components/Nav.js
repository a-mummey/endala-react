import React from "react";
import Link from "next/link";

function Nav() {
  return (
    <nav className="container-fluid">
      <ul>
        {/* <li>
          <strong>Brand</strong>
        </li> */}
      </ul>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/gallery">
            <a>Gallery</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
