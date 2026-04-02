import { Stats } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import * as THREE from "three/webgpu";

function App() {
  return (
    <>
      <Stats />
      <Canvas
        shadows
        camera={{ position: [0, 0, 2], fov: 75 }}
        gl={async (props) => {
          extend(THREE);
          const renderer = new THREE.WebGPURenderer(props);
          await renderer.init();
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
