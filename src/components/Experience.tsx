import {
  Environment,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { useMemo } from "react";
import {
  positionLocal,
  uv,
  mix,
  step,
  vec3,
  float,
  fract,
  negate,
  texture,
} from "three/tsl";
import { MeshStandardNodeMaterial } from 'three/webgpu';
import { extend } from '@react-three/fiber';
import type { ThreeElement } from '@react-three/fiber'

extend({ MeshStandardNodeMaterial });


declare module '@react-three/fiber' {
  interface ThreeElements {
    meshStandardNodeMaterial: ThreeElement<typeof MeshStandardNodeMaterial>
  }
}

export const Experience = () => {
  // Load textures
  const tex1 = useTexture(
    "https://images.unsplash.com/photo-1726016775256-4b3c58df37cb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  );
  const tex2 = useTexture(
    "https://images.unsplash.com/photo-1635159324673-39d40b4c14f0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  );

  const nodes = useMemo(() => {
    const nSegmants = float(60.0);
    const height = float(0.05);

    // repeated UV
    const repeatedUvs = fract(uv().x.mul(nSegmants));

    // texture line effect
    const linedUvs = step(0.5, repeatedUvs);

    // Effect
    const zOffset = mix(negate(0.05), height, repeatedUvs);
    const finalPosition = positionLocal.add(vec3(0, 0, zOffset));

    // Loading Textures
    const tex1Node = texture(tex1);
    const tex2Node = texture(tex2);

    // Final Color
    const finalColor = mix(tex1Node, tex2Node, linedUvs);

    return {
      colorNode: finalColor,
      positionNode: finalPosition,
    };
  }, [tex1, tex2]);

  return (
    <>
      <directionalLight position={[5, 5, -5]} intensity={0.5} castShadow />
      <Environment preset="sunset" environmentIntensity={0.5} />
      <OrbitControls
        maxPolarAngle={Math.PI / 2 - 0.1}
        enableDamping
        enablePan={false}
        enableZoom={false}
      />
      <mesh>
        <planeGeometry args={[2, 2, 120]} />
        <meshStandardNodeMaterial side={2} {...nodes} />
      </mesh>
    </>
  );
};
