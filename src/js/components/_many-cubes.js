import * as THREE from 'three';
import * as dat from 'dat.gui';
import { TimelineMax } from 'gsap';
var OrbitControls = require('three-orbit-controls')(THREE);
import ScrollOut from 'scroll-out';

let camera, scene, renderer, cube, light, light1, controls;
let cubes = [];
const cubesNumber = 2000;

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

  for (let i = 0; i < cubesNumber; i++) {
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    // const material = new THREE.MeshNormalMaterial();
    let material = new THREE.MeshPhongMaterial({
      shininess: 100,
      transparent: true,
      opacity: 0.85
    });
    cube = new THREE.Mesh(geometry, material);
    const pos = randomSpherePoint(0, 0, 0, 100);
    const [x, y, z] = pos;
    // cube.position.set(
    //   Math.random() * 50,
    //   Math.random() * 50,
    //   Math.random() * 50
    // );
    cube.lookAt(0, 0, 0);
    cube.position.set(x, y, z);
    // Create material with color
    // const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });

    // Create mesh with geo and material

    // Add to scene
    scene.add(cube);
    cubes.push(cube);
  }
  // LIGHT

  light1 = new THREE.AmbientLight(0xffffff, 0.5);
  light = new THREE.PointLight(0xff00ff, 0.5);
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
  cubes.forEach(el => {
    // el.rotation.x += 0.01;
    // el.rotation.y += 0.01;
    // el.rotation.z += 0.01;
  });
  light.position.x = 50 * Math.sin(Date.now() / 240);
  light.position.y = 50 * Math.cos(Date.now() / 240);
  light.position.z = 50 * Math.cos(Date.now() / 240);
  // Rotate cube (Change values to change speed)
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // controls.update();
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

const container = document.querySelector('#cubes-container');

if (container) {
  window.addEventListener('resize', onWindowResize, false);
  init();
  animate();
}
// $('window').on('mouseenter', () => controls.update());

function randomSpherePoint(x0, y0, z0, radius) {
  var u = Math.random();
  var v = Math.random();
  var theta = 2 * Math.PI * u;
  var phi = Math.acos(2 * v - 1);
  var x = x0 + radius * Math.sin(phi) * Math.cos(theta);
  var y = y0 + radius * Math.sin(phi) * Math.sin(theta);
  var z = z0 + radius * Math.cos(phi);
  return [x, y, z];
}

var projector = new THREE.Projector();
var mouse = {};

//All Clickable Objects
var targetList = [];

// document.addEventListener('mousedown', onDocumentMouseDown, false);
// document.addEventListener('mousemove', onDocumentMouseMove, false);

// function onDocumentMouseDown(event) {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//   // find intersections
//   var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
//   projector.unprojectVector(vector, camera);
//   var ray = new THREE.Raycaster(
//     camera.position,
//     vector.sub(camera.position).normalize()
//   );

//   var intersects = ray.intersectObjects(targetList);

//   if (intersects.length > 0) {
//     clicker(intersects[0].object);
//   }
// }

// function onDocumentMouseMove(event) {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//   // find intersections
//   var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
//   projector.unprojectVector(vector, camera);
//   var ray = new THREE.Raycaster(
//     camera.position,
//     vector.sub(camera.position).normalize()
//   );

//   var intersects = ray.intersectObjects(targetList);

//   if (intersects.length > 0) {
//     mover(intersects[0].object);
//   }
// }

document.addEventListener('mousedown', shuffleCubes, false);

function shuffleCubes() {
  cubes.forEach(el => {
    const pos = randomSpherePoint(0, 0, 0, 100);
    const [x, y, z] = pos;
    el.position.set(0, 0, 0);
    // reposition(el, pos);
    el.position.set(x, y, z);
    // requestAnimationFrame(reposition(el, pos));
  });
}

// function reposition(el, pos) {
//   // requestAnimationFrame(reposition(el, pos));
//   const [x, y, z] = pos;
//   if (el.position.x < x) {
//     el.position.x += 1;
//   }
//   if (el.position.y < y) {
//     el.position.y += 1;
//   }
//   if (el.position.z < x) {
//     el.position.z += 1;
//   }
// }

// ScrollOut({
//   cssProps: {
//     offsetY: true,
//     viewportY: true
//   },
//   onShown: function(element, ctx, scrollingElement) {
//     /* Triggered when an element is shown */
//   },
//   onHidden: function(element, ctx, scrollingElement) {
//     /* Triggered when an element is hidden */
//   },
//   onChange: function(element, ctx, scrollingElement) {
//     // console.log(ctx.intersectY, ctx.viewportY);
//     console.log(ctx);
//   }
// });
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
    console.log(scroll);
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
watchViewport(updateValues);
