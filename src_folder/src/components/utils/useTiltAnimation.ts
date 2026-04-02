import { useEffect, RefObject } from "react";
import gsap from "gsap";

/**
 * Applies 3D tilt animation to elements on mouse move.
 * The element rotates based on cursor position relative to it.
 */
export function useTiltAnimation(
  containerRef: RefObject<HTMLElement>,
  elementsSelector: string,
  options?: {
    maxRotation?: number;
    perspective?: number;
    springiness?: number;
  }
) {
  const maxRotation = options?.maxRotation ?? 12;
  const perspective = options?.perspective ?? 1000;
  const springiness = options?.springiness ?? 0.6;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = 0;
    let pendingEvent: MouseEvent | null = null;

    const applyTilt = (e: MouseEvent) => {
      const elements = container.querySelectorAll(elementsSelector);
      elements.forEach((element) => {
        const el = element as HTMLElement;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        const rotateX = (y / height) * -maxRotation;
        const rotateY = (x / width) * maxRotation;

        gsap.to(el, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: perspective,
        });
      });
    };

    const onMouseMove = (e: Event) => {
      pendingEvent = e as MouseEvent;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        if (pendingEvent) applyTilt(pendingEvent);
      });
    };

    const onMouseLeave = () => {
      const elements = container.querySelectorAll(elementsSelector);
      elements.forEach((element) => {
        const el = element as HTMLElement;
        gsap.to(el, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        });
      });
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [containerRef, elementsSelector, maxRotation, perspective]);
}
