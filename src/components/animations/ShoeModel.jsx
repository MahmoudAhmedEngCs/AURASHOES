import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, PresentationControls, ContactShadows, Environment, MeshDistortMaterial, Sphere } from '@react-three/drei';

export function ShoeModel(props) {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <PresentationControls
      global
      config={{ mass: 2, tension: 500 }}
      snap={{ mass: 4, tension: 1500 }}
      rotation={[0, 0.3, 0]}
      polar={[-Math.PI / 3, Math.PI / 3]}
      azimuth={[-Math.PI / 1.4, Math.PI / 2]}
    >
      <Float rotationIntensity={1} floatIntensity={2} speed={2}>
        <group {...props}>
          <Sphere ref={sphereRef} args={[1, 64, 64]} scale={1.8}>
            <MeshDistortMaterial
              color="#ffffff"
              attach="material"
              distort={0.5}
              speed={2}
              roughness={0.1}
              metalness={0.8}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </Sphere>
        </group>
      </Float>
      
      <ContactShadows position={[0, -1.8, 0]} opacity={0.7} scale={10} blur={2.5} far={4} color="#ffffff" />
      <Environment preset="city" />
    </PresentationControls>
  );
}
