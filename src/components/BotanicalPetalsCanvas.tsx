import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BotanicalPetalsCanvasProps {
  candlelightMode?: boolean;
}

export const BotanicalPetalsCanvas: React.FC<BotanicalPetalsCanvasProps> = ({
  candlelightMode = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Mouse interaction state in 3D
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, moving: false });
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 25;
    cameraRef.current = camera;

    // Renderer with transparency & performance settings
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting setup: soft vintage daylight vs warm candle
    const ambientLight = new THREE.AmbientLight(0xfff8f0, candlelightMode ? 0.9 : 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffdbe7, 1.0);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    const candlePointLight = new THREE.PointLight(0xff9e42, candlelightMode ? 2.5 : 0, 40);
    candlePointLight.position.set(0, -5, 10);
    scene.add(candlePointLight);

    // Create realistic curved Petal Geometry using a parametric plane
    const petalGeom = new THREE.PlaneGeometry(0.8, 1.1, 4, 4);
    const pos = petalGeom.attributes.position;
    // Curve the petal vertices so it's not a flat rectangle
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);
      // Cup the petal edges like a real rose petal
      const distFromCenter = Math.sqrt(u * u + v * v);
      pos.setZ(i, -Math.sin(distFromCenter * 1.8) * 0.22);
      // Taper the stem end
      if (v < -0.3) {
        pos.setX(i, u * 0.5);
      }
    }
    pos.needsUpdate = true;
    petalGeom.computeVertexNormals();

    // Vintage Pink Palette for petals
    const petalColors = [
      new THREE.Color('#FADADD'), // Strawberry Milk
      new THREE.Color('#F8D7E2'), // Blush Pink
      new THREE.Color('#F2BFCF'), // Vintage Ballet Pink
      new THREE.Color('#ED9BB8'), // Tea Rose
      new THREE.Color('#B97891'), // Dusty Rosebud
      new THREE.Color('#FDF3D6'), // Butter Blossom
    ];

    const petalCount = window.innerWidth < 768 ? 25 : 45;
    const petals: {
      mesh: THREE.Mesh;
      baseSpeedY: number;
      speedX: number;
      speedZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      wobbleOffset: number;
      size: number;
    }[] = [];

    for (let i = 0; i < petalCount; i++) {
      const color = petalColors[i % petalColors.length];
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.65,
        metalness: 0.05,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });

      const mesh = new THREE.Mesh(petalGeom, mat);

      // Random 3D volume placement
      mesh.position.x = (Math.random() - 0.5) * 40;
      mesh.position.y = (Math.random() - 0.5) * 35;
      mesh.position.z = (Math.random() - 0.5) * 20;

      const scale = 0.6 + Math.random() * 0.7;
      mesh.scale.set(scale, scale, scale);

      mesh.rotation.x = Math.random() * Math.PI * 2;
      mesh.rotation.y = Math.random() * Math.PI * 2;
      mesh.rotation.z = Math.random() * Math.PI * 2;

      scene.add(mesh);

      petals.push({
        mesh,
        baseSpeedY: 0.015 + Math.random() * 0.025,
        speedX: (Math.random() - 0.5) * 0.01,
        speedZ: (Math.random() - 0.5) * 0.01,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.02,
        wobbleOffset: Math.random() * Math.PI * 2,
        size: scale,
      });
    }

    // Microscopic Gold Stardust Sparkles
    const sparkleCount = window.innerWidth < 768 ? 40 : 80;
    const sparkleGeom = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount * 3; i += 3) {
      sparklePositions[i] = (Math.random() - 0.5) * 45;
      sparklePositions[i + 1] = (Math.random() - 0.5) * 40;
      sparklePositions[i + 2] = (Math.random() - 0.5) * 20;
    }
    sparkleGeom.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));

    const sparkleMat = new THREE.PointsMaterial({
      color: 0xe8c589, // Antique Gilded Honey
      size: 0.12,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const sparkles = new THREE.Points(sparkleGeom, sparkleMat);
    scene.add(sparkles);

    // Mouse movement listener with wind vortex
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.moving = true;

      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
      mouseTimeoutRef.current = setTimeout(() => {
        mouseRef.current.moving = false;
      }, 350);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window Resize listener
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Mouse 3D coordinate approximation
      const mouseWorldX = mouseRef.current.x * 18;
      const mouseWorldY = mouseRef.current.y * 12;

      // Candlelight subtle organic flicker
      if (candlelightMode) {
        candlePointLight.intensity = 2.2 + Math.sin(elapsedTime * 6.0) * 0.4 + Math.cos(elapsedTime * 11.0) * 0.2;
      }

      // Animate Petals
      petals.forEach((p, idx) => {
        // Fall downwards
        p.mesh.position.y -= p.baseSpeedY;

        // Aerodynamic flutter
        const wobble = Math.sin(elapsedTime * 1.5 + p.wobbleOffset);
        p.mesh.position.x += p.speedX + wobble * 0.015;
        p.mesh.position.z += p.speedZ + Math.cos(elapsedTime * 1.2 + p.wobbleOffset) * 0.01;

        p.mesh.rotation.x += p.rotSpeedX + wobble * 0.005;
        p.mesh.rotation.y += p.rotSpeedY;
        p.mesh.rotation.z += p.rotSpeedZ + wobble * 0.008;

        // Mouse Wind Vortex: petals react to moving cursor
        if (mouseRef.current.moving) {
          const dx = p.mesh.position.x - mouseWorldX;
          const dy = p.mesh.position.y - mouseWorldY;
          const distSq = dx * dx + dy * dy;

          if (distSq < 36) {
            const dist = Math.sqrt(distSq) || 1;
            const force = (6 - dist) * 0.015;
            p.mesh.position.x += (dx / dist) * force;
            p.mesh.position.y += (dy / dist) * force;
            p.mesh.rotation.z += 0.05;
          }
        }

        // Wrap around viewport boundaries
        if (p.mesh.position.y < -18) {
          p.mesh.position.y = 18;
          p.mesh.position.x = (Math.random() - 0.5) * 40;
        }
        if (p.mesh.position.x > 24) p.mesh.position.x = -24;
        if (p.mesh.position.x < -24) p.mesh.position.x = 24;
      });

      // Gently rotate sparkles
      sparkles.rotation.y = elapsedTime * 0.03;
      sparkles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Clean disposal
      petalGeom.dispose();
      sparkleGeom.dispose();
      sparkleMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [candlelightMode]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};
