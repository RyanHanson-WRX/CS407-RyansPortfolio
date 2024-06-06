import { FontLoader } from 'three/examples/jsm/Addons.js';

function LoadFont() {
    return new Promise((resolve, reject) => {
        let loadedFont: any = undefined;
        let text: any;
        const loader = new FontLoader();
        loader.load('/assets/fonts/helvetiker_regular.typeface.json', (font) => {
            loadedFont = font;
            resolve(loadedFont);
        }, undefined, reject);
    });
}

export { LoadFont };

