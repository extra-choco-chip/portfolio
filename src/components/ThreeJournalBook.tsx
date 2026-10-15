import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playPageFlipSound, playTactileClick } from '../utils/audio';

interface ThreeJournalBookProps {
  onOpen: () => void;
}

export const ThreeJournalBook: React.FC<ThreeJournalBookProps> = ({ onOpen }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const didDragRef = useRef(false);
  const bookGroupRef = useRef<THREE.Group | null>(null);
  const coverMeshRef = useRef<THREE.Group | null>(null);
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 11.5);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff0f5, 1.8);
    mainLight.position.set(6, 9, 9);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xed9bb8, 1.3);
    rimLight.position.set(-6, -4, 4);
    scene.add(rimLight);

    // Warm desk reflection light
    const deskWarmLight = new THREE.PointLight(0xf5ebcb, 1.2, 20);
    deskWarmLight.position.set(0, -4, 6);
    scene.add(deskWarmLight);

    // 5. Build High-Res Front Cover Texture on Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1280;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Leatherette Pink Gradient Base
      const grad = ctx.createLinearGradient(0, 0, 1024, 1280);
      grad.addColorStop(0, '#F8D7E2');
      grad.addColorStop(0.5, '#F2BFCF');
      grad.addColorStop(1, '#ED9BB8');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1280);

      // Fine leather grain and stitched binding lines give the cover a little age.
      ctx.strokeStyle = 'rgba(90, 58, 46, 0.16)';
      ctx.lineWidth = 1;
      for (let y = 80; y < 1210; y += 13) {
        ctx.beginPath();
        ctx.moveTo(72, y);
        ctx.lineTo(952, y + Math.sin(y) * 1.5);
        ctx.stroke();
      }

      // Antique Paper Grain / Noise
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      for (let i = 0; i < 3500; i++) {
        ctx.fillRect(Math.random() * 1024, Math.random() * 1280, 2, 2);
      }

      // Ornate Gold & Deep Rose Border
      ctx.strokeStyle = '#805365';
      ctx.lineWidth = 14;
      ctx.strokeRect(40, 40, 944, 1200);

      ctx.strokeStyle = '#D4AF37'; // Antique Gold
      ctx.lineWidth = 6;
      ctx.strokeRect(55, 55, 914, 1170);

      // Corner flourishes
      ctx.fillStyle = '#D4AF37';
      const drawCorner = (x: number, y: number) => {
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fill();
      };
      drawCorner(75, 75);
      drawCorner(949, 75);
      drawCorner(75, 1205);
      drawCorner(949, 1205);

      // Center Torn Vellum Parchment Label Card
      ctx.fillStyle = '#FFF8F0';
      ctx.shadowColor = 'rgba(68, 52, 59, 0.25)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 8;
      ctx.fillRect(160, 240, 704, 760);
      ctx.shadowColor = 'transparent';

      ctx.strokeStyle = '#B97891';
      ctx.lineWidth = 3;
      ctx.strokeRect(175, 255, 674, 730);

      // Text inside Label Card
      ctx.textAlign = 'center';

      // Monogram Crest
      ctx.fillStyle = '#F2BFCF';
      ctx.beginPath();
      ctx.arc(512, 380, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#805365';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#805365';
      ctx.font = 'bold 44px Georgia, serif';
      ctx.fillText('ID', 512, 395);

      // Handwritten cursive subtitle
      ctx.fillStyle = '#B97891';
      ctx.font = 'italic 34px "Brush Script MT", cursive, Georgia, serif';
      ctx.fillText("a little archive of things I've built & learned", 512, 480);

      // Main Book Title
      ctx.fillStyle = '#805365';
      ctx.font = 'bold 64px "Times New Roman", Georgia, serif';
      ctx.fillText("Ishana's Portfolio", 512, 570);

      // Gold Accent Divider
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(312, 620);
      ctx.lineTo(712, 620);
      ctx.stroke();

      // Academic details
      ctx.fillStyle = '#44343B';
      ctx.font = '500 28px Georgia, serif';
      ctx.fillText('B.Tech in Electronics & Telecommunication', 512, 680);

      ctx.fillStyle = '#805365';
      ctx.font = '600 26px Georgia, serif';
      ctx.fillText('MKSSS Cummins College of Engineering, Pune', 512, 730);

      // Curatorial seal note
      ctx.fillStyle = '#B97891';
      ctx.font = 'italic 28px Georgia, serif';
      ctx.fillText('✦ Volume 2026 · Handcrafted Digital Journal ✦', 512, 850);
    }

    const coverTexture = new THREE.CanvasTexture(canvas);
    coverTexture.colorSpace = THREE.SRGBColorSpace;

    // 6. Build 3D Scrapbook Geometry
    const bookGroup = new THREE.Group();
    bookGroupRef.current = bookGroup;
    scene.add(bookGroup);

    const bookWidth = 5.0;
    const bookHeight = 6.4;
    const bookThickness = 0.72;

    // --- Page Block (Cream textured interior paper) ---
    const pageBlockGeom = new THREE.BoxGeometry(bookWidth - 0.28, bookHeight - 0.4, bookThickness - 0.14);
    const pageBlockMat = new THREE.MeshStandardMaterial({
      color: 0xfff6ec,
      roughness: 0.92,
      metalness: 0.04,
    });
    const pageBlock = new THREE.Mesh(pageBlockGeom, pageBlockMat);
    pageBlock.position.set(0.14, 0, 0);
    pageBlock.castShadow = true;
    pageBlock.receiveShadow = true;
    bookGroup.add(pageBlock);

    // The exposed page edges are individual sheets, rather than one flat block.
    // This makes the book read as a journal even before the cover is opened.
    const pageEdgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf7e7dc,
      roughness: 0.96,
      side: THREE.DoubleSide,
    });
    const pageEdgeGeometry = new THREE.PlaneGeometry(bookWidth - 0.42, bookHeight - 0.48);
    for (let sheet = 0; sheet < 11; sheet += 1) {
      const pageEdge = new THREE.Mesh(pageEdgeGeometry, pageEdgeMaterial);
      pageEdge.position.set(0.14, 0, -bookThickness / 2 + 0.09 + sheet * 0.052);
      pageEdge.rotation.x = (sheet - 5) * 0.0018;
      pageEdge.receiveShadow = true;
      bookGroup.add(pageEdge);
    }

    // --- Back Cover (Vintage pink cloth) ---
    const backCoverGeom = new THREE.BoxGeometry(bookWidth, bookHeight, 0.08);
    const backCoverMat = new THREE.MeshStandardMaterial({
      color: 0xed9bb8,
      roughness: 0.55,
      metalness: 0.1,
    });
    const backCover = new THREE.Mesh(backCoverGeom, backCoverMat);
    backCover.position.set(0, 0, -bookThickness / 2);
    bookGroup.add(backCover);

    // --- Spine (Deep Rose Leatherette with rounded surface) ---
    const spineGeom = new THREE.CylinderGeometry(
      bookThickness / 2,
      bookThickness / 2,
      bookHeight,
      24,
      1,
      false,
      Math.PI / 2,
      Math.PI
    );
    const spineMaterial = new THREE.MeshStandardMaterial({
      color: 0x805365, // Archival Rose Ink
      roughness: 0.4,
      metalness: 0.15,
    });
    const spine = new THREE.Mesh(spineGeom, spineMaterial);
    spine.rotation.y = Math.PI / 2;
    spine.position.set(-bookWidth / 2, 0, 0);
    bookGroup.add(spine);

    // --- Front Cover Pivot (Hinged at left spine) ---
    const frontCoverPivot = new THREE.Group();
    frontCoverPivot.position.set(-bookWidth / 2, 0, bookThickness / 2);
    coverMeshRef.current = frontCoverPivot;
    bookGroup.add(frontCoverPivot);

    // Multi-material front cover (Front face has custom texture, edges pink)
    const frontCoverGeom = new THREE.BoxGeometry(bookWidth, bookHeight, 0.09);
    const sideMat = new THREE.MeshStandardMaterial({ color: 0xed9bb8, roughness: 0.6 });
    const frontMat = new THREE.MeshStandardMaterial({
      map: coverTexture,
      roughness: 0.45,
      metalness: 0.08,
    });
    const materials = [
      sideMat, // right
      sideMat, // left
      sideMat, // top
      sideMat, // bottom
      frontMat, // front face
      sideMat, // back
    ];
    const frontCover = new THREE.Mesh(frontCoverGeom, materials);
    frontCover.position.set(bookWidth / 2, 0, 0);
    frontCover.castShadow = true;
    frontCoverPivot.add(frontCover);

    // --- 3D Silk Ribbons hanging from top ---
    const ribbonGeom = new THREE.BoxGeometry(0.35, 2.2, 0.02);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xf5ebcb, // Honey Butter Ribbon
      roughness: 0.3,
    });
    const ribbon = new THREE.Mesh(ribbonGeom, ribbonMat);
    ribbon.position.set(-bookWidth / 2 + 0.4, bookHeight / 2 + 0.9, 0);
    ribbon.rotation.z = 0.12;
    bookGroup.add(ribbon);

    const pinkRibbonMat = new THREE.MeshStandardMaterial({
      color: 0xf2bfcf,
      roughness: 0.3,
    });
    const pinkRibbon = new THREE.Mesh(ribbonGeom, pinkRibbonMat);
    pinkRibbon.position.set(-bookWidth / 2 + 0.9, bookHeight / 2 + 0.7, 0.05);
    pinkRibbon.rotation.z = -0.08;
    bookGroup.add(pinkRibbon);

    // Initial angle
    bookGroup.rotation.y = -0.25;
    bookGroup.rotation.x = 0.08;

    // 7. Interactive Drag & Mouse Tilt Tracking
    let targetRotY = -0.25;
    let targetRotX = 0.08;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      didDragRef.current = false;
      setHintDismissed(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePositionRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDraggingRef.current) {
        const deltaX = clientX - previousMousePositionRef.current.x;
        const deltaY = clientY - previousMousePositionRef.current.y;

        targetRotY += deltaX * 0.007;
        targetRotX += deltaY * 0.007;
        if (Math.abs(deltaX) + Math.abs(deltaY) > 3) didDragRef.current = true;

        // Clamp rotation angles
        targetRotY = Math.max(-0.95, Math.min(0.55, targetRotY));
        targetRotX = Math.max(-0.45, Math.min(0.45, targetRotX));

        previousMousePositionRef.current = { x: clientX, y: clientY };
      } else {
        // Subtle hover parallax
        const rect = container.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
        targetRotY = -0.25 + normX * 0.22;
        targetRotX = 0.08 - normY * 0.15;
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    domElement.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // 8. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Smooth damping rotation lerp
      bookGroup.rotation.y += (targetRotY - bookGroup.rotation.y) * 0.08;
      bookGroup.rotation.x += (targetRotX - bookGroup.rotation.x) * 0.08;

      // Ribbon gentle physics sway
      ribbon.rotation.z = 0.12 + Math.sin(clock.getElapsedTime() * 2.2) * 0.03;
      pinkRibbon.rotation.z = -0.08 + Math.cos(clock.getElapsedTime() * 2.0) * 0.03;

      // Hinge rotation when opening
      if (coverMeshRef.current && isOpenAnimation) {
        coverMeshRef.current.rotation.y += (-Math.PI * 0.85 - coverMeshRef.current.rotation.y) * (delta * 4.5);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domElement.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      renderer.dispose();
      pageBlockGeom.dispose();
      pageEdgeGeometry.dispose();
      pageEdgeMaterial.dispose();
      backCoverGeom.dispose();
      spineGeom.dispose();
      frontCoverGeom.dispose();
      ribbonGeom.dispose();
      coverTexture.dispose();

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [isOpenAnimation]);

  const handleOpenClick = () => {
    // Browsing the model should not accidentally open the journal.
    if (didDragRef.current) return;
    playPageFlipSound();
    setIsOpenAnimation(true);
    setTimeout(() => {
      onOpen();
    }, 450);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* 3D WebGL Book Canvas with cursor grab */}
      <div
        ref={mountRef}
        onClick={handleOpenClick}
        className="w-[320px] h-[400px] sm:w-[390px] sm:h-[490px] md:w-[440px] md:h-[530px] cursor-grab active:cursor-grabbing relative z-10 transition-transform hover:scale-102 drop-shadow-2xl"
        title="Drag to inspect the journal in 3D; click the cover to open it"
      />

      {/* Floating 3D Badge */}
      <div className="absolute top-2 right-4 bg-[#FFF8F0]/95 px-2.5 py-1 rounded-full border border-[#D8B5BD] shadow-xs text-[10px] font-label-sm uppercase tracking-wider text-[#805365] font-bold flex items-center gap-1 z-20 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#ED9BB8] animate-ping" />
        <span>Interactive 3D WebGL</span>
      </div>

      {/* Action CTA */}
      <div className="flex flex-col items-center mt-3 z-20">
        <button
          onClick={handleOpenClick}
          className="px-7 py-3 bg-[#805365] hover:bg-[#683f50] text-[#FFF8F0] rounded-sm font-label-sm text-xs tracking-widest uppercase shadow-tactile transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2 border border-[#B97891] font-bold"
        >
          <span className="material-symbols-outlined text-lg">auto_stories</span>
          <span>Open 3D Scrapbook</span>
        </button>

        {!hintDismissed && (
          <span className="text-xs font-accent-handwritten text-[#805365] mt-1.5 opacity-90 select-none animate-pulse">
            ✦ Click & drag book to rotate in 3D · Click cover to open spread ✦
          </span>
        )}
      </div>
    </div>
  );
};
