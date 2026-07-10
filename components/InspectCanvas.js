"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function InspectCanvas({ rewardType = "gold" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(50, 50, 50);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc9a34a, 1.2);
    rimLight.position.set(-50, -50, -50);
    scene.add(rimLight);

    // 3. Parent group for drag rotation
    const group = new THREE.Group();
    scene.add(group);

    // 4. Procedural Mesh Generators
    let activeMeshes = [];

    const generateWatch = () => {
      // Cylindrical strap
      const strapGeom = new THREE.TorusGeometry(12, 2.5, 8, 24);
      const strapMat = new THREE.MeshPhongMaterial({ color: 0x222222, flatShading: true });
      const strap = new THREE.Mesh(strapGeom, strapMat);
      strap.rotation.y = Math.PI / 2;
      group.add(strap);
      activeMeshes.push(strap);

      // Watch dial casing
      const dialGeom = new THREE.CylinderGeometry(8, 8, 3, 32);
      const dialMat = new THREE.MeshPhongMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.1 });
      const dial = new THREE.Mesh(dialGeom, dialMat);
      dial.position.set(0, 0, 12);
      dial.rotation.x = Math.PI / 2;
      group.add(dial);
      activeMeshes.push(dial);

      // Dial face inner
      const faceGeom = new THREE.CylinderGeometry(7.5, 7.5, 0.5, 32);
      const faceMat = new THREE.MeshPhongMaterial({ color: 0x0e3b2e });
      const face = new THREE.Mesh(faceGeom, faceMat);
      face.position.set(0, 0, 13.3);
      face.rotation.x = Math.PI / 2;
      group.add(face);
      activeMeshes.push(face);
    };

    const generateBike = () => {
      // Front and Back Wheels
      const wheelGeom = new THREE.TorusGeometry(8, 2, 8, 24);
      const wheelMat = new THREE.MeshPhongMaterial({ color: 0x111111, wireframe: true });
      
      const frontWheel = new THREE.Mesh(wheelGeom, wheelMat);
      frontWheel.position.set(-16, -6, 0);
      group.add(frontWheel);
      activeMeshes.push(frontWheel);

      const backWheel = new THREE.Mesh(wheelGeom, wheelMat);
      backWheel.position.set(16, -6, 0);
      group.add(backWheel);
      activeMeshes.push(backWheel);

      // Frame
      const frameGeom = new THREE.CylinderGeometry(1.2, 1.2, 32, 8);
      const frameMat = new THREE.MeshPhongMaterial({ color: 0x0b5d43, metalness: 0.8 });
      
      const bar1 = new THREE.Mesh(frameGeom, frameMat);
      bar1.rotation.z = Math.PI / 6;
      bar1.position.set(0, 0, 0);
      group.add(bar1);
      activeMeshes.push(bar1);

      const bar2 = new THREE.Mesh(frameGeom, frameMat);
      bar2.rotation.z = -Math.PI / 6;
      bar2.position.set(0, -3, 0);
      group.add(bar2);
      activeMeshes.push(bar2);

      // Seat/Tank
      const bodyGeom = new THREE.BoxGeometry(18, 5, 6);
      const bodyMat = new THREE.MeshPhongMaterial({ color: 0xc9a34a, flatShading: true });
      const body = new THREE.Mesh(bodyGeom, bodyMat);
      body.position.set(0, 4, 0);
      group.add(body);
      activeMeshes.push(body);
    };

    const generateTrophy = () => {
      // Trophy Base
      const baseGeom = new THREE.CylinderGeometry(8, 10, 4, 16);
      const baseMat = new THREE.MeshPhongMaterial({ color: 0x111111 });
      const base = new THREE.Mesh(baseGeom, baseMat);
      base.position.y = -14;
      group.add(base);
      activeMeshes.push(base);

      // Stem
      const stemGeom = new THREE.CylinderGeometry(2, 2.5, 12, 16);
      const stemMat = new THREE.MeshPhongMaterial({ color: 0xd4af37 });
      const stem = new THREE.Mesh(stemGeom, stemMat);
      stem.position.y = -6;
      group.add(stem);
      activeMeshes.push(stem);

      // Cup
      const cupGeom = new THREE.ConeGeometry(12, 16, 8);
      const cupMat = new THREE.MeshPhongMaterial({
        color: 0xe0c26a,
        emissive: 0x0b5d43,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const cup = new THREE.Mesh(cupGeom, cupMat);
      cup.rotation.x = Math.PI;
      cup.position.y = 8;
      group.add(cup);
      activeMeshes.push(cup);
    };

    const generateCrown = () => {
      // Base Ring
      const baseGeom = new THREE.TorusGeometry(12, 1.8, 8, 32);
      const baseMat = new THREE.MeshPhongMaterial({ color: 0xd4af37, metalness: 0.9 });
      const base = new THREE.Mesh(baseGeom, baseMat);
      base.rotation.x = Math.PI / 2;
      base.position.y = -6;
      group.add(base);
      activeMeshes.push(base);

      // Spikes
      const spikeCount = 6;
      const spikeGeom = new THREE.ConeGeometry(1.5, 12, 8);
      const spikeMat = new THREE.MeshPhongMaterial({ color: 0xd4af37, metalness: 0.9 });

      for (let i = 0; i < spikeCount; i++) {
        const angle = (i * Math.PI * 2) / spikeCount;
        const x = 11.5 * Math.cos(angle);
        const z = 11.5 * Math.sin(angle);

        const spike = new THREE.Mesh(spikeGeom, spikeMat);
        spike.position.set(x, 0, z);
        // Tilt spikes slightly outward
        spike.rotation.x = z * 0.05;
        spike.rotation.z = -x * 0.05;

        group.add(spike);
        activeMeshes.push(spike);

        // Gem sphere on top of spike - Emerald Gems!
        const gemGeom = new THREE.SphereGeometry(1.2, 8, 8);
        const gemMat = new THREE.MeshPhongMaterial({ color: 0x0b5d43, emissive: 0x07211a });
        const gem = new THREE.Mesh(gemGeom, gemMat);
        gem.position.set(x, 6, z);
        group.add(gem);
        activeMeshes.push(gem);
      }
    };

    // Load active object based on prop
    if (rewardType === "gold") generateWatch();
    else if (rewardType === "platinum") generateBike();
    else if (rewardType === "diamond") generateTrophy();
    else if (rewardType === "chairman") generateCrown();

    // 5. Interactive Mouse Orbit Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = {
        x: e.clientX || e.touches?.[0]?.clientX,
        y: e.clientY || e.touches?.[0]?.clientY
      };
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const currentX = e.clientX || e.touches?.[0]?.clientX;
      const currentY = e.clientY || e.touches?.[0]?.clientY;

      const deltaMove = {
        x: currentX - previousMousePosition.x,
        y: currentY - previousMousePosition.y
      };

      // Set target rotations based on drag delta
      targetRotationY += deltaMove.x * 0.007;
      targetRotationX += deltaMove.y * 0.007;

      previousMousePosition = {
        x: currentX,
        y: currentY
      };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Add mouse listeners to container
    const container = containerRef.current;
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Add touch support
    container.addEventListener("touchstart", handleMouseDown);
    container.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);

    // 6. Animation loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Slow auto-rotation when not dragging
      if (!isDragging) {
        targetRotationY += 0.005;
      }

      // Smooth damping (lerp) towards target rotation
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.1;
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.1;

      // Small vertical floating motion
      group.position.y = Math.sin(THREE.MathUtils.degToRad(Date.now() * 0.05)) * 1.5;

      renderer.render(scene, camera);
    };
    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 8. Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      container.removeEventListener("touchstart", handleMouseDown);
      container.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      // Dispose meshes
      activeMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [rewardType]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing relative overflow-hidden"
    />
  );
}
