"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  Sparkles,
  PerspectiveCamera,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

function CameraRig() {
  const ref = useRef<THREE.PerspectiveCamera>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const x = (state.pointer.x * 0.7);
    const y = (state.pointer.y * 0.5);
    ref.current.position.x += (x - ref.current.position.x) * 0.04;
    ref.current.position.y += (-y - ref.current.position.y + 0.2) * 0.04;
    ref.current.lookAt(0, 0, 0);
  });
  return <PerspectiveCamera ref={ref} makeDefault position={[0, 0.2, 6.5]} fov={40} />;
}

function GlassOrb({
  position,
  scale = 1,
  color = "#9b6fff",
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh position={position} scale={scale} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.6}
          roughness={0.05}
          ior={1.45}
          chromaticAberration={0.05}
          distortion={0.25}
          distortionScale={0.4}
          temporalDistortion={0.1}
          color={color}
          attenuationColor={color}
          attenuationDistance={2}
        />
      </mesh>
    </Float>
  );
}

function GlassTorus({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={0.8} rotationIntensity={1.2} floatIntensity={1.1}>
      <mesh position={position} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.9, 0.28, 48, 96]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.5}
          roughness={0.08}
          ior={1.5}
          chromaticAberration={0.08}
          color="#46e5ff"
          attenuationColor="#46e5ff"
          attenuationDistance={1.5}
          distortion={0.2}
        />
      </mesh>
    </Float>
  );
}

function GlassBox({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh position={position}>
        <boxGeometry args={[1.1, 1.1, 1.1]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.7}
          roughness={0.1}
          ior={1.4}
          chromaticAberration={0.04}
          color="#ffd074"
          attenuationColor="#ffd074"
          attenuationDistance={1.8}
        />
      </mesh>
    </Float>
  );
}

function GoldIcosa({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.1} rotationIntensity={1.1} floatIntensity={1.3}>
      <mesh position={position}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshPhysicalMaterial
          color="#ffd074"
          metalness={1}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} />
      <pointLight position={[-4, -2, 2]} intensity={1.1} color="#9b6fff" />
      <pointLight position={[5, -1, -3]} intensity={0.9} color="#46e5ff" />

      <Sparkles count={80} size={2} scale={[14, 6, 8]} speed={0.25} opacity={0.6} color="#ffffff" />

      <GlassOrb position={[-2.4, 0.3, 0]} scale={1.2} color="#9b6fff" />
      <GlassTorus position={[2.1, 0.1, -0.4]} />
      <GlassBox position={[0.2, -0.9, 0.8]} />
      <GoldIcosa position={[-1.1, 1.4, 0.5]} />
      <GoldIcosa position={[2.3, -1.1, 0.2]} />

      <Environment preset="city" />

      <EffectComposer>
        <Bloom intensity={0.65} luminanceThreshold={0.2} luminanceSmoothing={0.6} mipmapBlur />
        <ChromaticAberration offset={new THREE.Vector2(0.0012, 0.0012)} radialModulation={false} modulationOffset={0} blendFunction={BlendFunction.NORMAL} />
        <Vignette eskil={false} offset={0.25} darkness={0.7} />
      </EffectComposer>
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      camera={{ position: [0, 0, 6], fov: 40 }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <CameraRig />
        <Scene />
      </Suspense>
    </Canvas>
  );
}
