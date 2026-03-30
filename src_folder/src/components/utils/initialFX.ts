import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";
  const main = document.getElementsByTagName("main")[0];
  if (main) main.classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#050810",
    duration: 0.5,
    delay: 1,
  });

  // Fade and slide header/intro info
  gsap.fromTo(
    ".landing-info h3, .landing-intro h2, .landing-intro h1",
    { opacity: 0, y: 80, filter: "blur(10px)" },
    {
      opacity: 1,
      duration: 1.5,
      filter: "blur(0px)",
      ease: "expo.out",
      y: 0,
      stagger: 0.2,
      delay: 0.5,
    }
  );

  // Fade-in the container for the rotating titles
  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      y: 0,
      delay: 1.2,
    }
  );
  
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut",
      delay: 0.2,
    }
  );

  // Re-engineered word flip without overlap
  loopText(".landing-h2-1", ".landing-h2-2");
}

function loopText(first: string, second: string) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
  const duration = 1.2;
  const ease = "expo.inOut";

  // Hide second initially
  gsap.set(second, { y: 100, opacity: 0, visibility: 'hidden' });

  tl.to(first, {
    y: -100,
    opacity: 0,
    duration: duration,
    ease: ease,
    onComplete: () => gsap.set(first, { visibility: 'hidden' })
  })
  .to(second, {
    visibility: 'visible',
    y: 0,
    opacity: 1,
    duration: duration,
    ease: ease,
  }, "-=0.2") // Small overlap but only during the slide phase
  .to(second, {
    y: -100,
    opacity: 0,
    duration: duration,
    ease: ease,
    delay: 2,
    onComplete: () => gsap.set(second, { visibility: 'hidden' })
  })
  .to(first, {
    visibility: 'visible',
    y: 0,
    opacity: 1,
    duration: duration,
    ease: ease,
  }, "-=0.2");
}
