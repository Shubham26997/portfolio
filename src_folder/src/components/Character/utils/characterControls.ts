import type { AnimationAction } from "three";

let typingAction: AnimationAction | null = null;
let keyActions: AnimationAction[] = [];

/** Call after the GLTF mixer is ready so Contact can mute conflicting animations. */
export function registerTypingAction(action: AnimationAction | null) {
  typingAction = action;
}

export function registerKeyActions(actions: AnimationAction[]) {
  keyActions = actions;
}

export function unregisterTypingAction() {
  typingAction = null;
  keyActions = [];
}

/**
 * Contact wave GSAP directly rotates arm bones; these mixer-driven actions also
 * animate the same bones, so we "mute" them while waving to prevent the
 * blended "double character" look.
 */
export function setContactWaveActive(active: boolean) {
  const typing = typingAction;
  if (typing) {
    if (active) {
      typing.fadeOut(0.15);
      typing.setEffectiveWeight(0);
    } else {
      typing.reset().play();
      typing.fadeIn(0.25);
      typing.setEffectiveWeight(1);
    }
  }

  for (const action of keyActions) {
    if (active) {
      action.fadeOut(0.15);
      action.setEffectiveWeight(0);
    } else {
      action.play();
      action.fadeIn(0.25);
      action.setEffectiveWeight(1);
    }
  }
}
