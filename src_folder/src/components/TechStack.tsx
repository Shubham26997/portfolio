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
  activeTapIndex: number | null;
  onTap: (index: number | null) => void;
};

function TechNode({ index, total, item, isActive, activeTapIndex, onTap }: TechNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const tapped = activeTapIndex === index;

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

    const active = hovered || tapped;
    const targetScale = active ? 1.5 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.15
    );

    const targetEmissive = active ? 0.9 : 0.15;
    material.emissiveIntensity = THREE.MathUtils.lerp(
      material.emissiveIntensity,
      targetEmissive,
      0.1
    );
  });

  const showLabel = hovered || tapped;

  return (
    <mesh
      ref={meshRef}
      geometry={cylinderGeometry}
      material={material}
      castShadow
      receiveShadow
      onPointerOver={(e) => {
        if (e.pointerType === "touch") return;
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        setHover(true);
      }}
      onPointerOut={(e) => {
        if (e.pointerType === "touch") return;
        document.body.style.cursor = "auto";
        setHover(false);
      }}
      onPointerDown={(e) => {
        if (e.pointerType !== "touch") return;
        e.stopPropagation();
        onTap(tapped ? null : index);
      }}
    >
      {showLabel && (
        <Html
          distanceFactor={15}
          position={[0, 0, 1.8]}
          center
          zIndexRange={[100, 0]}
          style={{
            color: "#00f0ff",
            fontWeight: "900",
            fontSize: "14px",
            letterSpacing: "2px",
            textShadow: "0px 0px 8px #00f0ff",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            background: "rgba(10, 25, 47, 0.85)",
            border: "1px solid rgba(0, 240, 255, 0.4)",
            padding: "4px 10px",
            borderRadius: "6px",
            backdropFilter: "blur(6px)",
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
  const [activeTapIndex, setActiveTapIndex] = useState<number | null>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const canvasHeight = isMobile ? 340 : 500;
  const groupTiltX = isMobile ? 0.15 : 0.4;

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
        paddingTop: isMobile ? "40px" : "80px",
        paddingBottom: isMobile ? "40px" : "100px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: isMobile ? "40px" : "64px",
          fontWeight: "800",
          letterSpacing: "4px",
          color: "#cfd6e6",
          marginBottom: "24px",
          position: "relative",
          top: 0,
          zIndex: 10,
        }}
      >
        MY TECHSTACK
      </h2>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: `${canvasHeight}px`,
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

          <group rotation={[groupTiltX, 0, 0]} position={[0, -0.5, 0]}>
            {techData.map((item, i) => (
              <TechNode
                key={i}
                index={i}
                total={techData.length}
                item={item}
                isActive={isActive}
                activeTapIndex={activeTapIndex}
                onTap={setActiveTapIndex}
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