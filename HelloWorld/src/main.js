import {
    BoxGeometry,
    Color,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
  } from '../node_modules/three/build/three.module.js';

const container = document.querySelector('#scene-container');

const scene = new Scene();

scene.background = new Color('grey');

const fov = 35;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; 
const far = 100; 

const camera = new PerspectiveCamera(fov, aspect, near, far);

camera.position.set(0, 0, 10);

const geometry = new BoxGeometry(2, 2, 2);

const material = new MeshBasicMaterial({color: 0xffffff, vertexColors: true, wireframe: true});

const cube = new Mesh(geometry, material);

scene.add(cube);

const renderer = new WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.append(renderer.domElement);

function animate()
{
    requestAnimationFrame(animate);
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();