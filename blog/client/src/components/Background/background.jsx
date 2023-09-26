import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';

function Cube() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Box ref={meshRef} args={[2, 2, 2]}>
      <meshStandardMaterial color="royalblue" />
    </Box>
  );
}

function Particles() {
  const particlesRef = useRef();
  const count = 5000; 
  const positions = new Float32Array(count * 3);

  // 初始化粒子的位置
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 2000;  // 在一个20x20x20的盒子内随机分布粒子
  }

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.001;
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" size={0.05} color="#FF0000" />
    </points>
  );
}

export default function RotatingCube() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Cube />
      <Particles />
      <OrbitControls />
    </Canvas>
  );
}
