import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { BlendFunction } from 'postprocessing';

// Grid terrain that animates with a wave-like motion
const AnimatedTerrain: React.FC = () => {
  const meshRef = useRef<THREE.Mesh & { material: THREE.ShaderMaterial }>(null);
  const gridSize = 20;
  const gridSegments = 20;

  // Custom animated shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#4f98ca') },
        uColor2: { value: new THREE.Color('#6a5acd') }
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vUv = uv;
          
          vec3 pos = position;
          float elevation = sin(pos.x * 1.2 + uTime) * 0.1 * 
                          sin(pos.z * 1.5 + uTime * 0.6);
          pos.y = elevation;
          vElevation = elevation;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          float mixStrength = (vElevation + 0.1) * 1.5;
          vec3 color = mix(uColor1, uColor2, mixStrength);
          
          // Add subtle grid lines
          float gridLine = step(0.98, mod(vUv.x * 15.0, 1.0)) + 
                          step(0.98, mod(vUv.y * 15.0, 1.0));
          color = mix(color, vec3(1.0), gridLine * 0.15);
          
          gl_FragColor = vec4(color, 0.3 - vUv.y * 0.2);
        }
      `,
      transparent: true,
      wireframe: false,
      side: THREE.DoubleSide
    });
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[gridSize, gridSize, gridSegments, gridSegments]} />
      <primitive attach="material" object={shaderMaterial} />
    </mesh>
  );
};

// Floating particles with random movement
const FloatingParticles: React.FC = () => {
  const count = 50; // Reduced from 100
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 15;
      positions[i3 + 1] = (Math.random() - 0.5) * 15;
      positions[i3 + 2] = (Math.random() - 0.5) * 15;
    }
    
    return positions;
  }, [count]);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const time = clock.getElapsedTime();
      const particles = particlesRef.current;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = particles.geometry.attributes.position.array[i3];
        const y = particles.geometry.attributes.position.array[i3 + 1];
        const z = particles.geometry.attributes.position.array[i3 + 2];
        
        // Apply very subtle floating motion
        particles.geometry.attributes.position.array[i3] = x + Math.sin(time * 0.1 + i * 0.1) * 0.005;
        particles.geometry.attributes.position.array[i3 + 1] = y + Math.cos(time * 0.15 + i * 0.05) * 0.005;
        particles.geometry.attributes.position.array[i3 + 2] = z + Math.sin(time * 0.05 + i * 0.07) * 0.005;
      }
      
      particles.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#9a7fd1"
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
};

// Main 3D background component
const Background3D: React.FC<{interactable?: boolean}> = ({ interactable = false }) => {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: interactable ? 'auto' : 'none',
        zIndex: 0
      }}
      camera={{ position: [0, 5, 10], fov: 75 }}
    >
      {/* Main scene elements */}
      <color attach="background" args={['#121212']} />
      <fog attach="fog" args={['#121212', 8, 25]} />
      
      <AnimatedTerrain />
      <FloatingParticles />
      <Stars radius={60} depth={50} count={500} factor={2} fade speed={0.5} />
      
      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#9a7fd1" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4f98ca" />
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          height={200}
        />
        <Noise
          opacity={0.02}
          blendFunction={BlendFunction.OVERLAY}
        />
      </EffectComposer>
      
      {/* Optional orbit controls for interactable mode */}
      {interactable && <OrbitControls enableZoom={false} enablePan={false} />}
    </Canvas>
  );
};

export default Background3D; 