"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function SpinningShape({ seed = 0 }: { seed?: number }) {
  const ref = useRef<THREE.Group>(null!);
  const tint = useMemo(() => {
    const colors = ["#9b6fff", "#46e5ff", "#ffd074", "#ff5c9c"];
    return colors[seed % colors.length];
  }, [seed]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.3;
    ref.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.15;
  });

  return (
    <group ref={ref}>
      <RoundedBox args={[2.1, 2.6, 0.35]} radius={0.18} smoothness={6}>
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.6}
          roughness={0.08}
          ior={1.45}
          chromaticAberration={0.05}
          color={tint}
          attenuationColor={tint}
          attenuationDistance={2}
          distortion={0.15}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.22]}>
        <torusGeometry args={[0.6, 0.12, 32, 64]} />
        <meshPhysicalMaterial color={tint} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

export function ProductCover3D({ seed = 0 }: { seed?: number }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 3]} intensity={1.2} />
        <pointLight position={[-3, 2, 2]} intensity={0.9} color="#9b6fff" />
        <SpinningShape seed={seed} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
