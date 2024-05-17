import { Color, Scene, TextureLoader } from 'three';

function createScene() {
  const scene = new Scene();

  scene.background = new Color('#000000');

  return scene;
}

export { createScene };
