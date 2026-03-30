import { useEffect, useState } from "react";
import "./styles/Cursor.css";
import { gsap } from "gsap";

const Cursor = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const prefersReducedMotion =
          typeof window !== "undefined" &&
          window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        setIsMobile(window.innerWidth < 1024 || prefersReducedMotion);
        
        const cursor = document.querySelector(".custom-cursor") as HTMLElement;
        const cursorDot = document.querySelector(".cursor-dot") as HTMLElement;
        
        if (!cursor || window.innerWidth < 1024 || prefersReducedMotion) return;

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power2.out"
            });
            gsap.to(cursorDot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        };

        const onMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest(".social-icons") || target.getAttribute("data-cursor") === "pointer") {
                cursor.classList.add("cursor-hover");
            }
        };

        const onMouseLeave = () => {
            cursor.classList.remove("cursor-hover");
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", onMouseEnter);
        document.addEventListener("mouseout", onMouseLeave);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", onMouseEnter);
            document.removeEventListener("mouseout", onMouseLeave);
        };
    }, []);

    if (isMobile) return null;

    return (
        <>
            <div className="custom-cursor"></div>
            <div className="cursor-dot"></div>
        </>
    );
};

export default Cursor;
