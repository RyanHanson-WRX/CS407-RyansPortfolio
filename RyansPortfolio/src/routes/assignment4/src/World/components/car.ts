import { BoxGeometry, Mesh, MeshStandardMaterial, Group, CylinderGeometry, MeshPhysicalMaterial, Vector2, Vector3, CanvasTexture, TextureLoader, SpriteMaterial, Sprite } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import { subVectors, addVectors } from '../systems/vectorUtil';

interface CustomCar extends Group {
    tickRight: (delta: number) => void;
    tickLeft: (delta: number) => void;
    tickExhaust: (delta: number) => void;
    mainVector: Vector3;
    rearAxle: Vector3;
    frontAxle: Vector3;
}

function createCar() {

    const car: CustomCar = new Group() as CustomCar;
    const spoilerGroup = new Group();

    const carFrontTexture = getCarFrontTexture();
    const carRightTexture = getCarSideTexture();
    const carLeftTexture = getCarSideTexture();
    carLeftTexture.center = new Vector2(0.5, 0.5);
    carLeftTexture.rotation = Math.PI;
    carLeftTexture.flipY = false;
    const headLightTexture = getHeadLightTexture();


    const bodyGeometry = new BoxGeometry(25, 5, 10);
    const bodyMaterial = new MeshStandardMaterial({color: 0xded9d9});
    const cabGeometry = new BoxGeometry(11, 4, 8);
    const cabMaterial = new MeshStandardMaterial({color: 0x000000});
    const spoilerGeometry = new BoxGeometry(5, 0.5, 10);
    const spoilerMaterial = new MeshStandardMaterial({color: 0xded9d9});
    const spoilerWingGeometry = new BoxGeometry(1, 1.5, 1);
    const spoilerWingMaterial = new MeshStandardMaterial({color: 0x000000 });
    const scoopGeometry = new BoxGeometry(2, 1, 4);
    const scoopMaterial = new MeshStandardMaterial({color: 0x000000 });
    const exhaustGeometry = new CylinderGeometry(0.5, 0.5, 1, 32);
    const exhaustMaterial = new MeshPhysicalMaterial({color: 0x1900ff, side: 2, metalness: 0.5, roughness: 0.5, reflectivity: 0.5, clearcoat: 0.5, clearcoatRoughness: 0.5});

    const body = new Mesh(bodyGeometry, [
        new MeshStandardMaterial({map: headLightTexture}),
        bodyMaterial,
        bodyMaterial,
        bodyMaterial,
        bodyMaterial,
        bodyMaterial]);
    const cab = new Mesh(cabGeometry, [
        new MeshStandardMaterial({map: carFrontTexture}),
        new MeshStandardMaterial({map: carFrontTexture}),
        cabMaterial,
        cabMaterial,
        new MeshStandardMaterial({map: carRightTexture}),
        new MeshStandardMaterial({map: carLeftTexture})
    ]);
    const spoiler = new Mesh(spoilerGeometry, spoilerMaterial);
    const wing1 = new Mesh(spoilerWingGeometry, spoilerWingMaterial);
    const wing2 = new Mesh(spoilerWingGeometry, spoilerWingMaterial);
    const scoop = new Mesh(scoopGeometry, scoopMaterial);
    const exhaust = new Mesh(exhaustGeometry, exhaustMaterial);

    const textureLoader = new TextureLoader();
    const flameTexture = textureLoader.load('src/routes/assignment4/src/World/components/flame.png'); // replace with your flame texture path

    const flameMaterial = new SpriteMaterial({ map: flameTexture, color: 0xffffff });
    const flameSprite = new Sprite(flameMaterial);

    // Make vector, calc wheels based off vector
    body.castShadow = true;
    body.receiveShadow = true;
    car.mainVector = new Vector3(0, 3, 0); //new Vector3(-7, 0, 0);
    car.rearAxle = subVectors(car.mainVector, new Vector3(7, 1, 0));
    car.frontAxle = addVectors(car.mainVector, new Vector3(7, -1, 0));
    console.log(car.rearAxle);

    // body.position.set(0, 3, 0);
    body.position.set(car.mainVector.x, car.mainVector.y, car.mainVector.z);
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

function getCarFrontTexture()
{
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context!.fillStyle = "black";
    context!.fillRect(0, 0, 64, 32);

    context!.fillStyle = "#0e2433";
    context!.fillRect(8, 8, 48, 24);

    return new CanvasTexture(canvas);
}

function getCarSideTexture()
{
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context!.fillStyle = "black";
    context!.fillRect(0, 0, 128, 32);

    context!.fillStyle = "#0e2433";
    context!.fillRect(10, 8, 38, 24);
    context!.fillRect(58, 8, 60, 24);

    return new CanvasTexture(canvas);
}

function getHeadLightTexture()
{
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context!.fillStyle = "#ded9d9";
    context!.fillRect(0, 0, 64, 32);

    context!.fillStyle = "red";
    context!.beginPath();
    context!.arc(12, 8, 5, 0, Math.PI * 2);
    context!.fill();

    context!.beginPath();
    context!.arc(52, 8, 5, 0, Math.PI * 2);
    context!.fill();

    context!.fillStyle = "black";
    context!.beginPath();
    context!.arc(12, 8, 4, 0, Math.PI * 2);
    context!.fill();

    context!.beginPath();
    context!.arc(52, 8, 4, 0, Math.PI * 2);
    context!.fill();

    context!.fillStyle = "white";
    context!.beginPath();
    context!.arc(12, 8, 2, 0, Math.PI * 2);
    context!.fill();

    context!.beginPath();
    context!.arc(52, 8, 2, 0, Math.PI * 2);
    context!.fill();

    context!.fillStyle = "black";
    context!.fillRect(16, 18, 32, 12);

    context!.fillStyle = "white";
    context!.fillRect(17, 18, 1, 12);
    context!.fillRect(19, 18, 1, 12);
    context!.fillRect(21, 18, 1, 12);
    context!.fillRect(23, 18, 1, 12);
    context!.fillRect(25, 18, 1, 12);
    context!.fillRect(27, 18, 1, 12);
    context!.fillRect(29, 18, 1, 12);
    context!.fillRect(31, 18, 1, 12);
    context!.fillRect(33, 18, 1, 12);
    context!.fillRect(35, 18, 1, 12);
    context!.fillRect(37, 18, 1, 12);
    context!.fillRect(39, 18, 1, 12);
    context!.fillRect(41, 18, 1, 12);
    context!.fillRect(43, 18, 1, 12);
    context!.fillRect(45, 18, 1, 12);
    context!.fillRect(47, 18, 1, 12);

    return new CanvasTexture(canvas);
}

export { createCar };