import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NetworkAnimation = ({ isDark }) => {
    const count = 150; // Number of nodes - Increased for density
    const connectionDistance = 5.5; // Distance to connect nodes - Increased for better connections

    // Create particles with random positions and velocities
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                x: (Math.random() - 0.5) * 30,
                y: (Math.random() - 0.5) * 30,
                z: (Math.random() - 0.5) * 10,
                vx: (Math.random() - 0.5) * 0.02, // Velocity X
                vy: (Math.random() - 0.5) * 0.02, // Velocity Y
                vz: (Math.random() - 0.5) * 0.02, // Velocity Z
            });
        }
        return temp;
    }, []);

    const pointsRef = useRef();
    const linesRef = useRef();

    // Buffer geometries
    const pointsGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, []);

    const linesGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        // Allocate enough space for lines (max possible is count^2, but we use a safe upper bound)
        const positions = new Float32Array(count * count * 3);
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, []);

    useFrame((state) => {
        if (!pointsRef.current || !linesRef.current) return;

        const positions = pointsRef.current.geometry.attributes.position.array;
        const linePositions = linesRef.current.geometry.attributes.position.array;

        // Mouse interaction
        const mouseX = state.mouse.x * 15;
        const mouseY = state.mouse.y * 15;

        let lineIndex = 0;

        // Update particles
        particles.forEach((p, i) => {
            // Move
            p.x += p.vx;
            p.y += p.vy;
            p.z += p.vz;

            // Bounce off walls (keep within view)
            if (p.x > 20 || p.x < -20) p.vx *= -1;
            if (p.y > 20 || p.y < -20) p.vy *= -1;
            if (p.z > 10 || p.z < -10) p.vz *= -1;

            // Mouse interaction: Particles gently move away from mouse
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 5) {
                p.x -= dx * 0.005;
                p.y -= dy * 0.005;
            }

            // Update point position in buffer
            positions[i * 3] = p.x;
            positions[i * 3 + 1] = p.y;
            positions[i * 3 + 2] = p.z;

            // Check connections with other particles
            for (let j = i + 1; j < count; j++) {
                const p2 = particles[j];
                const dx2 = p.x - p2.x;
                const dy2 = p.y - p2.y;
                const dz2 = p.z - p2.z;
                const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2 + dz2 * dz2);

                if (dist2 < connectionDistance) {
                    linePositions[lineIndex++] = p.x;
                    linePositions[lineIndex++] = p.y;
                    linePositions[lineIndex++] = p.z;
                    linePositions[lineIndex++] = p2.x;
                    linePositions[lineIndex++] = p2.y;
                    linePositions[lineIndex++] = p2.z;
                }
            }
        });

        // Update geometries
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Set draw range for lines (only draw active connections)
        linesRef.current.geometry.setDrawRange(0, lineIndex / 3);
        linesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    const color = isDark ? "#00f3ff" : "#2563eb";

    return (
        <>
            <points ref={pointsRef} geometry={pointsGeometry}>
                <pointsMaterial size={0.15} color={color} transparent opacity={0.8} sizeAttenuation={true} />
            </points>
            <lineSegments ref={linesRef} geometry={linesGeometry}>
                <lineBasicMaterial color={color} transparent opacity={0.15} linewidth={1} />
            </lineSegments>
        </>
    );
};

const ThreeBackground = ({ isDark }) => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: isDark ? '#050505' : '#f0f2f5', transition: 'background 0.5s ease' }}>
            <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
                <NetworkAnimation isDark={isDark} />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
