import * as THREE from 'three';
import { loadTexture, LoadTextureOptions } from './loadTexture';


export const loadTextures = (
  loader: THREE.TextureLoader,
  uris: string[] = [],
  options?: LoadTextureOptions
) => Promise.all(uris.map((uri) => loadTexture(loader, uri, options)));
