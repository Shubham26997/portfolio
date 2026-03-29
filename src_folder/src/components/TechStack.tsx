import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";

const textureLoader = new THREE.TextureLoader();

// Mapping the final 9 custom icons including RAG pipelines and Vector DB placeholders
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

const cylinderGeometry = new THREE.CylinderGeometry(1.4, 1.4, 0.4, 32);

// Reduced radius appropriately for the updated camera distance
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
  
  // Set up the custom glass-like material
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: texture,
    emissive: "#00f0ff", // Neon cyan underneath the logo
    emissiveMap: texture,
    emissiveIntensity: 0.15, // Base subtle glow
    metalness: 0.5,
    roughness: 0.3,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    color: "#ffffff", // Bright base color so the coins themselves are highly visible
  }), [texture]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // T is paused if not in view
    const t = isActive ? state.clock.getElapsedTime() : 0;
    
    // Rotate very slowly 
    const currentAngle = angle + t * 0.15; 
    
    const x = Math.cos(currentAngle) * RADIUS;
    const z = Math.sin(currentAngle) * RADIUS;
    
    // Organic wave bobbing
    const y = Math.sin(t * 1.5 + index) * 0.8;
    
    meshRef.current.position.lerp(new THREE.Vector3(x, y, z), 0.1);
    
    meshRef.current.rotation.x = Math.PI / 2;
    // They slowly spin identically
    meshRef.current.rotation.y = t * 0.5;
    
    // Animate structural pop on hover
    const targetScale = hovered ? 1.5 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
    
    // Spike the internal emissive light when hovered
    const targetEmissive = hovered ? 0.9 : 0.15;
    material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetEmissive, 0.1);
  });

  return (
    <mesh
      ref={meshRef}
      geometry={cylinderGeometry}
      material={material}
      castShadow
      receiveShadow
      onPointerOver={(e) => {
        e.stopPropagation(); // Prevents multiple highlights triggered from Z-index overlaps
        document.body.style.cursor = 'pointer';
        setHover(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        setHover(false);
      }}
    >
      {/* 3D mapped HTML label directly anchored to the coin */}
      {hovered && (
        <Html 
          distanceFactor={15} 
          position={[0, 0, 1.8]} 
          center 
          zIndexRange={[100, 0]}
          style={{
            color: '#00f0ff',
            fontWeight: '900',
            fontSize: '18px',
            fontFamily: 'Geist, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '0px 0px 10px #00f0ff, 0px 0px 20px #00f0ff, 0px 0px 30px #00f0ff',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
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
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const workElem = document.getElementById("work");
      if(workElem) {
        const threshold = workElem.getBoundingClientRect().top;
        setIsActive(scrollY > threshold - 400);
      } else {
        setIsActive(true);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="techstack">
      <h2>My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: true }}
        camera={{ position: [0, 0, 32], fov: 45, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        {/* Expanded ambient brightness */}
        <ambientLight intensity={1.5} />
        
        {/* Core light radiating outward onto the carousel */}
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#00f0ff" distance={20} decay={2} />

        {/* Sharp spotlight casting stark shadows */}
        <spotLight
          position={[10, 25, 20]}
          penumbra={1}
          angle={0.5}
          color="#00f0ff"
          intensity={150} 
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 5, 5]} intensity={4} color="#ffffff" />
        
        <group rotation={[0.4, 0, 0]} position={[0, -3, 0]}>
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
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.8}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          {/* Subtle dark-cyan ambient occlusion */}
          <N8AO color="#001a33" aoRadius={2} intensity={2.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
