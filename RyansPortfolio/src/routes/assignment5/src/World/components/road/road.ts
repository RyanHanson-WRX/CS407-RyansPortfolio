import * as THREE from 'three';

export function createRoad() {
    const roadGeometry = new THREE.PlaneGeometry(1000, 100);
    const roadMaterial = new THREE.MeshPhysicalMaterial({ color: 0x2e2d2d, side: THREE.DoubleSide});
  
    // Create meshes for the walls, floor, and ceiling
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
  
    // Position the walls, floor, and ceiling
    road.rotation.x = Math.PI / 2;
    road.position.y = 0;
    road.castShadow = true;
    road.receiveShadow = true;
    

    return road;
  }