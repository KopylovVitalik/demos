import * as THREE from 'three';
import * as dat from 'dat.gui';
import { TimelineMax } from 'gsap';
var OrbitControls = require('three-orbit-controls')(THREE);

let camera, scene, renderer, cube;

function init() {
  // Init scene
  scene = new THREE.Scene();

  // Init camera (PerspectiveCamera)
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // Init renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });

  // Set size (whole window)
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Render to canvas element
  document.body.appendChild(renderer.domElement);

  // Init BoxGeometry object (rectangular cuboid)
  const geometry = new THREE.BoxGeometry(3, 3, 3);

  // Create material with color
  // const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });

  // Add texture -
  const texture = new THREE.TextureLoader().load('img/cube.jpg');

  // Create material with texture
  const material = new THREE.MeshBasicMaterial({ map: texture });

  // Create mesh with geo and material
  cube = new THREE.Mesh(geometry, material);
  // Add to scene
  scene.add(cube);

  // Position camera
  camera.position.z = 12;

  var controls = new OrbitControls(camera, renderer.domElement);
  // controls.dispose();
  // controls.update();
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.rotateSpeed = 0.25;
  // controls.addEventListener( 'change', animate );
}

// Draw the scene every time the screen is refreshed
function animate() {
  requestAnimationFrame(animate);

  // Rotate cube (Change values to change speed)
  // cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

function onWindowResize() {
  // Camera frustum aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  // After making changes to aspect
  camera.updateProjectionMatrix();
  // Reset size
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const container = document.querySelector('#cube-container');

if (container) {
  window.addEventListener('resize', onWindowResize, false);
  init();
  animate();
}
// $('window').on('mouseenter', () => controls.update());
