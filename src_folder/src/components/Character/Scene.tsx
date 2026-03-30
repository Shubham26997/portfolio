import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import {
  registerTypingAction,
  registerKeyActions,
  unregisterTypingAction,
} from "./utils/characterControls";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();
  useEffect(() => {
    if (canvasDiv.current) {
      const rect = canvasDiv.current.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
      
      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, isMobile ? 18 : (isTablet ? 15 : 13.1), 24.7);
      camera.zoom = isMobile ? 0.7 : (isTablet ? 0.9 : 1.1);
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: THREE.Mesh | null = null;
      let mixer: THREE.AnimationMixer | undefined;
      let loadedCharacter: THREE.Object3D | null = null;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };

      const onDocumentMouseMove = (event: MouseEvent) => {
        onMouseMove(event);
      };

      const onWindowResize = () => {
        if (loadedCharacter) {
          handleResize(renderer, camera, canvasDiv, loadedCharacter);
        }
      };

      if (!prefersReducedMotion) {
        document.addEventListener("mousemove", onDocumentMouseMove);
      }

      loadCharacter().then((gltf) => {
        if (gltf) {
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) {
            animations.hover(gltf, hoverDivRef.current);
          }
          mixer = animations.mixer;
          registerTypingAction(animations.typingAction);
          registerKeyActions(animations.keyActions);
          const character = gltf.scene;
          loadedCharacter = character;
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = (character.getObjectByName("screenlight") as THREE.Mesh) || null;
          progress.loaded().then(() => {
            if (prefersReducedMotion) {
              light.turnOnLightsInstant();
              if (screenLight) {
                light.setPointLight(screenLight);
              }
              renderer.render(scene, camera);
              return;
            }

            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
          window.addEventListener("resize", onWindowResize);
        }
      });
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv && !prefersReducedMotion) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      let rafId = 0;
      if (!prefersReducedMotion) {
        const animate = () => {
          rafId = requestAnimationFrame(animate);
          if (document.hidden) {
            return;
          }
          if (headBone) {
            handleHeadRotation(
              headBone,
              mouse.x,
              mouse.y,
              interpolation.x,
              interpolation.y,
              THREE.MathUtils.lerp
            );
            light.setPointLight(screenLight);
          }
          const delta = clock.getDelta();
          if (mixer) {
            mixer.update(delta);
          }
          renderer.render(scene, camera);
        };
        animate();
      }
      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(debounce);
        unregisterTypingAction();
        document.removeEventListener("mousemove", onDocumentMouseMove);
        window.removeEventListener("resize", onWindowResize);
        scene.clear();
        renderer.dispose();
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
