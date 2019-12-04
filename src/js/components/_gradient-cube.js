import * as THREE from 'three';
import * as dat from 'dat.gui';
import { TimelineMax } from 'gsap';
var OrbitControls = require('three-orbit-controls')(THREE);

let camera, scene, renderer, cube, sphere, torus, material, objects;

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
  const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
  const sphereGeometry = new THREE.SphereGeometry(1, 64, 32);
  const outerSize = 1;
  const innerSize = 0.25;
  const torusGeometry = new THREE.TorusGeometry(outerSize, innerSize, 32, 64);
  // Create material with color
  // const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });

  // Add texture -
  material = new THREE.ShaderMaterial({
    // We need to pass some information down from the vertex to the fragment shader
    vertexShader: `
      varying vec2 vUv;
      void main () {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
      }
    `,
    // The vertex shader is defined as a GLSL source string
    fragmentShader: `
      // An incoming value from JavaScript
      uniform float time;
      // An incoming value from the vertex shader
      varying vec2 vUv;
      // Let's define PI constant
      #define PI 3.14

      void main () {
        vec3 color = vec3(0.0);
        
        color.r = abs(sin(vUv.x + time));
        color.g = abs(cos(vUv.y + time));
        color.b = abs(sin(vUv.y + time));
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    // The uniforms allow us to send values down into the shader
    uniforms: {
      // Here is how we define a float value
      time: { value: 0 }
    }
  });

  const gridScale = 10;
  scene.add(new THREE.GridHelper(gridScale, 10, 'hsl(0, 0%, 50%)', 'hsl(0, 0%, 70%)'));

  // Create mesh with geo and material
  cube = new THREE.Mesh(cubeGeometry, material);
  sphere = new THREE.Mesh(sphereGeometry, material);
  torus = new THREE.Mesh(torusGeometry, material);

  // sphere.scale.setScalar(0.35);
  cube.position.x = 15;
  torus.scale.setScalar(4);


  objects = new THREE.Group();
  // Add to scene
  objects.add(cube);
  objects.add(sphere);
  objects.add(torus);

  scene.add(objects);
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
  material.uniforms.time.value += 0.02;
  // Rotate cube (Change values to change speed)
  // cube.rotation.x += 0.01;
  cube.rotation.x += 0.03;
  objects.rotation.y += 0.01;

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
