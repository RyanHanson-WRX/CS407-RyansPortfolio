import { CylinderGeometry, Mesh, MeshPhysicalMaterial } from 'three';

function createCylinder() {
    // create a geometry
    const geometry = new CylinderGeometry(1, 1, 2.5);

    // create a default (white) Basic material
    const material = new MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
        reflectivity: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.5,
        transmission: 0.9,
        ior: 1.5,
        roughness: 0.5,
    });

    // create a Mesh containing the geometry and material
    const cylinder = new Mesh(geometry, material);

    cylinder.castShadow = true;
    cylinder.receiveShadow = true;

    cylinder.position.y = -0.5;
    cylinder.position.z = 3;

    return cylinder;
}

export { createCylinder };