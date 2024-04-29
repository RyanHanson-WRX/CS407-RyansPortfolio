import { BoxGeometry, Mesh, MeshStandardMaterial, Vector3, MathUtils } from 'three';

class CustomMesh extends Mesh {
    tick: (delta: number) => void = (delta: number) => {
        // Do nothing by default
    };
}

function CreateTire()
{
    const tireGeometry = new BoxGeometry(4, 4, 2);
    const tireMaterial = new MeshStandardMaterial({color: 0x000000});
    const tire = new CustomMesh(tireGeometry, tireMaterial);
    tire.castShadow = true;
    tire.receiveShadow = true;

    let radiansPerSec = MathUtils.degToRad(45);
    tire.tick = (delta: number) => {
        tire.rotateOnAxis(new Vector3(0,0,-1),(radiansPerSec / delta));
    };
    return tire;
}


export { CreateTire };