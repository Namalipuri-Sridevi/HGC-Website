import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MarketPoint {
  name: string;
  lat: number;
  lng: number;
  origin?: boolean;
}

const MARKETS: MarketPoint[] = [
  { name: 'India', lat: 20.5937, lng: 78.9629, origin: true },
  { name: 'Europe', lat: 50.1109, lng: 8.6821 },
  { name: 'Middle East', lat: 25.2048, lng: 55.2708 },
  { name: 'East Asia', lat: 31.2304, lng: 121.4737 },
  { name: 'Africa', lat: -1.2921, lng: 36.8219 },
  { name: 'Americas', lat: 37.7749, lng: -122.4194 },
];

export const Globe3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const labelLayer = labelsRef.current;
    if (!container || !labelLayer) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animId: number;
    let isDisposed = false;

    try {
      const width = container.clientWidth || 440;
      const height = container.clientHeight || 440;

      const scene = new THREE.Scene();
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      container.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
      camera.position.set(0, 0, 4.3);

      const globeGroup = new THREE.Group();
      scene.add(globeGroup);

      // Globe sphere
      const geometry = new THREE.SphereGeometry(1, 64, 48);
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: new THREE.Color(0x208b3a),
        shininess: 8,
      });

      const earth = new THREE.Mesh(geometry, material);
      globeGroup.add(earth);

      // Texture loader
      const loader = new THREE.TextureLoader();
      loader.load('/hgc-assets/earth-map-india-green.png', (texture) => {
        if (isDisposed) return;
        texture.colorSpace = THREE.SRGBColorSpace;
        material.map = texture;
        material.needsUpdate = true;
      }, undefined, () => {
        // Fallback texture if png is not found
        loader.load('/hgc-assets/earth-map-hd.jpg', (tex) => {
          if (isDisposed) return;
          material.map = tex;
          material.needsUpdate = true;
        });
      });

      // Atmosphere glow
      const atmosGeom = new THREE.SphereGeometry(1.025, 48, 32);
      const atmosMat = new THREE.MeshBasicMaterial({
        color: 0x10873a,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide,
      });
      globeGroup.add(new THREE.Mesh(atmosGeom, atmosMat));

      // Lighting
      scene.add(new THREE.AmbientLight(0xffffff, 1.4));
      const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
      keyLight.position.set(-2, 2, 4);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xe8f5e9, 0.6);
      fillLight.position.set(3, -1, 2);
      scene.add(fillLight);

      // Lat/Lng to Vector3
      const toVector = (lat: number, lng: number, r = 1) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        return new THREE.Vector3(
          -r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        );
      };

      // Set initial rotation to highlight India
      const india = toVector(20.5937, 78.9629, 1);
      globeGroup.rotation.y = (Math.atan2(-india.x, india.z) + Math.PI * 2) % (Math.PI * 2);

      // Add Market Points & Screen Labels
      const labelElements: { el: HTMLSpanElement; point: THREE.Vector3 }[] = [];

      MARKETS.forEach((m) => {
        const pt = toVector(m.lat, m.lng, 1.01);
        const dotGeom = new THREE.SphereGeometry(m.origin ? 0.035 : 0.022, 16, 12);
        const dotMat = new THREE.MeshBasicMaterial({ color: m.origin ? 0x10873a : 0x22c55e });
        const dot = new THREE.Mesh(dotGeom, dotMat);
        dot.position.copy(pt);
        globeGroup.add(dot);

        // HTML label
        const span = document.createElement('span');
        span.className = `absolute text-[11px] font-bold px-2 py-0.5 rounded-full pointer-events-none transition-opacity duration-200 ${
          m.origin
            ? 'bg-[#10873a] text-white shadow-md border border-white/60 z-10'
            : 'bg-white/90 text-stone-800 shadow-sm border border-stone-200'
        }`;
        span.textContent = m.name;
        labelLayer.appendChild(span);

        labelElements.push({ el: span, point: pt });
      });

      // Connecting Arcs from India to Global Hubs
      MARKETS.filter((m) => !m.origin).forEach((dest) => {
        const vDest = toVector(dest.lat, dest.lng, 1.01);
        const mid = india.clone().add(vDest).multiplyScalar(0.5);
        const distance = india.distanceTo(vDest);
        mid.normalize().multiplyScalar(1.0 + distance * 0.25);

        const curve = new THREE.QuadraticBezierCurve3(india, mid, vDest);
        const points = curve.getPoints(40);
        const arcGeom = new THREE.BufferGeometry().setFromPoints(points);
        const arcMat = new THREE.LineBasicMaterial({
          color: 0x10873a,
          transparent: true,
          opacity: 0.6,
        });
        const arcLine = new THREE.Line(arcGeom, arcMat);
        globeGroup.add(arcLine);
      });

      // Animation Loop
      const animate = () => {
        if (isDisposed) return;
        globeGroup.rotation.y += 0.002;
        renderer?.render(scene, camera);

        // Update 2D Screen Label positions
        labelElements.forEach(({ el, point }) => {
          const world = globeGroup.localToWorld(point.clone());
          const ray = world.clone().sub(camera.position).normalize();
          const normal = world.clone().normalize();
          const visible = ray.dot(normal) < -0.15;

          if (!visible) {
            el.style.opacity = '0';
            return;
          }

          const screen = world.clone().project(camera);
          const x = (screen.x * 0.5 + 0.5) * width;
          const y = (-screen.y * 0.5 + 0.5) * height;

          el.style.opacity = '1';
          el.style.transform = `translate(-50%, -120%) translate(${x}px, ${y}px)`;
        });

        animId = requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        if (!container || isDisposed) return;
        const newW = container.clientWidth || 440;
        const newH = container.clientHeight || 440;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer?.setSize(newW, newH);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        isDisposed = true;
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animId);
        if (renderer && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
        labelLayer.innerHTML = '';
      };
    } catch (e) {
      console.warn('Three.js globe error:', e);
    }
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[440px] flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing" />
      <div ref={labelsRef} className="absolute inset-0 pointer-events-none overflow-hidden" />
    </div>
  );
};
