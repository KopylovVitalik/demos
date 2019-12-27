// var THREE = require('three');
// import * as dat from 'dat.gui';
// import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
// import { getMousePos } from '../utils';
// import { TimelineMax } from 'gsap';

// var scene = new THREE.Scene();

// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// camera.position.z = 200;

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// var OrbitControls = require('three-orbit-controls')(THREE);
// var controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;

// var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
// keyLight.position.set(-100, 0, 100);

// var fillLight = new THREE.DirectionalLight(new THREE.Color('#FFF'), 0.75);
// fillLight.position.set(100, 0, 100);

// var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
// backLight.position.set(100, 0, -100).normalize();

// scene.add(keyLight);
// scene.add(fillLight);
// scene.add(backLight);

// scene.background = new THREE.Color(0x8fbcd4);

// var mtlLoader = new THREE.MTLLoader();
// mtlLoader.setTexturePath('/img/TOR/');
// mtlLoader.setPath('/img/TOR/');
// mtlLoader.load('tor.mtl', function(materials) {

//   materials.preload();

//   var objLoader = new THREE.OBJLoader();
//   objLoader.setMaterials(materials);
//   objLoader.setPath('/img/TOR/');
//   objLoader.load('tor.obj', function(object) {

//     scene.add(object);
//     object.position.y -= 60;

//   });

// });

// var animate = function() {
//   requestAnimationFrame( animate );
//   // controls.update();
//   renderer.render(scene, camera);
// };

// animate();

var THREE = require('three');
import * as dat from 'dat.gui';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import { getMousePos } from '../utils';
import gsap from 'gsap';

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x8fbcd4);

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 200;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var OrbitControls = require('three-orbit-controls')(THREE);
var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(
  new THREE.Color('hsl(30, 100%, 75%)'),
  1.0
);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(
  new THREE.Color('hsl(240, 100%, 75%)'),
  0.75
);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var objects = new THREE.Group();

var loader = new THREE.OBJLoader();

var material = new THREE.ShaderMaterial({
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

// load a resource
loader.load('img/TOR/tor.obj', function(obj) {
  obj.scale.setScalar(0.3);
  obj.traverse(function(child) {
    if (child instanceof THREE.Mesh) {
      child.material = material;
    }
  });
  objects.add(obj);
});

scene.add(objects);

var animate = function() {
  requestAnimationFrame(animate);
  // controls.update();

  renderer.render(scene, camera);
};

// var tl = gsap.timeline();

gsap.to(objects.rotation, {
  x: '+=10',
  z: 10,
  yoyo: true,
  repeat: -1,
  duration: 5,
  onComplete: () => {
    console.log('BODY');
  }
});
gsap.to(objects.position, {
  x: 100,
  y: 50,
  yoyo: true,
  repeat: -1,
  duration: 5,
  onComplete: () => {
    console.log('BODY');
  }
});

animate();
