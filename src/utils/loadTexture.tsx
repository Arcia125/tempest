import * as THREE from 'three';

const defaultOptions = {
  wrapS: THREE.RepeatWrapping,
  wrapT: THREE.RepeatWrapping,
  minFilter: THREE.LinearFilter,
};

export interface LoadTextureOptions {
  wrapS?: THREE.Wrapping;
  wrapT?: THREE.Wrapping;
  minFilter?: THREE.TextureFilter;
}

export const loadTexture = (
  loader: THREE.TextureLoader,
  uri: string,
  {
    wrapS = THREE.RepeatWrapping,
    wrapT = THREE.RepeatWrapping,
    minFilter = THREE.LinearFilter,
  }: LoadTextureOptions = defaultOptions
) => {
  return new Promise<THREE.Texture>((resolve) => {
    loader.load(uri, (tex) => {
      const texture = tex;
      texture.wrapS = wrapS;
      texture.wrapT = wrapT;
      texture.minFilter = minFilter;
      resolve(tex);
    });
  });
};
