import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css"; // Move the CSS into a separate file

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const navRef = useRef(null);

  const toggleHamburger = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  const manageItem = (item, key) => {
    const parent = navRef.current;
    const parentStyle = window.getComputedStyle(parent);
    const gap = parseInt(parentStyle.gap) || 0;
    const paddingLeft = parseInt(parentStyle.paddingLeft) || 0;
    const paddingRight = parseInt(parentStyle.paddingRight) || 0;
    const totalPadding = paddingLeft + paddingRight;
    const parentWidth = parent.getBoundingClientRect().width;
    const items = Array.from(parent.querySelectorAll(".a"));
    const safe = 40;

    let totalWidth =
      totalPadding + item.getBoundingClientRect().width + gap + safe;

    items.forEach((i) => {
      totalWidth += i.getBoundingClientRect().width;
    });

    if (parentWidth > totalWidth && key === "add") {
      item.classList.add("a");
    }

    if (parentWidth < totalWidth && key === "del") {
      item.classList.remove("a");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const parent = navRef.current;
      if (!parent) return;
      const items = parent.querySelectorAll("li");

      items.forEach((item) => {
        manageItem(item, "add");
        manageItem(item, "del");
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="#">Logo</a>
      </div>
      <ul
        className={`nav-links ${menuActive ? "active" : ""}`}
        ref={navRef}
        onClick={closeMenu}
      >
        <li>
          <a href="#" className="active">
            <i className="fas fa-home"></i> Home
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fas fa-info-circle"></i> About
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fas fa-briefcase"></i> Services
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fas fa-envelope"></i> Contact
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fas fa-envelope"></i> Option
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fas fa-envelope"></i> Option 1
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fas fa-envelope"></i> Product
          </a>
        </li>
      </ul>
      <div
        className={`hamburger ${menuActive ? "active" : ""}`}
        onClick={toggleHamburger}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
