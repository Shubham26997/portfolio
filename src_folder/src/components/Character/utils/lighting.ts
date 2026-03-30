import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  const directionalLight = new THREE.DirectionalLight(0x10b981, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0x10b981, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  new RGBELoader()
    .setPath(import.meta.env.BASE_URL + "models/")
    .load("char_enviorment.hdr?v=2", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: THREE.Mesh | null) {
    if (!screenLight) {
      pointLight.intensity = 0;
      return;
    }

    const mat = screenLight.material as THREE.MeshStandardMaterial & {
      emissiveIntensity?: number;
    };
    if (mat.opacity > 0.9) {
      pointLight.intensity = (mat.emissiveIntensity ?? 0) * 20;
    } else {
      pointLight.intensity = 0;
    }
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.64,
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 1,
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  function turnOnLightsInstant() {
    // Reduced-motion friendly: apply the "final" visual state immediately.
    scene.environmentIntensity = 0.64;
    directionalLight.intensity = 1;

    const rim = document.querySelector(".character-rim") as HTMLElement | null;
    if (rim) {
      rim.style.opacity = "1";
      // Matches the base transform in Landing.css: translate(-50%, 100%) scale(1.4)
      // We just move it closer to the character by ~55%.
      rim.style.transform = "translate(-50%, 55%) scaleX(1.4)";
    }
  }

  return { setPointLight, turnOnLights, turnOnLightsInstant };
};

export default setLighting;
