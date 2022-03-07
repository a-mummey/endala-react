import React from "react";
import { Link } from "react-router-dom";

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
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/gallery">Gallery</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
