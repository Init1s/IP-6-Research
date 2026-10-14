"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/site";
import model from "@/lib/ip6-model.json";

// Project the CCD's 3D coordinates, keeping atoms and bonds rigid.
const elements: Record<string, { radius: number; light: string; color: string; dark: string }> = {
  C: { radius: .38, light: "#a5adb6", color: "#39424c", dark: "#131b25" },
  H: { radius: .24, light: "#ffffff", color: "#e1e6ec", dark: "#8694a5" },
  O: { radius: .37, light: "#ffafa0", color: "#db342d", dark: "#811e1c" },
  P: { radius: .47, light: "#ffe3a0", color: "#e6a02b", dark: "#9b5812" },
};
const center = [0, 1, 2].map(axis => model.atoms.reduce((sum, atom) => sum + atom.position[axis], 0) / model.atoms.length);
const atoms = model.atoms.map(atom => ({ ...atom, position: atom.position.map((value, axis) => value - center[axis]) }));
const bonds = model.bonds.map(bond => ({
  from: atoms.findIndex(atom => atom.id === bond.from),
  to: atoms.findIndex(atom => atom.id === bond.to),
  order: bond.order,
}));

export default function HeroMolecule() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, frame = 0, previous = 0, angle = .35, elapsed = 0;
    let visible = true;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      if (!width || !height) return;
      const scale = Math.min(width, height) / 14.8;
      const cos = Math.cos(angle), sin = Math.sin(angle);
      // Slow nod on the tilt axis so the ring's perspective changes as the molecule spins.
      const tilt = -.32 + Math.sin(elapsed / 5200) * .16;
      const points = atoms.map(atom => {
        const [x, y, z] = atom.position;
        const rx = x * cos + z * sin;
        const rz = -x * sin + z * cos;
        const ry = y * Math.cos(tilt) - rz * Math.sin(tilt);
        const depth = y * Math.sin(tilt) + rz * Math.cos(tilt);
        const perspective = 34 / (34 - depth);
        return { x: width / 2 + rx * scale * perspective, y: height / 2 - ry * scale * perspective, z: depth, radius: elements[atom.element].radius * scale * perspective, element: atom.element };
      });
      const shapes: { z: number; paint: () => void }[] = [];
      for (const bond of bonds) {
        const a = points[bond.from], b = points[bond.to];
        const length = Math.hypot(b.x - a.x, b.y - a.y) || 1;
        const nx = -(b.y - a.y) / length, ny = (b.x - a.x) / length;
        // Segment bonds so they sort correctly behind neighboring atoms.
        for (let part = 0; part < 8; part++) {
          const t = part / 8, end = (part + 1) / 8;
          shapes.push({ z: a.z + (b.z - a.z) * (t + end) / 2, paint: () => {
            for (let line = 0; line < bond.order; line++) {
              const offset = bond.order === 2 ? (line === 0 ? -1 : 1) * scale * .085 : 0;
              context.beginPath();
              context.moveTo(a.x + (b.x - a.x) * t + nx * offset, a.y + (b.y - a.y) * t + ny * offset);
              context.lineTo(a.x + (b.x - a.x) * end + nx * offset, a.y + (b.y - a.y) * end + ny * offset);
              context.lineWidth = scale * (bond.order === 2 ? .095 : .145);
              context.lineCap = "round";
              context.strokeStyle = t < .5 ? elements[a.element].color : elements[b.element].color;
              context.stroke();
            }
          } });
        }
      }
      for (const point of points) {
        shapes.push({ z: point.z, paint: () => {
          const colors = elements[point.element];
          const gradient = context.createRadialGradient(point.x - point.radius * .35, point.y - point.radius * .4, point.radius * .05, point.x, point.y, point.radius);
          gradient.addColorStop(0, colors.light);
          gradient.addColorStop(.5, colors.color);
          gradient.addColorStop(1, colors.dark);
          context.beginPath();
          context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
          context.fillStyle = gradient;
          context.fill();
        } });
      }
      shapes.sort((a, b) => a.z - b.z).forEach(shape => shape.paint());
    };

    const tick = (now: number) => {
      if (previous) {
        const step = Math.min(now - previous, 64);
        angle += step * Math.PI * 2 / 12000;
        elapsed += step;
      }
      previous = now;
      draw();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      draw();
      if (!preference.matches && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(() => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
      setReady(true);
    });
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    resize.observe(canvas);
    intersection.observe(canvas);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div className="hero-molecule-stage" data-ready={ready}>
      <img src={asset("/images/ip6-molecule.png")} alt="Molecular model of IP6 with six phosphate groups" width="1489" height="1664" fetchPriority="high" aria-hidden={ready} />
      <canvas ref={canvasRef} role="img" aria-label="Three-dimensional molecular model of IP6, rotating to show its inositol ring and six phosphate groups" />
    </div>
  );
}
