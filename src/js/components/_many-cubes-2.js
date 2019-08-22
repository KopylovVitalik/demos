import * as THREE from 'three';
import * as dat from 'dat.gui';
import { TimelineMax } from 'gsap';
var OrbitControls = require('three-orbit-controls')(THREE);
import { GET_RANDOM_INT, GET_RANDOM_INT_WITH_NEGATIVE, lerp } from '../utils';

let camera, scene, renderer, cube, light, light1, controls;
let cubes = [];
const cubesNumber = 100;

// FOR SCROLL
var l = 0;
var initialScrollY = 0;

function init() {
  // Init scene
  scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x000000, 0);

  // Init camera (PerspectiveCamera)
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // Init renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  // Set size (whole window)
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  // Render to canvas element
  document.body.appendChild(renderer.domElement);

  // Init BoxGeometry object (rectangular cuboid)

  const colors = [0xcccccc, 0x00ff00, 0x0000ff, 0xF0FF00, 0xccccFF, 0xFF0000];

  for (let i = 0; i < cubesNumber; i++) {
    const size = GET_RANDOM_INT(20, 50);
    const geometry = new THREE.BoxGeometry(size, size, size);
    // const material = new THREE.MeshNormalMaterial();
    const colorIndex = i === 0 ? 0 : i % 6;
    console.log(colors[colorIndex]);
    let material = new THREE.MeshLambertMaterial({
      color: colors[colorIndex]
    });
    material.blending = THREE.AdditiveBlending;
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(
      GET_RANDOM_INT_WITH_NEGATIVE(
        window.innerWidth / 4 - 100,
        window.innerWidth / 4 + 100
      ),
      GET_RANDOM_INT_WITH_NEGATIVE(
        window.innerHeight / 4 - 100,
        window.innerHeight / 4 + 100
      ),
      GET_RANDOM_INT_WITH_NEGATIVE(100, 200)
    );
    // cube.position.set(0, 0, 0);
    console.log(
      GET_RANDOM_INT(window.innerWidth / 2 - 100, window.innerWidth / 2 + 100),
      GET_RANDOM_INT(window.innerHeight / 2 - 100, window.innerHeight / 2 + 100)
    );
    // Create material with color
    // const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });

    // Create mesh with geo and material

    // Add to scene
    scene.add(cube);
    cubes.push(cube);
  }
  // LIGHT

  light1 = new THREE.AmbientLight(0xffffff, 0.7);
  light = new THREE.PointLight(0xffffff, 1);
  light.position.set(-window.innerWidth / 2, window.innerHeight / 2, 500);
  scene.add(light, light1);

  // Position camera
  camera.position.z = 420;

  // controls = new OrbitControls(camera, renderer.domElement);

  // controls.enableDamping = true;
  // controls.dampingFactor = 0.75;
  // controls.rotateSpeed = 0.25;
  // controls.addEventListener( 'change', animate );

  // var sphereGeometry = new THREE.SphereGeometry(50, 32, 32);
  // var sphereMaterial = new THREE.MeshPhongMaterial({
  //   color: 0xffffff,
  //   emissive: 0x333333
  // });
  // var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // scene.add(sphere);
}

// Draw the scene every time the screen is refreshed
function animate() {
  requestAnimationFrame(animate);
  // cubes.forEach(el => {
  //   el.rotation.x += 0.01;
  //   el.rotation.y += 0.01;
  //   el.rotation.z += 0.01;
  // });
  // light.position.x = 50 * Math.sin(Date.now() / 240);
  // light.position.y = 50 * Math.cos(Date.now() / 240);
  // light.position.z = 50 * Math.cos(Date.now() / 240);
  // Rotate cube (Change values to change speed)
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // controls.update();
  renderer.render(scene, camera);
}

function changeOnScroll() {
  cubes.forEach(el => {
    el.position.x =
      el.position.x > 0
        ? el.position.x + (0.003 * l * el.position.x) / 1000
        : el.position.x - 0.003 * l;
    el.position.y =
      el.position.y > 0
        ? el.position.y + (0.003 * l * el.position.x) / 1000
        : el.position.y - 0.003 * l;
    el.position.z =
      el.position.z > 0
        ? el.position.z - (0.003 * l * el.position.x) / 1000
        : el.position.z + 0.003 * l;
  });
}

function onWindowResize() {
  // Camera frustum aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  // After making changes to aspect
  camera.updateProjectionMatrix();
  // Reset size
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const container = document.querySelector('#cubes-container');

if (container) {
  window.addEventListener('resize', onWindowResize, false);
  init();
  animate();
}

// document.addEventListener('mousedown', shuffleCubes, false);

// function shuffleCubes() {
//   cubes.forEach(el => {
//     const pos = randomSpherePoint(0, 0, 0, 100);
//     const [x, y, z] = pos;
//     el.position.set(0, 0, 0);
//     // reposition(el, pos);
//     el.position.set(x, y, z);
//     // requestAnimationFrame(reposition(el, pos));
//   });
// }

import {
  watchViewport,
  unwatchViewport,
  getViewportState,
  recalibrateOrientation
} from 'tornis';

const updateValues = ({ size, scroll, mouse, position, orientation }) => {
  if (size.changed) {
    // do something related to size
  }

  if (scroll.changed) {
    let newScroll = scroll.top;
    const diff = newScroll - initialScrollY;
    l =
      diff > 0
        ? lerp(initialScrollY, newScroll, 0.02)
        : -1 * lerp(initialScrollY, newScroll, 0.02);
    initialScrollY = newScroll;
    console.log('works');
    changeOnScroll();
  }

  if (mouse.changed) {
    // do something related to mouse position or velocity
  }

  if (position.changed) {
    // do something related to browser window position or velocity
  }

  if (orientation.changed) {
    // do something related to device orientation
  }
};

// bind the watch function
// By default this will run the function as it is added to the watch list
setTimeout(() => watchViewport(updateValues), 1500);
