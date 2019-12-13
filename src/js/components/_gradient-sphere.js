import * as THREE from 'three';
import * as dat from 'dat.gui';
import { TimelineMax } from 'gsap';
var OrbitControls = require('three-orbit-controls')(THREE);

var mesh, renderer, scene, camera, controls, sphere;
var t = 0,
  ambientFactor,
  canvas,
  textureImage;

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer(); //Doesnt Work
  //    renderer = new THREE.CanvasRenderer();  //Works
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.physicallyBasedShading = true;
  document.body.appendChild(renderer.domElement);

  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(20, 20, 20);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.rotateSpeed = 0.25;

  // axes
  scene.add(new THREE.AxisHelper(20));

  // geometry
  // var geometry = new THREE.CubeGeometry( 1,1,1 );
  var geometry = new THREE.TorusGeometry( 10, 4, 8, 200, 5 );
  // var geometry = new THREE.SphereGeometry(2, 32, 64);
  // for ( var i = 0; i < geometry.faces.length; i ++ ) {
  //   geometry.faces[ i ].color.setHex( Math.random() * 0xffffff );
  // }
  // image
  var texture = new THREE.Texture(generateTexture());
  textureImage = texture.image;

  // material texture
  var texture = new THREE.Texture(generateTexture('#F00', '#fef057'));
  texture.needsUpdate = true; // important!

  // material
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    overdraw: 0.5,
    side: THREE.DoubleSide
    // wireframe: true
  });
  // var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );
  // mesh
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

function generateTexture(color_1 = '#f153e2', color_2 = '#fef057') {
  var size = 512;

  // create canvas
  canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  // get context
  var context = canvas.getContext('2d');

  // draw gradient
  context.rect(0, 0, size, size);
  var gradient = context.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, color_1); // light blue
  gradient.addColorStop(1, color_2); // dark blue
  context.fillStyle = gradient;
  context.fill();

  return canvas;
}
