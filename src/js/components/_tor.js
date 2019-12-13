var THREE = require('three');
import * as dat from 'dat.gui';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import { getMousePos } from '../utils';
import { TimelineMax } from 'gsap';

var scene = new THREE.Scene();

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

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
  new THREE.Color('hsl(240, 100%, 75%)'),
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

// var mtlLoader = new THREE.MTLLoader();
// mtlLoader.setTexturePath('/img/R2D2/');
// mtlLoader.setPath('/img/R2D2/');
// mtlLoader.load('r2-d2.mtl', function(materials) {

//   materials.preload();

//   var objLoader = new THREE.OBJLoader();
//   objLoader.setMaterials(materials);
//   objLoader.setPath('/img/R2D2/');
//   objLoader.load('r2-d2.obj', function(object) {

//     scene.add(object);
//     object.position.y -= 60;

//   });

// });
var dVector = new THREE.Vector3(0, 0, 0);
camera.lookAt(dVector);
var objLoader = new THREE.OBJLoader();
var texture = new THREE.TextureLoader().load('img/TOR/tor.jpg');
texture.needsUpdate = true; // important!
texture.wrapS = THREE.RepeatWrapping; 
texture.wrapT = THREE.RepeatWrapping; 
texture.repeat.set( 2, 2 ); 
var th;
objLoader.load('img/TOR/tor.obj', function(object) {
  th = object;
  object.translateX(200);
  object.translateZ(-300);
  object.rotateX(1);
  
  // object.material.map = texture;
  var material = new THREE.MeshLambertMaterial( { map: texture } );
  var mesh = new THREE.Mesh( object, material );
  object.castShadow = true;
  scene.add(mesh);
  console.log(texture);
  // object.position.y += 100;
  // object.position.x += 200;
  // object.position.z -= 300;
});

var animate = function() {
  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
  // th.rotation.y -= 0.02;
  // raycaster.setFromCamera(mouse, camera);

  // // calculate objects intersecting the picking ray
  // var intersects = raycaster.intersectObjects(scene.children);

  // for (var i = 0; i < intersects.length; i++) {
  //   intersects[i].object.material.color.set(0xff0000);
  // }
};

animate();
window.addEventListener('mousemove', onMouseMove, false);
