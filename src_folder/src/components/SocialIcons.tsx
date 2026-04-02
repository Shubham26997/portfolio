import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect, useState } from "react";
import HoverLinks from "./HoverLinks";
const SocialIcons = () => {
  // "visible" = past hero; "contact" = at final section → hide floating icons
  const [visible, setVisible] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const scroller = document.querySelector(".main-body") as HTMLElement;
    if (!scroller) return;

    const onScroll = () => {
      const scrollY = scroller.scrollTop;
      const totalH = scroller.scrollHeight;
      const viewH  = scroller.clientHeight;

      // Show after scrolling past ~80% of first section
      setVisible(scrollY > viewH * 0.8);

      // Hide when within last section (contact)
      setAtContact(scrollY + viewH >= totalH - viewH * 0.4);
    };

    scroller.addEventListener("scroll", onScroll);
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    if (!social) return;

    const links = Array.from(social.querySelectorAll("a")) as HTMLElement[];
    const cleanupFns: Array<() => void> = [];

    links.forEach((link) => {
      const rect = link.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      let rafId = 0;
      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        rafId = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();

      cleanupFns.push(() => {
        document.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(rafId);
      });
    });

    return () => cleanupFns.forEach((fn) => fn());
  }, []);

  return (
    <div className={`icons-section ${visible ? "si-visible" : ""} ${atContact ? "si-hidden" : ""}`}>
      <div className="social-pill" data-cursor="icons" id="social">
        <a href="https://github.com/Shubham26997" target="_blank" aria-label="GitHub">
          <FaGithub />
        </a>
        <div className="pill-divider"></div>
        <a href="https://linkedin.com/in/shubhamgoel26" target="_blank" aria-label="LinkedIn">
          <FaLinkedinIn />
        </a>
      </div>
      <a className="resume-button" href={import.meta.env.BASE_URL + "Shubham_Goel_Resume.pdf"} target="_blank">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
