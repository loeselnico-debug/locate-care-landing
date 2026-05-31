/**
 * @license
 * Modifié et optimisé pour LOCATE CARE
 * Architecture locale autonome (No-WebSocket)
*/

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Trail } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

// ==========================================
// 1. OUTILS MATHEMATIQUES (CURL NOISE)
// ==========================================
const noise3D = createNoise3D();

function computeCurl(x: number, y: number, z: number): THREE.Vector3 {
  const eps = 0.0001;
  const curl = new THREE.Vector3();

  let n1 = noise3D(x, y + eps, z);
  let n2 = noise3D(x, y - eps, z);
  const a = (n1 - n2) / (2 * eps);

  n1 = noise3D(x, y, z + eps);
  n2 = noise3D(x, y, z - eps);
  const b = (n1 - n2) / (2 * eps);
  curl.x = a - b;

  n1 = noise3D(x, y, z + eps);
  n2 = noise3D(x, y, z - eps);
  const c = (n1 - n2) / (2 * eps);

  n1 = noise3D(x + eps, y, z);
  n2 = noise3D(x - eps, y, z);
  const d = (n1 - n2) / (2 * eps);
  curl.y = c - d;

  n1 = noise3D(x + eps, y, z);
  n2 = noise3D(x - eps, y, z);
  const e = (n1 - n2) / (2 * eps);

  n1 = noise3D(x, y + eps, z);
  n2 = noise3D(x, y - eps, z);
  const f = (n1 - n2) / (2 * eps);
  curl.z = e - f;

  return curl.normalize();
}

// ==========================================
// 2. MOTEUR DE PARTICULES
// ==========================================
const MAX_PARTICLES = 15000; // Légèrement réduit pour garantir 60 FPS sur mobile
const PARTICLE_LIFETIME = 3.0;

interface Particle {
  active: boolean;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: THREE.Color;
  baseColor: THREE.Color;
  life: number;
}

// Palette LOCATE CARE : Blanc et Rose Gold
const ROSE_GOLD = '#E6C7C2';
const PURE_WHITE = '#ffffff';

function Particles({ mousePosRef }: { mousePosRef: React.MutableRefObject<THREE.Vector3 | null> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d')!;
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      const color = new THREE.Color();
      for (let i = 0; i < MAX_PARTICLES; i++) {
        meshRef.current.setColorAt(i, color);
      }
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }
  }, []);

  const particles = useMemo(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      arr.push({
        active: false,
        position: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        color: new THREE.Color(),
        baseColor: new THREE.Color(),
        life: 0,
      });
    }
    return arr;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const spawnIndex = useRef(0);

  const spawnParticle = (pos: THREE.Vector3) => {
    const p = particles[spawnIndex.current];
    p.active = true;
    p.position.copy(pos);
    p.position.x += (Math.random() - 0.5) * 1.5;
    p.position.y += (Math.random() - 0.5) * 1.5;
    p.position.z += (Math.random() - 0.5) * 1.5;
    
    p.velocity.set(
      (Math.random() - 0.5) * 2.0,
      (Math.random() - 0.5) * 2.0,
      (Math.random() - 0.5) * 2.0
    );
    p.color.set(PURE_WHITE);
    p.baseColor.set(PURE_WHITE);
    p.life = PARTICLE_LIFETIME;

    spawnIndex.current = (spawnIndex.current + 1) % MAX_PARTICLES;
  };

 useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Spawning lié uniquement à la souris locale
    if (mousePosRef.current) {
      for (let i = 0; i < 60; i++) {
        spawnParticle(mousePosRef.current);
      }
    }

    const up = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion();
    const emberColor = new THREE.Color(ROSE_GOLD);

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const p = particles[i];
      if (!p.active) {
        dummy.position.set(0, 0, 0);
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        continue;
      }

      p.life -= delta;
      if (p.life <= 0) {
        p.active = false;
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        continue;
      }

      // Curl noise pour l'effet cosmique
      const curl = computeCurl(p.position.x * 0.3, p.position.y * 0.3, p.position.z * 0.3);
      p.velocity.add(curl.multiplyScalar(delta * 5.0));

      p.velocity.multiplyScalar(0.96); // Damping
      p.position.addScaledVector(p.velocity, delta);

      // Transition du Blanc vers le Rose Gold
      const lifeRatio = p.life / PARTICLE_LIFETIME;
      p.color.copy(p.baseColor);
      p.color.lerp(emberColor, Math.pow(1 - lifeRatio, 2));

      dummy.position.copy(p.position);
      
      const speed = p.velocity.length();
      const scale = (p.life / PARTICLE_LIFETIME) * 0.08;
      const stretch = Math.min(4, Math.max(1, speed * 0.1));
      
      dummy.scale.set(scale, scale, scale * stretch);

      if (speed > 0.01) {
        const dir = p.velocity.clone().normalize();
        quaternion.setFromUnitVectors(up, dir);
        dummy.quaternion.copy(quaternion);
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, p.color);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, MAX_PARTICLES]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial 
        map={particleTexture}
        transparent 
        opacity={0.8} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// ==========================================
// 3. CURSEUR LUMINEUX ET INTERACTION
// ==========================================
function LocalCursor({ mousePosRef }: { mousePosRef: React.MutableRefObject<THREE.Vector3 | null> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && mousePosRef.current) {
      meshRef.current.position.lerp(mousePosRef.current, 0.5);
      const scale = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.2;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Trail width={0.5} length={20} color={new THREE.Color(PURE_WHITE)} attenuation={(t) => t * t}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color={PURE_WHITE} transparent opacity={0.8} />
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial color={ROSE_GOLD} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </mesh>
    </Trail>
  );
}

function SceneInteraction({ mousePosRef }: { mousePosRef: React.MutableRefObject<THREE.Vector3 | null> }) {
  const { camera, gl } = useThree();

  useEffect(() => {
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const updateMousePos = (clientX: number, clientY: number) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const target = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, target);
      mousePosRef.current = target;
    };

    const handlePointerMove = (e: PointerEvent) => {
      updateMousePos(e.clientX, e.clientY);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [camera, gl, mousePosRef]);

  return null;
}

// ==========================================
// 4. RENDU FINAL (COMPOSANT EXPORTÉ)
// ==========================================
export default function CosmicFlow() {
  const mousePosRef = useRef<THREE.Vector3 | null>(null);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'transparent' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }} style={{ pointerEvents: 'none' }}>
        {/* On retire le background color dur pour utiliser celui du CSS global (#050505) */}
        <ambientLight intensity={0.2} />
        
        {/* Étoiles en fond */}
        <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade speed={1} />
        
        <Particles mousePosRef={mousePosRef} />
        <LocalCursor mousePosRef={mousePosRef} />
        <SceneInteraction mousePosRef={mousePosRef} />
        
        <EffectComposer>
          {/* Le Bloom fait briller le blanc et le rose gold */}
          <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}