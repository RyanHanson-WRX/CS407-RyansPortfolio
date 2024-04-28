import { BoxGeometry, Mesh, MeshStandardMaterial, Group, CylinderGeometry, MeshPhysicalMaterial, Vector3 } from 'three';
import { CreateTire } from './tires';

interface CustomCar extends Group {
    tick: (delta: number) => void;
}

function createCar() {

    const car: CustomCar = new Group() as CustomCar;
    const spoilerGroup = new Group();
    

    const bodyGeometry = new BoxGeometry(25, 5, 10);
    const bodyMaterial = new MeshStandardMaterial({color: 0xded9d9});
    const cabGeometry = new BoxGeometry(11, 4, 8);
    const cabMaterial = new MeshStandardMaterial({color: 0xded9d9});
    const spoilerGeometry = new BoxGeometry(5, 0.5, 10);
    const spoilerMaterial = new MeshStandardMaterial({color: 0xded9d9});
    const spoilerWingGeometry = new BoxGeometry(1, 1.5, 1);
    const spoilerWingMaterial = new MeshStandardMaterial({color: 0x000000 });
    const scoopGeometry = new BoxGeometry(2, 1, 4);
    const scoopMaterial = new MeshStandardMaterial({color: 0x000000 });
    const exhaustGeometry = new CylinderGeometry(0.5, 0.5, 1, 32);
    const exhaustMaterial = new MeshPhysicalMaterial({color: 0x1900ff, side: 2, metalness: 0.5, roughness: 0.5, reflectivity: 0.5, clearcoat: 0.5, clearcoatRoughness: 0.5});


    // create a Mesh containing the geometry and material
    const body = new Mesh(bodyGeometry, bodyMaterial);
    const cab = new Mesh(cabGeometry, cabMaterial);
    const spoiler = new Mesh(spoilerGeometry, spoilerMaterial);
    const wing1 = new Mesh(spoilerWingGeometry, spoilerWingMaterial);
    const wing2 = new Mesh(spoilerWingGeometry, spoilerWingMaterial);
    const scoop = new Mesh(scoopGeometry, scoopMaterial);
    const exhaust = new Mesh(exhaustGeometry, exhaustMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.set(0, 3, 0);
    cab.castShadow = true;
    cab.receiveShadow = true;
    cab.position.set(-1.5, 7.5, 0);
    scoop.castShadow = true;
    scoop.receiveShadow = true;
    scoop.position.set(8, 6, 0);
    spoiler.castShadow = true;
    spoiler.receiveShadow = true;
    spoiler.position.set(-10.5, 7.3, 0);
    wing1.castShadow = true;
    wing1.receiveShadow = true;
    wing1.position.set(-10.5, 6.3, 3);
    wing2.castShadow = true;
    wing2.receiveShadow = true;
    wing2.position.set(-10.5, 6.3, -3);
    exhaust.rotateOnAxis(new Vector3(1, 0, 0), Math.PI / 2);
    exhaust.rotateOnAxis(new Vector3(0, 0, 1), Math.PI / 2);
    exhaust.castShadow = true;
    exhaust.receiveShadow = true;
    exhaust.position.set(-13, 2, 3);

    spoilerGroup.add(spoiler);
    spoilerGroup.add(wing1);
    spoilerGroup.add(wing2);

    
    const tire1 = CreateTire();
    const tire2 = CreateTire();
    const tire3 = CreateTire();
    const tire4 = CreateTire();
    car.add(tire2);

    tire1.position.set(7, 2, 5.5);
    tire2.position.set(7, 2, -5.5);
    tire3.position.set(-7, 2, 5.5);
    tire4.position.set(-7, 2, -5.5);

    car.add(body);
    car.add(cab);
    car.add(spoilerGroup);
    car.add(scoop);
    car.add(exhaust);
    car.add(tire1);
    car.add(tire2);
    car.add(tire3);
    car.add(tire4);

    car.castShadow = true;
    car.receiveShadow = true;

    car.tick = (delta: number) => {
        tire1.tick(delta);
        tire2.tick(delta);
        tire3.tick(delta);
        tire4.tick(delta);
    }

    return car;
}

export { createCar };