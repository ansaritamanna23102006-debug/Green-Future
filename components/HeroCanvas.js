"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function HeroCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, Renderer
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Add Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x8cd83d, 1.5);
    dirLight.position.set(100, 100, 100);
    scene.add(dirLight);

    // 3. Create wireframe Globe (Earth Network representation)
    const globeGeom = new THREE.SphereGeometry(65, 24, 24);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x0a4d45,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const globe = new THREE.Mesh(globeGeom, globeMat);
    scene.add(globe);

    // Create a secondary outer glowing globe ring
    const ringGeom = new THREE.RingGeometry(80, 81, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x65b300,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // 4. Create floating particle vertices (Financial growth particles)
    const partCount = 120;
    const partGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(partCount * 3);
    const velocities = [];

    for (let i = 0; i < partCount; i++) {
      // Random coordinates in a shell around the globe
      const r = 70 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      velocities.push({
        x: (Math.random() - 0.5) * 0.15,
        y: (Math.random() - 0.5) * 0.15,
        z: (Math.random() - 0.5) * 0.15
      });
    }

    partGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle texture
    const pMaterial = new THREE.PointsMaterial({
      color: 0x8cd83d,
      size: 3,
      transparent: true,
      opacity: 0.8
    });

    const particles = new THREE.Points(partGeom, pMaterial);
    scene.add(particles);

    // 5. Create connecting network lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x65b300,
      transparent: true,
      opacity: 0.25
    });

    // We will dynamically connect nodes close to each other in the animation loop
    const lineGeom = new THREE.BufferGeometry();
    const lineIndices = [];
    const linePositions = new Float32Array(partCount * 3);
    lineGeom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    
    const networkLines = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(networkLines);

    // 6. Setup energy sine waves
    const waveMat = new THREE.LineBasicMaterial({
      color: 0x8cd83d,
      transparent: true,
      opacity: 0.35,
      linewidth: 2
    });
    const waveGeom = new THREE.BufferGeometry();
    const wavePointsCount = 100;
    const wavePositions = new Float32Array(wavePointsCount * 3);
    waveGeom.setAttribute("position", new THREE.BufferAttribute(wavePositions, 3));
    const energyWave = new THREE.Line(waveGeom, waveMat);
    scene.add(energyWave);

    // Entrance Fade In using GSAP
    gsap.fromTo(renderer.domElement, 
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" }
    );

    // 7. Render Loop
    let timer = new THREE.Timer();
    let animId;

    const animate = (timestamp) => {
      animId = requestAnimationFrame(animate);

      timer.update(timestamp);
      const delta = timer.getDelta();
      const time = timer.getElapsed();

      // Rotate elements
      globe.rotation.y += 0.002;
      globe.rotation.x += 0.001;
      ring.rotation.z -= 0.003;
      particles.rotation.y -= 0.0015;

      // Update particle positions based on velocity
      const posArr = particles.geometry.attributes.position.array;
      for (let i = 0; i < partCount; i++) {
        posArr[i * 3] += velocities[i].x;
        posArr[i * 3 + 1] += velocities[i].y;
        posArr[i * 3 + 2] += velocities[i].z;

        // Boundary check: bounce back if too far
        const dist = Math.sqrt(
          posArr[i * 3] ** 2 +
          posArr[i * 3 + 1] ** 2 +
          posArr[i * 3 + 2] ** 2
        );
        if (dist > 140 || dist < 68) {
          velocities[i].x *= -1;
          velocities[i].y *= -1;
          velocities[i].z *= -1;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Connect near particles dynamically
      const linePositionsArr = [];
      for (let i = 0; i < partCount; i++) {
        const x1 = posArr[i * 3];
        const y1 = posArr[i * 3 + 1];
        const z1 = posArr[i * 3 + 2];

        for (let j = i + 1; j < partCount; j++) {
          const x2 = posArr[j * 3];
          const y2 = posArr[j * 3 + 1];
          const z2 = posArr[j * 3 + 2];

          const d = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
          if (d < 30) {
            linePositionsArr.push(x1, y1, z1, x2, y2, z2);
          }
        }
      }

      const connectedGeom = new THREE.BufferGeometry();
      connectedGeom.setAttribute("position", new THREE.Float32BufferAttribute(linePositionsArr, 3));
      networkLines.geometry.dispose();
      networkLines.geometry = connectedGeom;

      // Update energy waves (sine wave shape)
      const waveArr = energyWave.geometry.attributes.position.array;
      for (let i = 0; i < wavePointsCount; i++) {
        const x = (i - wavePointsCount / 2) * 2.8;
        const y = Math.sin(i * 0.15 + time * 2) * 15;
        const z = Math.cos(i * 0.1 + time * 1.5) * 10;

        waveArr[i * 3] = x;
        waveArr[i * 3 + 1] = y;
        waveArr[i * 3 + 2] = z;
      }
      energyWave.geometry.attributes.position.needsUpdate = true;

      // Move camera slightly for parallax
      camera.position.x = Math.sin(time * 0.2) * 15;
      camera.position.y = Math.cos(time * 0.2) * 15;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const container = containerRef.current;

    // 8. Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 9. Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      // Dispose materials & geometries
      globeGeom.dispose();
      globeMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      partGeom.dispose();
      pMaterial.dispose();
      lineGeom.dispose();
      lineMat.dispose();
      waveGeom.dispose();
      waveMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full absolute inset-0 z-0 pointer-events-none" />;
}
