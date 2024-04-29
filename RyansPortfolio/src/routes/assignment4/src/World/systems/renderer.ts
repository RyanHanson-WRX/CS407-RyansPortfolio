import { WebGLRenderer } from 'three';

function createRenderer(canvas: HTMLCanvasElement) {
  const renderer = new WebGLRenderer({ antialias: true, canvas: canvas });

  return renderer;
}

export { createRenderer };
