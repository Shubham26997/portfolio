// initialFX is no longer used — animations are handled
// directly in Landing.tsx via GSAP context.
// Kept as an empty export to avoid import errors during transition.
export function initialFX() {
  document.body.style.overflowY = "auto";
}
