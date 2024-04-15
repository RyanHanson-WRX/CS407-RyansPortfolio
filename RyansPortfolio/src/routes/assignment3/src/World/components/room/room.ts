import * as THREE from 'three';

export function createRoom() {
    // Create geometries for the walls, floor, and ceiling
    const wallGeometry = new THREE.PlaneGeometry(30, 5);
    const floorGeometry = new THREE.PlaneGeometry(10, 30);
  
    // Create materials for the walls, floor, and ceiling
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
    const ceilingMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  
    // Create meshes for the walls, floor, and ceiling
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    const ceiling = new THREE.Mesh(floorGeometry, ceilingMaterial);
    const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    // const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
    const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
    const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
  
    // Position the walls, floor, and ceiling
    floor.rotation.x = Math.PI / 2;
    floor.position.y = -1.5;
    floor.receiveShadow = true;
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 4;
    ceiling.rotation.y = Math.PI;
    ceiling.position.z = -1.5;
    wall1.position.y = 1.5;
    wall1.position.z = -1.5;
    wall3.position.y = 1.5;
    wall3.position.x = -3;
    wall3.position.z = -1.5;
    wall3.rotation.y = Math.PI / 2;
    wall4.position.y = 1.5;
    wall4.position.x = 3;
    wall4.position.z = -1.5;
    wall4.rotation.y = Math.PI / 2;
  
    // Add the walls, floor, and ceiling to the room
    const room = new THREE.Group();
    room.add(floor);
    room.add(ceiling);
    room.add(wall1);
    // room.add(wall2);
    room.add(wall3);
    room.add(wall4);

    room.position.set(0, -1.5, -6);

    room.rotateOnAxis(new THREE.Vector3(0, 0, 0), Math.PI / 2);
  
    return room;
  }