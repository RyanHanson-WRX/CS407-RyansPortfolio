import type { Camera } from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { Vector3 } from 'three';
import { Euler } from 'three';

export class PointerControls {
    private controls: PointerLockControls;
    private moveForward: boolean;
    private moveBackward: boolean;
    private moveLeft: boolean;
    private moveRight: boolean;
    private velocity: Vector3;
    private direction: Vector3;
    private speed: number;
    private camera: Camera;
    private domElement: HTMLElement | undefined;
    private sensitivity: number;
    

    constructor(camera: Camera, domElement: HTMLElement | undefined) {
        this.controls = new PointerLockControls(camera, domElement);
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.velocity = new Vector3();
        this.direction = new Vector3();
        this.speed = 200;
        this.camera = camera;
        this.domElement = domElement;
        this.sensitivity = 0.002;
        this.domElement!.addEventListener('mousedown', (event: MouseEvent) => this.onMouseDown(event), false);
        this.domElement!.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event), false);
    }

    onMouseDown(event: MouseEvent) {
        this.domElement!.requestPointerLock = this.domElement!.requestPointerLock || this.domElement!.requestPointerLock;
        this.domElement!.requestPointerLock();
    }

    onMouseMove(event: MouseEvent) {
        if (this.camera) {
            const movementX = event.movementX || 0;
            const movementY = event.movementY || 0;
    
            const euler = new Euler(0, 0, 0, 'YXZ');
    
            euler.setFromQuaternion(this.camera.quaternion);
    
            euler.y -= movementX * this.sensitivity;
            euler.x -= movementY * this.sensitivity;
    
            euler.x = Math.max(- Math.PI / 2, Math.min(Math.PI / 2, euler.x));
    
            this.camera.quaternion.setFromEuler(euler);
        }
    }

    update(delta: any) {
        this.velocity.x -= this.velocity.x * 10.0 * delta;
        this.velocity.z -= this.velocity.z * 10.0 * delta;
    
        this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
        this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
    
        if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * this.speed * delta;
        if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * this.speed * delta;
    
        this.direction.normalize();
    
        const direction = new Vector3();
        this.camera.getWorldDirection(direction);
        direction.y = 0;
    
        // Forward/backward movement
        const forward = direction.clone().multiplyScalar(-this.velocity.z * delta);
        this.camera.position.add(forward);
    
        // Left/right movement
        const right = new Vector3();
        right.crossVectors(this.camera.up, direction).multiplyScalar(this.velocity.x * delta);
        this.camera.position.add(right);
    }
}