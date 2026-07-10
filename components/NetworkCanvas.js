"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. Setup Scene, Camera, Renderer
    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 160);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);

    // 2. Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xc9a34a, 1.2);
    dirLight.position.set(50, 50, 50);
    scene.add(dirLight);

    // 3. Central Leader Node
    const leaderGeom = new THREE.SphereGeometry(8, 16, 16);
    const leaderMat = new THREE.MeshPhongMaterial({
      color: 0xc9a34a,
      emissive: 0x07211a,
      specular: 0xffffff,
      shininess: 30
    });
    const leaderNode = new THREE.Mesh(leaderGeom, leaderMat);
    scene.add(leaderNode);

    // Outer glow ring for Leader
    const glowRingGeom = new THREE.RingGeometry(11, 12, 32);
    const glowRingMat = new THREE.MeshBasicMaterial({
      color: 0xe0c26a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    const leaderGlow = new THREE.Mesh(glowRingGeom, glowRingMat);
    leaderNode.add(leaderGlow);

    // 4. Create child nodes (representing matched downlines)
    const nodeCount = 30;
    const nodeMeshes = [];
    const connectionLines = [];
    const nodeGeom = new THREE.SphereGeometry(3, 8, 8);
    const nodeMatActive = new THREE.MeshPhongMaterial({ color: 0xe0c26a });
    const nodeMatInactive = new THREE.MeshPhongMaterial({ color: 0x0b5d43 });

    // Set hierarchical branches
    // Level 1: Left & Right wings
    // Level 2: Downlines
    const nodesData = [];
    for (let i = 0; i < nodeCount; i++) {
      let r, theta, phi;
      let parentIdx;

      // Group nodes by depth level hierarchy
      if (i < 2) {
        // Level 1 (Directs)
        r = 30;
        theta = i === 0 ? Math.PI / 4 : (Math.PI * 3) / 4;
        phi = Math.PI / 2;
        parentIdx = -1; // Connects to leader
      } else if (i < 8) {
        // Level 2 (Wings matching)
        r = 55;
        theta = (i * Math.PI) / 3;
        phi = (Math.PI / 3) + (Math.random() * (Math.PI / 3));
        parentIdx = i % 2 === 0 ? 0 : 1;
      } else {
        // Level 3+ (Deep branches)
        r = 90;
        theta = Math.random() * Math.PI * 2;
        phi = Math.random() * Math.PI;
        parentIdx = Math.floor(2 + (Math.random() * 6));
      }

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const isActive = Math.random() > 0.2;
      const mesh = new THREE.Mesh(nodeGeom, isActive ? nodeMatActive : nodeMatInactive);
      mesh.position.set(x, y, z);
      scene.add(mesh);

      nodesData.push({ x, y, z, parentIdx, r, theta, speed: 0.1 + Math.random() * 0.3 });
      nodeMeshes.push(mesh);
    }

    // Connect node meshes to parents
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xc9a34a,
      transparent: true,
      opacity: 0.3
    });

    nodesData.forEach((data, index) => {
      let parentX = 0, parentY = 0, parentZ = 0;
      if (data.parentIdx !== -1) {
        const parent = nodesData[data.parentIdx];
        parentX = parent.x;
        parentY = parent.y;
        parentZ = parent.z;
      }

      const points = [
        new THREE.Vector3(parentX, parentY, parentZ),
        new THREE.Vector3(data.x, data.y, data.z)
      ];
      
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeom, lineMat);
      scene.add(line);
      connectionLines.push({ line, pIdx: data.parentIdx, selfIdx: index });
    });

    // 5. Render loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Pulsing central leader
      const pulseScale = 1 + Math.sin(time * 3) * 0.08;
      leaderNode.scale.set(pulseScale, pulseScale, pulseScale);
      leaderGlow.rotation.z += 0.01;

      // Rotate whole scene slowly
      scene.rotation.y = time * 0.05;
      scene.rotation.x = Math.sin(time * 0.05) * 0.1;

      // Pulsing nodes
      nodeMeshes.forEach((mesh, idx) => {
        const nodePulse = 1 + Math.cos((time * 4) + idx) * 0.12;
        mesh.scale.set(nodePulse, nodePulse, nodePulse);
      });

      renderer.render(scene, camera);
    };

    animate();

    const canvas = canvasRef.current;

    // 6. Resize
    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 7. Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (canvas && renderer.domElement) {
        canvas.removeChild(renderer.domElement);
      }
      leaderGeom.dispose();
      leaderMat.dispose();
      glowRingGeom.dispose();
      glowRingMat.dispose();
      nodeGeom.dispose();
      nodeMatActive.dispose();
      nodeMatInactive.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={canvasRef} className="w-full h-full absolute inset-0 z-0 pointer-events-none" />;
}
