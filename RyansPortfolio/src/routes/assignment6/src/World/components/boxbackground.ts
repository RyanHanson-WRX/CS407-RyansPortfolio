import { BoxGeometry, Mesh, MeshStandardMaterial, Vector3 } from 'three';

function createCube() {
    // create a geometry
    const geometry = new BoxGeometry(100, 20, 100, 100, 20, 100);

    // create a default (white) Basic material
    const material = new MeshStandardMaterial({color: 'lime', wireframe: true});

    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);
    cube.scale.set(4, 4, 4); // Fix: Use 'set' instead of 'scale' to set the scale of the cube

    cube.position.set(4, 0, 20);

    return cube;
}

export { createCube };