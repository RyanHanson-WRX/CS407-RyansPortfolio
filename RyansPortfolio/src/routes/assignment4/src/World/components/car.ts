import { BoxGeometry, Mesh, MeshStandardMaterial, Group, CylinderGeometry, MeshPhysicalMaterial, Vector3, AnimationMixer, AnimationClip, NumberKeyframeTrack, LoopOnce, TextureLoader, SpriteMaterial, Sprite } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';

interface CustomCar extends Group {
    tickRight: (delta: number) => void;
    tickLeft: (delta: number) => void;
    tickExhaust: (delta: number) => void;
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

    const body = new Mesh(bodyGeometry, bodyMaterial);
    const cab = new Mesh(cabGeometry, cabMaterial);
    const spoiler = new Mesh(spoilerGeometry, spoilerMaterial);
    const wing1 = new Mesh(spoilerWingGeometry, spoilerWingMaterial);
    const wing2 = new Mesh(spoilerWingGeometry, spoilerWingMaterial);
    const scoop = new Mesh(scoopGeometry, scoopMaterial);
    const exhaust = new Mesh(exhaustGeometry, exhaustMaterial);

    const textureLoader = new TextureLoader();
    const flameTexture = textureLoader.load('src/routes/assignment4/src/World/components/flame.png'); // replace with your flame texture path

    const flameMaterial = new SpriteMaterial({ map: flameTexture, color: 0xffffff });
    const flameSprite = new Sprite(flameMaterial);

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
    exhaust.add(flameSprite);
    flameSprite.position.set(0, 1, -2);
    flameSprite.scale.set(0, 0, 0);

    spoilerGroup.add(spoiler);
    spoilerGroup.add(wing1);
    spoilerGroup.add(wing2);

    car.add(body);
    car.add(cab);
    car.add(spoilerGroup);
    car.add(scoop);
    car.add(exhaust);

    car.castShadow = true;
    car.receiveShadow = true;

    car.tickRight = (delta: number) => {
        let radiansPerSec = degToRad(270);
        car.rotateOnAxis(new Vector3(0, -1, 0), radiansPerSec * delta);
    }

    car.tickLeft = (delta: number) => {
        let radiansPerSec = degToRad(270);
        car.rotateOnAxis(new Vector3(0, 1, 0), radiansPerSec * delta);
    }

    car.tickExhaust = (delta: number) => {
        flameSprite.scale.set(5, 5, 5);
        setTimeout(() => {
            flameSprite.scale.set(0, 0, 0);
        }, 200);
    }

    return car;
}

export { createCar };