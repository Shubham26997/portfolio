import { useState } from "react";
import HoverLinks from "./HoverLinks";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import "./styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navId = "primary-navigation";
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          SG
        </a>
        <a
          href="mailto:shubhamgoel386@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          Software Engineer
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls={navId}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

        <ul id={navId} className={menuOpen ? "nav-open" : ""} aria-hidden={!menuOpen}>
          <li>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a href="#work" onClick={() => setMenuOpen(false)}>
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
