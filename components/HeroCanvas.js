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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xc9a34a, 2.5);
    dirLight1.position.set(100, 100, 100);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0b5d43, 2);
    dirLight2.position.set(-100, -100, 50);
    scene.add(dirLight2);

    // 3. Create a Group to hold the 3D rotating objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Shield Shape Geometry
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 30);
    shieldShape.quadraticCurveTo(22, 30, 30, 15);
    shieldShape.lineTo(30, -10);
    shieldShape.quadraticCurveTo(30, -32, 0, -45);
    shieldShape.quadraticCurveTo(-30, -32, -30, -10);
    shieldShape.lineTo(-30, 15);
    shieldShape.quadraticCurveTo(-22, 30, 0, 30);

    const extrudeSettings = {
      depth: 6,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 2,
      bevelThickness: 2
    };

    const shieldGeom = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    
    // Premium materials
    const shieldMat = new THREE.MeshPhongMaterial({
      color: 0x0b5d43, // Deep Emerald
      emissive: 0x07211a,
      specular: 0xc9a34a,
      shininess: 90
    });
    
    const goldMat = new THREE.MeshPhongMaterial({
      color: 0xc9a34a, // Luxury Gold
      emissive: 0x221a0a,
      specular: 0xffffff,
      shininess: 120
    });

    const shieldMesh = new THREE.Mesh(shieldGeom, shieldMat);
    mainGroup.add(shieldMesh);

    // Bull Horns/Face overlay shape on Shield
    const hornsShape = new THREE.Shape();
    hornsShape.moveTo(-15, 8);
    hornsShape.bezierCurveTo(-18, 18, -8, 22, 0, 15);
    hornsShape.bezierCurveTo(8, 22, 18, 18, 15, 8);
    hornsShape.bezierCurveTo(12, 11, 7, 12, 0, 10);
    hornsShape.bezierCurveTo(-7, 12, -12, 11, -15, 8);

    const hornsGeom = new THREE.ExtrudeGeometry(hornsShape, {
      depth: 3,
      bevelEnabled: true,
      bevelSize: 1,
      bevelThickness: 1
    });

    const hornsMesh = new THREE.Mesh(hornsGeom, goldMat);
    hornsMesh.position.set(0, 0, 5); // Offset slightly forward
    shieldMesh.add(hornsMesh);

    // Outer Glowing Ring (Gold)
    const ringGeom = new THREE.RingGeometry(55, 56.5, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc9a34a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 3;
    mainGroup.add(ring);

    // 4. Create floating financial bars (3D Boxes)
    const barGroup = new THREE.Group();
    mainGroup.add(barGroup);
    const barCount = 10;
    const bars = [];
    const barGeom = new THREE.BoxGeometry(4, 15, 4);

    for (let i = 0; i < barCount; i++) {
      const isGold = i % 2 === 0;
      const mesh = new THREE.Mesh(barGeom, isGold ? goldMat : shieldMat);
      const angle = (i / barCount) * Math.PI * 2;
      const radius = 68;
      
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 30,
        Math.sin(angle) * radius
      );
      
      mesh.scale.y = 0.5 + Math.random() * 1.5;
      barGroup.add(mesh);
      bars.push({
        mesh,
        speed: 0.5 + Math.random() * 1.5,
        offset: Math.random() * 10
      });
    }

    // 5. Create animated stock graph line (3D curve)
    const curvePoints = [];
    for (let i = 0; i < 15; i++) {
      curvePoints.push(new THREE.Vector3(
        (i - 7) * 12,
        Math.sin(i * 0.8) * 18 + (i * 1.8) - 15,
        (Math.random() - 0.5) * 8
      ));
    }
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const graphGeom = new THREE.TubeGeometry(curve, 64, 1.2, 8, false);
    const graphMat = new THREE.MeshPhongMaterial({
      color: 0xe0c26a,
      emissive: 0x332a11,
      specular: 0xffffff,
      shininess: 100
    });
    const graphMesh = new THREE.Mesh(graphGeom, graphMat);
    graphMesh.position.set(0, -25, 20);
    mainGroup.add(graphMesh);

    // 6. Create floating particle vertices (Golden dust particles)
    const partCount = 150;
    const partGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(partCount * 3);
    const velocities = [];

    for (let i = 0; i < partCount; i++) {
      const r = 40 + Math.random() * 90;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      velocities.push({
        x: (Math.random() - 0.5) * 0.25,
        y: (Math.random() - 0.5) * 0.25,
        z: (Math.random() - 0.5) * 0.25
      });
    }

    partGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const pMaterial = new THREE.PointsMaterial({
      color: 0xe0c26a,
      size: 2.5,
      transparent: true,
      opacity: 0.85
    });

    const particles = new THREE.Points(partGeom, pMaterial);
    scene.add(particles);

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
      const time = timer.getElapsed();

      // Rotate shield and ring
      mainGroup.rotation.y = time * 0.15;
      ring.rotation.z = -time * 0.25;
      particles.rotation.y = -time * 0.05;

      // Animate floating bars
      bars.forEach((bar) => {
        bar.mesh.position.y += Math.sin(time * bar.speed + bar.offset) * 0.08;
        bar.mesh.rotation.y += 0.01;
      });

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
        if (dist > 150 || dist < 30) {
          velocities[i].x *= -1;
          velocities[i].y *= -1;
          velocities[i].z *= -1;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Move camera slightly for parallax
      camera.position.x = Math.sin(time * 0.15) * 20;
      camera.position.y = Math.cos(time * 0.15) * 20;
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
      shieldGeom.dispose();
      shieldMat.dispose();
      goldMat.dispose();
      hornsGeom.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      barGeom.dispose();
      graphGeom.dispose();
      graphMat.dispose();
      partGeom.dispose();
      pMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full absolute inset-0 z-0 pointer-events-none" />;
}
