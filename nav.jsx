import { useRef, useEffect } from "react";
import "./Navbar.css"

const Navbar = () => {
  const hamburger = useRef(null);
  const invisible_section = useRef(null);
  const visible_section = useRef(null);

  useEffect(() => {
    const fn = () => {
      const ham = hamburger.current;
      const invisible = invisible_section.current;

      if (invisible.children.length === 0) {
        ham.classList.add("op-none");

        if (ham.classList.contains("active")) {
          ham.classList.remove("active");
        }
        if (invisible.classList.contains("show-option")) {
          invisible.classList.remove("show-option");
        }
      } else {
        if (ham.classList.contains("op-none")) {
          ham.classList.remove("op-none");
        }
      }
      next_move();
      back_moove();
    };

    const next_move = () => {
      const info = current_information_wd();
      const gap = info[0] || 0;
      const parentWidth = info[1];
      const totalPadding = info[2];
      let totalWidth = 0;
      const items = document.querySelectorAll(".nav-links li");

      items.forEach((item) => {
        totalWidth += item.getBoundingClientRect().width + gap;
        if (totalWidth + totalPadding - gap >= parentWidth) {
          go_invisible();
        }
      });
    };

    const back_moove = () => {
      if (invisible_section.current.children.length > 0) {
        const info = current_information_wd();
        const gap = info[0] || 0;
        const parentWidth = info[1];
        const totalPadding = info[2];
        const safe = 20;
        const items = document.querySelectorAll(".nav-links li");

        let totalWidth =
          gap +
          safe +
          invisible_section.current.lastElementChild.getBoundingClientRect()
            .width;
        items.forEach((item) => {
          totalWidth += item.getBoundingClientRect().width + gap;
        });

        if (totalWidth + totalPadding < parentWidth) {
          go_visible();
        }
      }
    };

    const current_information_wd = () => {
      const parent = document.querySelector(".nav-links");
      const style = window.getComputedStyle(parent);
      const gap = parseInt(style.gap) || 0;
      const paddingLeft = parseInt(style.paddingLeft) || 0;
      const paddingRight = parseInt(style.paddingRight) || 0;
      const parentWidth = parent.getBoundingClientRect().width;

      return [gap, parentWidth, paddingLeft + paddingRight];
    };

    const go_invisible = () => {
      if (visible_section.current.childElementCount > 0) {
        const last = visible_section.current.lastElementChild;
        invisible_section.current.prepend(last);
      }
    };

    const go_visible = () => {
      if (invisible_section.current.childElementCount > 0) {
        const first = invisible_section.current.firstElementChild;
        visible_section.current.append(first);
      }
    };

    const handleResizeEvents = () => {
      for (let i = 0; i < 7; i++) {
        fn();
      }
    };

    const windowEvents = [
      "resize",
      "load",
      "orientationchange",
      "beforeunload",
      "unload",
      "focus",
    ];

    windowEvents.forEach((event) =>
      window.addEventListener(event, handleResizeEvents)
    );

    // Setup nav link click handler
    const links = document.querySelectorAll(".nav-links a");
    links.forEach((link) =>
      link.addEventListener("click", () => {
        hamburger.current.classList.remove("active");
        invisible_section.current.classList.remove("show-option");
      })
    );

    return () => {
      windowEvents.forEach((event) =>
        window.removeEventListener(event, handleResizeEvents)
      );
    };
  }, []);

  const hamburgerClick = () => {
    hamburger.current.classList.toggle("active");
    invisible_section.current.classList.toggle("show-option");

    for (let i = 0; i < 7; i++) {
      // call inner function
    }
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="logo">
            <a href="#">Logo</a>
          </div>
          <ul className="nav-links visible_section" ref={visible_section}>
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
          </ul>

          <div className="hamburger" onClick={hamburgerClick} ref={hamburger}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>

        <div className="invisible_section" ref={invisible_section}></div>
      </header>
    </>
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

      ["resize", "load", "beforeunload", "unload", "focus"].forEach((event) =>
        window.addEventListener(event, fn)
      );
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













