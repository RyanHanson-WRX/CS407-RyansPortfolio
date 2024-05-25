import { PlaneGeometry } from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

export function createMirror()
{
    const mirrorOptions = {
        clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0x889999,
        multisample: 4,
    };

    const mirrorGeometry = new PlaneGeometry(100, 100);
    const mirror = new Reflector(mirrorGeometry, mirrorOptions);

    return mirror;
}