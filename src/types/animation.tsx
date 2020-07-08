import * as THREE from 'three';
// let texture: THREE.Texture, bg: THREE.Texture;
export interface SceneState {
  camera: THREE.Camera | null;
  scene: THREE.Scene | null;
  renderer: THREE.WebGLRenderer | null;
  uniforms: {
    [uniform: string]: THREE.IUniform;
  } | null;
}
