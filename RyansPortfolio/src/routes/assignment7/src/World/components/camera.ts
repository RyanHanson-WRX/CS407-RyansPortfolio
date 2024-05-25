import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(
    35, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    500, // far clipping plane
  );

  camera.position.set(50, 25, 50);
  camera.lookAt(0, 0, 0);

  return camera;
}

export { createCamera };
