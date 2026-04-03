import { Stats } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import * as THREE from 'three/webgpu';
import type { ThreeElement } from '@react-three/fiber';

// Manually extend only the classes you are using in JSX
extend({ 
  MeshStandardNodeMaterial: THREE.MeshStandardNodeMaterial,
  // Add any other specific WebGPU classes here
});

// To stop TS complaining about the JSX tags, add this:
declare module '@react-three/fiber' {
  interface ThreeElements {
    meshStandardNodeMaterial: ThreeElement<typeof THREE.MeshStandardNodeMaterial>
  }
}

function App() {
  return (
    <>
      <Stats />
      <Canvas
        shadows
        camera={{ position: [0, 0, 2], fov: 75 }}
        gl={(canvas: any) => {
          const renderer = new THREE.WebGPURenderer({ 
            canvas: canvas instanceof HTMLCanvasElement ? canvas : canvas.canvas,
            antialias: true,
            powerPreference: 'high-performance' as GPUPowerPreference 
          });
          return renderer;
        }}
      >
        <color attach="background" args={["#333"]} />
        <Suspense>
          <Experience />
        </Suspense>
      </Canvas>
    </>
  );
}
export default App;
