/**
Copyright (c) 2020 by Liam Egan (https://codepen.io/shubniggurath/pen/BVKgJK)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import * as THREE from 'three';

import { Animation } from './types';

const loader = new THREE.TextureLoader();

interface LoadedTextures {
  texture: THREE.Texture;
  bg: THREE.Texture;
}

export const initialSceneState: Animation.SceneState = {
  camera: null,
  scene: null,
  renderer: null,
  uniforms: null,
};

// const loadTexture = (url: string, )

const loadTextures = () =>
  new Promise<LoadedTextures>((resolve) => {
    loader.setCrossOrigin('anonymous');
    loader.load(
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png',
      (tex) => {
        const texture = tex;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.minFilter = THREE.LinearFilter;
        loader.load(
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/clouds-1-tile.jpg',
          (tex) => {
            const bg = tex;
            bg.wrapS = THREE.RepeatWrapping;
            bg.wrapT = THREE.RepeatWrapping;
            bg.minFilter = THREE.LinearFilter;
            resolve({ texture, bg });
          }
        );
      }
    );
  });

export function init(container: HTMLElement, sceneState: Animation.SceneState) {
  // container = document.getElementById('container');
  return loadTextures().then(({ texture, bg }) => {
    sceneState.camera = new THREE.Camera();
    sceneState.camera.position.z = 1;

    sceneState.scene = new THREE.Scene();

    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    sceneState.uniforms = {
      u_time: { type: 'f', value: 1.0 } as THREE.IUniform,
      u_resolution: {
        type: 'v2',
        value: new THREE.Vector2(),
      } as THREE.IUniform,
      u_noise: { type: 't', value: texture } as THREE.IUniform,
      u_bg: { type: 't', value: bg } as THREE.IUniform,
      u_mouse: {
        type: 'v2',
        value: new THREE.Vector2(),
      } as THREE.IUniform,
      u_scroll: { type: 'f', value: 0 } as THREE.IUniform,
    };

    const material = new THREE.ShaderMaterial({
      uniforms: sceneState.uniforms,
      vertexShader: document.getElementById('vertexShader')!
        .textContent as THREE.ShaderMaterialParameters['vertexShader'],
      fragmentShader: document.getElementById('fragmentShader')!
        .textContent as THREE.ShaderMaterialParameters['fragmentShader'],
    });
    material.extensions.derivatives = true;

    const mesh = new THREE.Mesh(geometry, material);
    sceneState.scene.add(mesh);

    sceneState.renderer = new THREE.WebGLRenderer();
    sceneState.renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(sceneState.renderer.domElement);

    function onWindowResize() {
      const size: [number, number] = [
        container.clientWidth,
        container.clientHeight,
      ];
      sceneState.renderer!.setSize(...size);
      sceneState.uniforms!.u_resolution.value.x = sceneState.renderer!.domElement.width;
      sceneState.uniforms!.u_resolution.value.y = sceneState.renderer!.domElement.height;
    }

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

    document.addEventListener('pointermove', (e) => {
      const ratio = window.innerHeight / window.innerWidth;
      sceneState.uniforms!.u_mouse.value.x =
        (e.pageX - window.innerWidth / 2) / window.innerWidth / ratio;
      sceneState.uniforms!.u_mouse.value.y =
        ((e.pageY - window.innerHeight / 2) / window.innerHeight) * -1;

      e.preventDefault();
    });
  });
}

export function createRenderer({
  scene,
  camera,
  renderer,
  uniforms,
}: Animation.SceneState) {
  return function render(delta?: number) {
    if (typeof delta === 'number') {
      uniforms!.u_time.value = -1000 + delta * 0.0005;
    }
    uniforms!.u_scroll.value = window.scrollY;
    renderer!.render(scene!, camera!);
  };
}
