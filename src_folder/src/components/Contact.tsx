import { useEffect, useRef, useState } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa6";
import { MdArrowOutward, MdCopyright, MdLock, MdLockOpen } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Contact.css";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isCompanyVisible, setIsCompanyVisible] = useState(false);

  const email = "shubhamgoel386@gmail.com";

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      if (titleRef.current) {
        titleRef.current.style.opacity = "1";
        titleRef.current.style.transform = "none";
      }
      return;
    }

    // Reveal Animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
          skewY: 5,
        },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
          },
        }
      );
    }

    const section = document.querySelector(".contact-section");
    if (!section) return;

    let rafId = 0;
    let pendingEvent: MouseEvent | null = null;

    const applyTilt = (e: MouseEvent) => {
      if (!cardRef.current || isEmailOpen) return;
      const { left, top, width, height } = cardRef.current.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      const rotateX = (y / height) * -15;
      const rotateY = (x / width) * 15;
      gsap.to(cardRef.current, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const onSectionMouseMove = (e: Event) => {
      pendingEvent = e as MouseEvent;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const ev = pendingEvent;
        pendingEvent = null;
        if (ev) applyTilt(ev);
      });
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      gsap.to(cardRef.current, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      });
    };

    section.addEventListener("mousemove", onSectionMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      section.removeEventListener("mousemove", onSectionMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isEmailOpen]);

  // Handle outside click for modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsEmailOpen(false);
      }
    };
    if (isEmailOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEmailOpen]);

  // Accessibility: focus management + ESC + basic Tab trap.
  useEffect(() => {
    if (!isEmailOpen) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setIsCopied(false);

    const focusTarget = copyButtonRef.current ?? closeButtonRef.current;
    const focusTimer = window.setTimeout(() => {
      focusTarget?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsEmailOpen(false);
        return;
      }

      if (event.key === "Tab") {
        const focusables = [copyButtonRef.current, closeButtonRef.current].filter(
          Boolean
        ) as HTMLElement[];

        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      lastFocusedRef.current?.focus();
    };
  }, [isEmailOpen]);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="contact-section" id="contact">
      <div className="section-container">
        <h2 className="contact-reveal-title" ref={titleRef}>
          Ready to scale <span>your next big thing?</span>
        </h2>

        <div className="contact-portal-layout">
          {/* Left: Card */}
          <div className="contact-portal-card" ref={cardRef}>
            <div className="portal-glow"></div>
            <div className="portal-content">
              <div className="portal-main">
                <span className="portal-label">Primary Channel</span>
                <div className="portal-identity">
                  <h3 className="portal-name">Shubham Goel</h3>

                  {/* Designation — click the lock to reveal company */}
                  <div
                    className="portal-designation-wrapper"
                    onClick={() => setIsCompanyVisible(!isCompanyVisible)}
                    title={isCompanyVisible ? "Click to hide" : "Click to reveal where I work"}
                  >
                    <p className="portal-designation">Senior Backend Engineer (SDE II)</p>
                    <span className="portal-lock-icon">
                      {isCompanyVisible ? <MdLockOpen /> : <MdLock />}
                    </span>
                    <div className={`portal-company-slide ${isCompanyVisible ? "visible" : ""}`}>
                      <span>@ Masters India IT</span>
                    </div>
                  </div>
                  {!isCompanyVisible && (
                    <p className="portal-reveal-hint">tap to reveal where I work →</p>
                  )}
                </div>

                {/* CTA — glows to force attention, redacted email builds curiosity */}
                <div className="portal-cta-wrapper">
                  <button
                    type="button"
                    onClick={() => setIsEmailOpen(true)}
                    className="portal-email-trigger"
                  >
                    Contact
                    <MdArrowOutward />
                  </button>
                  <div className="email-blur-hint">
                    <span className="email-blur-text">s••••••••g@gmail.com</span>
                    <span className="email-blur-label">↑ click to reveal</span>
                  </div>
                </div>
              </div>

              <div className="portal-grid">
                <div className="portal-item">
                  <span className="portal-label">Education</span>
                  <p className="portal-text">B.Tech in Electrical &amp; Electronics Engineering</p>
                </div>
                <div className="portal-item">
                  <span className="portal-label">Location</span>
                  <p className="portal-text">India, Noida &middot; Open to Remote</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 3D character appears here via GSAP on scroll */}
          <div className="contact-pointer-side"></div>
        </div>

        <div className="footer-credits">
          <div className="credit-text">
            <h4>Designed &amp; Developed by <span>Shubham Goel</span></h4>
            <p><MdCopyright /> 2026 — Senior Backend Engineer</p>
          </div>
        </div>
      </div>

      {isEmailOpen && (
        <div className="email-modal-overlay">
          <div
            className="email-modal-card"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-email-modal-title"
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="modal-close-btn"
              onClick={() => setIsEmailOpen(false)}
              aria-label="Close dialog"
            >
              ×
            </button>
            <span className="modal-label" id="contact-email-modal-title">Contact Unlocked</span>
            <p className="modal-title">Ready to connect?</p>

            <div className="email-display">
              <code>{email}</code>
              <button
                ref={copyButtonRef}
                type="button"
                className="copy-btn"
                onClick={copyEmail}
                aria-label="Copy email to clipboard"
              >
                {isCopied ? <FaCheck style={{ color: "var(--accentColor)" }} /> : <FaRegCopy />}
              </button>
            </div>
            {isCopied && (
              <p className="copy-notif" aria-live="polite" role="status">
                ✓ Copied!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
