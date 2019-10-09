var THREE = require('three');
import * as dat from 'dat.gui';
import { getMousePos } from '../utils';
import { TimelineMax } from 'gsap';
import GLTFLoader from 'three-gltf-loader';

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

camera.position.y = 500;
camera.position.z = 500;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var OrbitControls = require('three-orbit-controls')(THREE);
var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(310, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

const loader = new GLTFLoader();
loader.load(
  'img/textures/steiner/scene.gltf',
  ( gltf ) => {
    // called when the resource is loaded
    gltf.scene.position.z = 200;
    scene.add( gltf.scene );
  },
  ( xhr ) => {
    // called while loading is progressing
    console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
  },
  ( error ) => {
    // called when loading has errors
    console.error( 'An error happened', error );
  },
);

var animate = function() {
  requestAnimationFrame( animate );
  // controls.update();
  renderer.render(scene, camera);
};

animate();
