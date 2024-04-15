import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

function createCube() {
    // create a geometry
    const geometry = new BoxGeometry(1, 1, 1);

    // create a default (white) Basic material
    const material = new MeshStandardMaterial({color: 0x44aa88});

    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);

    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.rotation.y = Math.PI / 4;
    cube.rotation.x = Math.PI / 5;
    cube.position.z = 3;
    cube.position.y = -0.2;
    return cube;
}

export { createCube };