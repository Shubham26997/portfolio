import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";

const textureLoader = new THREE.TextureLoader();

const techData = [
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Django", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" },
  { name: "FastAPI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "LangChain", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/networkx/networkx-original.svg" },
  { name: "Vector DB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
  { name: "RAG & LLMs", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
];

const cylinderGeometry = new THREE.CylinderGeometry(2.0, 2.0, 0.5, 32);
const RADIUS = 8;

type TechNodeProps = {
  index: number;
  total: number;
  item: { name: string; url: string };
  isActive: boolean;
};

function TechNode({ index, total, item, isActive }: TechNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  const angle = (index / total) * Math.PI * 2;
  const texture = useMemo(() => textureLoader.load(item.url), [item.url]);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: "#00f0ff",
        emissiveMap: texture,
        emissiveIntensity: 0.15,
        metalness: 0.5,
        roughness: 0.3,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        color: "#ffffff",
      }),
    [texture]
  );

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = isActive ? state.clock.getElapsedTime() : 0;
    const currentAngle = angle + t * 0.15;

    const x = Math.cos(currentAngle) * RADIUS;
    const z = Math.sin(currentAngle) * RADIUS;
    const y = Math.sin(t * 1.5 + index) * 0.8;

    meshRef.current.position.lerp(new THREE.Vector3(x, y, z), 0.1);

    meshRef.current.rotation.x = Math.PI / 2;
    meshRef.current.rotation.y = t * 0.5;

    const targetScale = hovered ? 1.5 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.15
    );

    const targetEmissive = hovered ? 0.9 : 0.15;
    material.emissiveIntensity = THREE.MathUtils.lerp(
      material.emissiveIntensity,
      targetEmissive,
      0.1
    );
  });

  return (
    <mesh
      ref={meshRef}
      geometry={cylinderGeometry}
      material={material}
      castShadow
      receiveShadow
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        setHover(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
        setHover(false);
      }}
    >
      {hovered && (
        <Html
          distanceFactor={15}
          position={[0, 0, 1.8]}
          center
          zIndexRange={[100, 0]}
          style={{
            color: "#00f0ff",
            fontWeight: "900",
            fontSize: "18px",
            letterSpacing: "2px",
            textShadow:
              "0px 0px 10px #00f0ff, 0px 0px 20px #00f0ff, 0px 0px 30px #00f0ff",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {item.name}
        </Html>
      )}
    </mesh>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const observer = document.querySelector(".techstack");
      if (observer) {
        const top = observer.getBoundingClientRect().top;
        setIsActive(top < window.innerHeight + 200);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="techstack"
      style={{
        position: "relative",
        paddingTop: "80px",
        paddingBottom: "100px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "64px",
          fontWeight: "800",
          letterSpacing: "4px",
          color: "#cfd6e6",
          marginBottom: "40px",
          position: "relative",
          zIndex: 10,
        }}
      >
        MY TECHSTACK
      </h2>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          opacity: isActive ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      >
        <Canvas
          shadows
          gl={{ alpha: true, stencil: false, depth: false, antialias: true }}
          camera={{ position: [0, 0, 26], fov: 45 }}
          onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        >
          <ambientLight intensity={1.5} />
          <pointLight position={[0, 0, 0]} intensity={2.5} color="#00f0ff" />

          <spotLight
            position={[10, 25, 20]}
            penumbra={1}
            angle={0.5}
            color="#00f0ff"
            intensity={150}
            castShadow
          />

          <directionalLight position={[-5, 5, 5]} intensity={4} />

          {/* FINAL POSITION FIX */}
          <group rotation={[0.4, 0, 0]} position={[0, -0.5, 0]}>
            {techData.map((item, i) => (
              <TechNode
                key={i}
                index={i}
                total={techData.length}
                item={item}
                isActive={isActive}
              />
            ))}
          </group>

          <Environment
            files={import.meta.env.BASE_URL + "models/char_enviorment.hdr"}
          />

          <EffectComposer enableNormalPass={false}>
            <N8AO color="#001a33" aoRadius={2} intensity={2.5} />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
};

export default TechStack;