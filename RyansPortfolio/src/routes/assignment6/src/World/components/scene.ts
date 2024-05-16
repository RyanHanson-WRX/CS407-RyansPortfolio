import { Color, Scene, TextureLoader } from 'three';

function createScene() {
  const scene = new Scene();

  scene.background = new Color('#535050');

  return scene;
}

export { createScene };
