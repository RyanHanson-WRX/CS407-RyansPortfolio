import { BufferGeometry, SphereGeometry, Mesh, ShaderMaterial, Vector3 } from 'three';
import type { Animateable } from '../Animateable';

export class Sphere extends Mesh implements Animateable {
    private mainGeometry: BufferGeometry;
    private mainMaterial: ShaderMaterial;

    constructor(radius: number = 1.0) {
        const geometry = new SphereGeometry(radius, 64, 64);
        const material = new ShaderMaterial({
            uniforms: {
                objColor: { value: new Vector3(1.0, 0.0, 0.0) },
                xValue: { value: 1.0 },
                yValue: { value: 0.0 },
                zValue: { value: 0.0 },
                time: { value: 0.0 },
                minY: { value: Infinity},
                rippleOrigin: { value: new Vector3(0.0, 0.0, 0.0) },
                rippleTime: { value: 0.0 },
            }
        });
        super(geometry, material);
        this.mainGeometry = geometry;
        this.mainMaterial = material;
    }

    setVertexShader(vertexShader: string) {
        this.mainMaterial.vertexShader = vertexShader;
        this.mainMaterial.needsUpdate = true;
    }

    setFragmentShader(fragmentShader: string) { 
        this.mainMaterial.fragmentShader = fragmentShader;
        this.mainMaterial.needsUpdate = true;
    }

    updateUniform(name: string, value: any) {
        this.mainMaterial.uniforms[name].value = value;
        //this.mainMaterial.uniformsNeedUpdate = true;
    }

    tick(delta: number): void
    {
        // Send time to shader in a uniform
        this.mainMaterial.uniforms.time.value += delta;
        this.mainMaterial.uniformsNeedUpdate = true;
    }
    
    setWireframe(value: boolean) {
        this.mainMaterial.wireframe = value;
    }
}
