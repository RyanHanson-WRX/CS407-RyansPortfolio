import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/Addons.js';
import { MeshBasicMaterial, Mesh } from 'three';

function CreateText(content: string): Promise<Mesh>{
    return new Promise((resolve, reject) => {
        let loadedFont: any = undefined;
        let text: any;
        const loader = new FontLoader();
        loader.load('/assets/fonts/helvetiker_regular.typeface.json', (font) => {
            loadedFont = font;
            const geometry = new TextGeometry(content, {
                font: loadedFont,
                size: 7,
                depth: 0,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0,
                bevelSize: 0.5,
                bevelOffset: 0,
                bevelSegments: 0
            });
            const material = new MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true});
            text = new Mesh(geometry, material);
            resolve(text);
        }, undefined, reject);
    });
}

export { CreateText };

