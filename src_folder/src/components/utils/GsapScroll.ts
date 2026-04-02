import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ======================
// CAREER TIMELINE
// ======================
export function setAllTimeline() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return;

  // main-body is the scroll container — tell ScrollTrigger to use it
  ScrollTrigger.defaults({ scroller: ".main-body" });

  const ctx = gsap.context(() => {
    const careerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".career-section",
        start: "top 30%",
        end: "100% center",
        scrub: true,
      },
    });

    careerTimeline
      .fromTo(
        ".career-timeline",
        { maxHeight: "10%" },
        { maxHeight: "100%", duration: 0.5 }
      )
      .fromTo(
        ".career-timeline",
        { opacity: 0 },
        { opacity: 1, duration: 0.2 },
        0
      )
      .fromTo(
        ".career-info-box",
        { opacity: 0 },
        { opacity: 1, stagger: 0.1, duration: 0.5 },
        0
      )
      .fromTo(
        ".career-dot",
        { animationIterationCount: "infinite" },
        { animationIterationCount: "1", duration: 0.2 },
        0
      );

    if (window.innerWidth > 1024) {
      careerTimeline.to(".career-section", {
        y: "20%",
        duration: 0.5,
      });
    }
  });

  return () => ctx.revert();
}
