import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setContactWaveActive } from "../Character/utils/characterControls";

gsap.registerPlugin(ScrollTrigger);

// ======================
// CHARACTER TIMELINE
// ======================
export function setCharTimeline(
  character: THREE.Object3D | null,
  camera: THREE.PerspectiveCamera
) {
  if (!character || !camera) return;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return;

  const ctx = gsap.context(() => {
    gsap.killTweensOf(".character-model");

    let screenLight: THREE.Mesh | null = null;
    let monitor: THREE.Mesh | null = null;

    character.children.forEach((object) => {
      if (object.name === "Plane004") {
        object.children.forEach((child) => {
          if (!(child instanceof THREE.Mesh)) return;
          child.material.transparent = true;
          child.material.opacity = 0;

          if (child.material.name === "Material.018") {
            monitor = child;
            (child.material as THREE.MeshStandardMaterial).color.set("#FFFFFF");
          }
        });
      }

      if (object.name === "screenlight") {
        if (!(object instanceof THREE.Mesh)) return;

        object.material.transparent = true;
        object.material.opacity = 0;
        object.material.emissive.set("#B0F5EA");

        gsap.to(object.material, {
          emissiveIntensity: 4,
          duration: 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        screenLight = object;
      }
    });

    const neckBone = character.getObjectByName("spine005");

    if (window.innerWidth <= 1024) return;

    // TL1
    gsap.timeline({
      scrollTrigger: {
        trigger: ".landing-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
      .to(character.rotation, { y: 0.7 })
      .to(camera.position, { z: 22 }, 0)
      .to(".character-model", { x: "-25%", overwrite: "auto" }, 0);

    // TL2
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "center 55%",
        end: "bottom top",
        scrub: true,
      },
    });

    tl2
      .to(camera.position, {
        z: 75,
        y: 8.4,
        duration: 6,
        ease: "power3.inOut",
      })
      .to(
        ".character-model",
        { x: "-48%", opacity: 0, overwrite: "auto" },
        0
      )
      .to(
        character.rotation,
        { y: 0.92, x: 0.12, duration: 3 },
        0
      );

    if (neckBone) {
      tl2.to(neckBone.rotation, { x: 0.6, duration: 3 }, 0);
    }

    if (monitor) {
      tl2.to(monitor.material, { opacity: 1, duration: 1 }, 0);
    }

    if (screenLight) {
      tl2.to(screenLight.material, { opacity: 1, duration: 1 }, 0);
    }

    // TL3
    gsap.timeline({
      scrollTrigger: {
        trigger: ".whatIDO",
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    }).to(".character-model", {
      y: "-100%",
      opacity: 0,
      duration: 4,
      overwrite: "auto",
    });

    // CONTACT
    ScrollTrigger.create({
      trigger: ".contact-section",
      start: "top 70%",
      onEnter: () => {
        gsap.killTweensOf(".character-model");

        setContactWaveActive(true);

        gsap.set(".character-model", {
          x: "32%",
          y: "-100%",
          opacity: 0,
        });

        gsap.to(".character-model", {
          y: "-5%",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(character.rotation, {
          y: -0.35,
          x: 0.05,
          duration: 1,
        });

        if (neckBone) {
          gsap.to(neckBone.rotation, {
            y: -0.2,
            x: 0.1,
            duration: 1.2,
          });
        }
      },
      onLeave: cleanup,
      onLeaveBack: cleanup,
    });

    function cleanup() {
      setContactWaveActive(false);

      gsap.to(".character-model", {
        y: "-100%",
        x: "-48%",
        opacity: 0,
        duration: 0.8,
        overwrite: "auto",
      });
    }
  });

  return () => ctx.revert();
}

// ======================
// CAREER TIMELINE
// ======================
export function setAllTimeline() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return;

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