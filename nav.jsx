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


/* this is html file and css file already uploded
 <header>
      <nav class="navbar">
        <div class="logo">
          <a href="#">Logo</a>
        </div>
        <ul class="nav-links visible_section">
          <li>
            <a href="#" class="active"><i class="fas fa-home"></i> Home</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-info-circle"></i> About</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-briefcase"></i> Services</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-envelope"></i> Contact</a>
          </li>

          <li>
            <a href="#"><i class="fas fa-envelope"></i> option</a>
          </li>

          <li>
            <a href="#"><i class="fas fa-envelope"></i> option 1</a>
          </li>

          <li>
            <a href="#"><i class="fas fa-envelope"></i> product</a>
          </li>
        </ul>

        <div class="hamburger">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </nav>

      <div class="invisible_section"></div>
    </header>
*/

/* this is working transform it into jsx a letter
 <script>
      const hamburger = document.querySelector(".hamburger");
      const invisibleSection = document.querySelector(".invisible_section");

      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        invisibleSection.classList.toggle("show-option");
        for (let i = 0; i < 7; i++) {
          fn();
        }
      });

      document.querySelectorAll(".nav-links a").forEach((n) =>
        n.addEventListener("click", () => {
          hamburger.classList.remove("active");
          // navLinks.classList.remove("active");
        })
      );

      let invisible_section = document.querySelector(".invisible_section");
      let visible_section = document.querySelector(".visible_section");

      window.addEventListener("resize", fn);
      fn();

      function fn() {
        if (invisible_section.children.length == 0) {
          hamburger.classList.add("op-none");
          if (invisibleSection.classList.contains("show-option")) {
            invisibleSection.classList.toggle("show-option");
          }
        } else {
          if (hamburger.classList.contains("op-none")) {
            hamburger.classList.remove("op-none");
          }
        }

        next_move();
        back_moove();
      }

      
      function next_move() {
        let info_wds = current_information_wd();
        const gap = info_wds[0] || 0;
        const parentWidth = info_wds[1];
        const totalPadding = info_wds[2];
        let totleWidth = 0;
        let items = document.querySelectorAll(".nav-links li");

        items.forEach((item) => {
          totleWidth += item.getBoundingClientRect().width + gap;
          if (totleWidth + totalPadding - gap >= parentWidth) {
            go_invisible();
          }
        });
      }

      function back_moove() {
        if (invisible_section.children.length > 0) {
          let info_wds = current_information_wd();
          const gap = info_wds[0] || 0;
          const parentWidth = info_wds[1];
          const totalPadding = info_wds[2];
          const safe = 20;
          let items = document.querySelectorAll(".nav-links li");

          let totleWidth =
            gap +
            safe +
            invisible_section.lastElementChild.getBoundingClientRect().width;
          items.forEach((item) => {
            totleWidth += item.getBoundingClientRect().width + gap;
          });

          if (totleWidth + totalPadding < parentWidth) {
            go_visible();
          }
        }
      }

      function current_information_wd() {
        const parent = document.querySelector(".nav-links");
        const parentStyle = window.getComputedStyle(parent);
        const paddingRight = parseInt(parentStyle.paddingRight) || 0;
        const paddingLeft = parseInt(parentStyle.paddingLeft) || 0;
        const totalPadding = paddingLeft + paddingRight;
        const gap = parseInt(parentStyle.gap) || 0;
        const parentWidth = parent.getBoundingClientRect().width;

        return [gap, parentWidth, totalPadding];
      }

      function go_invisible() {
        if (visible_section.childElementCount) {
          const last_child = visible_section.lastElementChild;
          invisible_section.prepend(last_child);
        }
      }

      function go_visible() {
        if (invisible_section.childElementCount) {
          const last_child = invisible_section.firstElementChild;
          visible_section.append(last_child);
        }
      }
    </script>

*/













