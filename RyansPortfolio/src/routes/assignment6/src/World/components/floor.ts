import * as THREE from 'three';

export function createFloor() {
    const Geometry = new THREE.PlaneGeometry(1000, 100);
    const Material = new THREE.MeshPhysicalMaterial({ color: 0x2e2d2d, side: THREE.DoubleSide});
  
    // Create meshes for the walls, floor, and ceiling
    const floor = new THREE.Mesh(Geometry, Material);
  
    // Position the walls, floor, and ceiling
    floor.rotation.x = Math.PI / 2;
    floor.position.y = -20;
    floor.castShadow = true;
    floor.receiveShadow = true;
    

    return floor;
  }