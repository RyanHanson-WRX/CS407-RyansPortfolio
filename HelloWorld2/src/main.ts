import {
    BoxGeometry,
    CylinderGeometry,
    SphereGeometry,
    DodecahedronGeometry,
    OctahedronGeometry,
    TetrahedronGeometry,
    TorusGeometry,
    ConeGeometry,
    IcosahedronGeometry,
    TorusKnotGeometry,
    Color,
    Mesh,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    DirectionalLight,
    BasicShadowMap,
    MeshStandardMaterial,
    MeshBasicMaterial
  } from 'three';


type ShapeKey = 'Box' | 'Cylinder' | 'Sphere' | 'Dodecahedron' | 'Octahedron' | 'Tetrahedron' | 'Torus' | 'Cone' | 'Icosahedron';
type Geometry = BoxGeometry | CylinderGeometry | SphereGeometry | DodecahedronGeometry | OctahedronGeometry | TetrahedronGeometry | TorusGeometry | ConeGeometry | IcosahedronGeometry;

const ShapeDict: {[key in ShapeKey]: Geometry} = {
  'Box': new BoxGeometry(2, 2, 2),
  'Cylinder': new CylinderGeometry(2, 2, 2, 32),
  'Sphere': new SphereGeometry(2, 32, 32),
  'Dodecahedron': new DodecahedronGeometry(2, 0),
  'Octahedron': new OctahedronGeometry(2, 0),
  'Tetrahedron': new TetrahedronGeometry(2, 0),
  'Torus': new TorusGeometry(2, 0.5, 16, 100),
  'Cone': new ConeGeometry(2, 2, 32),
  'Icosahedron': new IcosahedronGeometry(2, 0),
};


export class ThreeObj
{
  shape: string;
  color: string;
  wireframe: boolean;
  animate: boolean;
  light: boolean;
  speedY: number;
  speedX: number;
  scene: Scene;
  renderer: WebGLRenderer;
  material: MeshStandardMaterial | MeshBasicMaterial;
  geometry: BoxGeometry | CylinderGeometry | SphereGeometry | DodecahedronGeometry | OctahedronGeometry | TetrahedronGeometry | TorusGeometry | ConeGeometry | IcosahedronGeometry | TorusKnotGeometry;

  constructor(shape: string, color: string, wireframe: boolean, animate: boolean)
  {
    this.shape = shape;
    this.color = color;
    this.wireframe = wireframe;
    this.animate = animate;
    this.light = false;
    this.speedY = 0.01;
    this.speedX = 0.02;
    this.scene = new Scene();
    this.renderer = new WebGLRenderer();
    this.material = new MeshBasicMaterial({ color: this.color});
    this.geometry = new BoxGeometry(2, 2, 2);
  }
}

export function CreateScene(obj: ThreeObj)
{
  const container = document.querySelector('#scene-container') as HTMLElement;

  obj.scene.background = new Color('grey');

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 100;

  const camera = new PerspectiveCamera(fov, aspect, near, far);

  camera.position.set(0, 0, 10);

  var shape = obj.shape as ShapeKey;
  obj.geometry = ShapeDict[shape];

  if (obj.wireframe)
  {
    if (obj.light) {
      obj.material = new MeshStandardMaterial({ color: obj.color, wireframe: true });
    }
    else {
      obj.material = new MeshBasicMaterial({ color: obj.color, wireframe: true });
    }
  }
  else
  {
    if (obj.light) {
      obj.material = new MeshStandardMaterial({ color: obj.color });
    }
    else {
      obj.material = new MeshBasicMaterial({ color: obj.color });
    }
  }

  const threeShape = new Mesh(obj.geometry, obj.material);

  if (obj.light)
  {
    obj.renderer.shadowMap.enabled = true;
    obj.renderer.shadowMap.type = BasicShadowMap;
    const light = new DirectionalLight(0xffffff, 5);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.position.set(0, 10, 5);
    threeShape.castShadow = true;
    threeShape.receiveShadow = true;
    obj.scene.add(light);
  }
  obj.scene.add(threeShape);

  obj.renderer.setSize(container.clientWidth, container.clientHeight);
  obj.renderer.setPixelRatio(window.devicePixelRatio);

  container.append(obj.renderer.domElement);
  obj.renderer.render(obj.scene, camera);

  if (obj.animate)
  {
    function animate()
    {
      requestAnimationFrame(animate);
      threeShape.rotation.x += obj.speedX;
      threeShape.rotation.y += obj.speedY;
      obj.renderer.render(obj.scene, camera);
    }

    animate();
  }
}

export function DeleteScene(obj: ThreeObj)
{
  if (obj.scene.children.length > 1)
  {
    obj.scene.remove(obj.scene.children[0], obj.scene.children[1]);
  }
  else
  {
    obj.scene.remove(obj.scene.children[0]);
  }
}