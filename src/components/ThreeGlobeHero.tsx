import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Cpu, Play } from 'lucide-react';

interface ThreeGlobeHeroProps {
  onStartProject: () => void;
  onExploreServices: () => void;
}

export const ThreeGlobeHero: React.FC<ThreeGlobeHeroProps> = ({ onStartProject, onExploreServices }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [interactiveStats, setInteractiveStats] = useState({
    activeStreams: 142,
    conversionRate: 8.8,
    aiLatency: '18ms'
  });

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Master Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Inner dark sphere
    const sphereGeo = new THREE.SphereGeometry(5, 48, 48);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x07090e,
      wireframe: false,
    });
    const innerSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(innerSphere);

    // 2. Latitude & Longitude Wireframe Grid (Golden glow)
    const wireGeo = new THREE.SphereGeometry(5.02, 28, 28);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xD4AF37,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireframeGlobe = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireframeGlobe);

    // 3. Globe surface dots (representing digital cities / data nodes)
    const nodeCount = 420;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const r = 5.06;

      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      // Color variation: metallic gold to cyan blue
      if (i % 3 === 0) {
        nodeColors[i * 3] = 0.95; // R
        nodeColors[i * 3 + 1] = 0.8; // G
        nodeColors[i * 3 + 2] = 0.25; // B (Gold)
      } else {
        nodeColors[i * 3] = 0.3;
        nodeColors[i * 3 + 1] = 0.7;
        nodeColors[i * 3 + 2] = 1.0; // Cyan
      }
    }

    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

    const nodeMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const globeNodes = new THREE.Points(nodeGeo, nodeMat);
    globeGroup.add(globeNodes);

    // 4. Gold Orbit Ring (Like the ELA logo!)
    const orbitRingGeo = new THREE.TorusGeometry(7.2, 0.06, 16, 100);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0xD4AF37,
      transparent: true,
      opacity: 0.75,
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 2.6;
    orbitRing.rotation.y = -Math.PI / 6;
    globeGroup.add(orbitRing);

    // Secondary Cyan Atmospheric Ring
    const orbitRing2Geo = new THREE.TorusGeometry(6.6, 0.04, 16, 100);
    const orbitRing2Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
    });
    const orbitRing2 = new THREE.Mesh(orbitRing2Geo, orbitRing2Mat);
    orbitRing2.rotation.x = -Math.PI / 3;
    orbitRing2.rotation.y = Math.PI / 5;
    globeGroup.add(orbitRing2);

    // 5. Orbiting Satellites on Ring
    const satCount = 4;
    const satellites: THREE.Mesh[] = [];
    for (let s = 0; s < satCount; s++) {
      const satGeo = new THREE.SphereGeometry(0.18, 12, 12);
      const satMat = new THREE.MeshBasicMaterial({ color: 0xFFEA88 });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satellites.push(satMesh);
      globeGroup.add(satMesh);
    }

    // 6. Connecting Glowing Arcs (Curves between points)
    const arcCount = 6;
    const arcs: THREE.Line[] = [];
    for (let a = 0; a < arcCount; a++) {
      const startPhi = Math.random() * Math.PI;
      const startTheta = Math.random() * Math.PI * 2;
      const endPhi = Math.random() * Math.PI;
      const endTheta = Math.random() * Math.PI * 2;

      const p1 = new THREE.Vector3().setFromSphericalCoords(5.08, startPhi, startTheta);
      const p2 = new THREE.Vector3().setFromSphericalCoords(5.08, endPhi, endTheta);
      const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(6.5);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(32);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({
        color: a % 2 === 0 ? 0xD4AF37 : 0x60A5FA,
        transparent: true,
        opacity: 0.5,
      });
      const arcLine = new THREE.Line(curveGeo, curveMat);
      arcs.push(arcLine);
      globeGroup.add(arcLine);
    }

    // 7. Ambient Particle Cloud (Gold and Silver Star Dust)
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const dist = 7.5 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = dist * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xF3C649,
      transparent: true,
      opacity: 0.45,
    });
    const starField = new THREE.Points(particleGeo, particleMat);
    scene.add(starField);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.4;
      mouseY = y * 0.3;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Handle Resize
    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse rotation
      targetRotationY += (mouseX - targetRotationY) * 0.05;
      targetRotationX += (mouseY - targetRotationX) * 0.05;

      globeGroup.rotation.y = elapsedTime * 0.12 + targetRotationY;
      globeGroup.rotation.x = 0.15 + targetRotationX;

      // Rotate particles slowly
      starField.rotation.y = elapsedTime * 0.02;

      // Orbit satellites around the ring
      satellites.forEach((sat, idx) => {
        const angle = elapsedTime * 0.8 + (idx * Math.PI * 2) / satCount;
        const radius = 7.2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        // Transform along ring orientation
        const vec = new THREE.Vector3(x, y, 0);
        vec.applyEuler(orbitRing.rotation);
        sat.position.copy(vec);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grid-pattern">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 3D Canvas Mount Point */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80 lg:opacity-100"
      />

      {/* Fallback if WebGL unavailable */}
      {!webglSupported && (
        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-60">
          <div className="w-96 h-96 rounded-full border-2 border-amber-400/30 animate-pulse-glow flex items-center justify-center bg-gradient-to-tr from-amber-500/10 via-black to-cyan-500/10">
            <div className="w-80 h-80 rounded-full border border-dashed border-amber-300/40 animate-spin" style={{ animationDuration: '35s' }} />
          </div>
        </div>
      )}

      {/* Foreground Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Holographic Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border-amber-400/30 text-xs sm:text-sm text-amber-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>NEXT-GEN DIGITAL ARCHITECTURE & AI AGENCY</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] font-['Outfit']">
              <span className="block text-white">THINK DIGITAL.</span>
              <span className="block text-gold-gradient">THINK BIGGER.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Transform your ideas into powerful digital experiences with strategy, technology, creativity and AI. We build high-converting platforms, Meta ads engines, and enterprise WhatsApp automation.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-start-project-btn"
                onClick={onStartProject}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gold-gradient text-black font-bold text-base hover:brightness-110 active:scale-[0.98] transition-all duration-200 gold-glow flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-services-btn"
                onClick={onExploreServices}
                className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel text-white font-medium text-base hover:border-amber-400/50 hover:bg-white/[0.08] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Explore Our Services</span>
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">340%+</p>
                <p className="text-xs text-zinc-400">Avg. Client ROAS</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-amber-400 font-['Outfit']">250K+</p>
                <p className="text-xs text-zinc-400">Leads Generated</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">&lt; 5s</p>
                <p className="text-xs text-zinc-400">WhatsApp AI Response</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Floating Holographic Cards (Synchronized with 3D Globe) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center space-y-4 pointer-events-auto">
            {/* Holographic Card 1: AI Command Beacon */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-full max-w-sm glass-panel-gold rounded-2xl p-4 shadow-2xl backdrop-blur-xl border border-amber-400/40 relative overflow-hidden group hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-amber-300">Global AI Node</h2>
                    <p className="text-[11px] text-zinc-400">Active telemetry stream</p>
                  </div>
                </div>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <div className="flex items-end justify-between bg-black/40 rounded-xl p-2.5 border border-white/5">
                <div>
                  <span className="text-[10px] text-zinc-400">Latency</span>
                  <p className="text-base font-bold text-white">{interactiveStats.aiLatency}</p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400">Conversion</span>
                  <p className="text-base font-bold text-emerald-400">+{interactiveStats.conversionRate}%</p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400">Pipelines</span>
                  <p className="text-base font-bold text-amber-300">{interactiveStats.activeStreams}</p>
                </div>
              </div>
            </motion.div>

            {/* Holographic Card 2: Growth Metric Stream */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-full max-w-sm glass-panel rounded-2xl p-4 shadow-2xl backdrop-blur-xl border border-white/15 relative overflow-hidden group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Direct WhatsApp Funnel</h2>
                    <p className="text-xs text-zinc-400">Instant Lead Capture (+91 8667618925)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                    100% Verified
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-zinc-300 pt-2 border-t border-white/10">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Official Cloud API
                </span>
                <span className="text-amber-300 font-medium">Auto-Nurture Active</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
