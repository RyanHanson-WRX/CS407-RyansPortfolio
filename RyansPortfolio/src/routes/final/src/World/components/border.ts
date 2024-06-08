import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

function createBorder() {
    // create a geometry
    const geometry = new BoxGeometry(53, 50, 25, 53, 50, 25);

    // create a default (white) Basic material
    const material = new MeshStandardMaterial({color: 'grey', wireframe: false, side: 2, opacity: 0.5, transparent: true});

    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);
    cube.scale.set(1, 1, 1); // Fix: Use 'set' instead of 'scale' to set the scale of the cube

    cube.position.set(0, 25, 0);

    return cube;
}

export { createBorder };