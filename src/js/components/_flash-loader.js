var THREE = require('three');
import * as dat from 'dat.gui';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import { getMousePos } from '../utils';
import { TimelineMax } from 'gsap';

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

var loader = new THREE.OBJLoader();

// load a resource
loader.load(
  // resource URL
  'img/flash.obj',
  // called when resource is loaded
  function(object) {
    object.position.y = -95;
    scene.add(object);
    var texture = new THREE.TextureLoader().load(
      './img/flash_pattern.png',
      function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(10, 10);
      }
    );

    object.traverse(function(child) {
      // aka setTexture
      if (child instanceof THREE.Mesh) {
        child.material.map = texture;
      }
    });
    object.castShadow = true;
    scene.add(object);
   
  }
);

var animate = function() {
  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
};

animate();
