import { Scene, TextureLoader } from 'three';

function createScene() {
  const scene = new Scene();
  const nightTexture = new TextureLoader().load('src/routes/assignment4/src/World/nightsky.jpeg');
  scene.background = nightTexture;

  return scene;
}

export { createScene };
