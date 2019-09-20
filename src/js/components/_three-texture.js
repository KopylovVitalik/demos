// import * as THREE from 'three';

var THREE = require('three');
import * as dat from 'dat.gui';
// import { GLTFLoader } from 'three/examples/js/loaders/GLTFLoader';
// import { OBJLoader } from 'three/examples/js/loaders/OBJLoader';
// import { MTLLoader } from 'three/examples/js/loaders/MTLLoader';
// var OBJLoader = require('three/examples/js/loaders/OBJLoader2');
// var MTLLoader = require('three/examples/js/loaders/MTLLoader');

import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import { getMousePos } from '../utils';
import { TimelineMax } from 'gsap';

if (document.getElementById('texture-container')) {
  var OrbitControls = require('three-orbit-controls')(THREE);

  let camera, scene, renderer, cube, light, light1 ;

  function init() {
    // Init scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x8fbcd4);
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
    const geometry = new THREE.BoxGeometry(3, 5, 3);
    var loader = new THREE.OBJLoader();

    // load a resource
    loader.load('img/flash_thund.obj', function(object) {
      object.position.z -= 170;
      object.position.y -= 500;
      object.position.x -= 500;
      // object.rotation.x = 250;
      scene.add(object);
      
      console.log(object);
    });
    // Create material with color
    // const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });

    // Add texture -
    // const texture = new THREE.TextureLoader().load('img/cube.jpg');

    // // Create material with texture
    // const material = new THREE.MeshBasicMaterial({ map: texture });

    // // Create mesh with geo and material
    // cube = new THREE.Mesh(geometry, material);
    // Add to scene
    // scene.add(cube);

    // Position camera
    camera.position.z = 12;

    var controls = new OrbitControls(camera, renderer.domElement);
    // controls.dispose();
    // controls.update();
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.rotateSpeed = 0.25;
    // controls.addEventListener( 'change', animate );

    // var objLoader = new THREE.OBJLoader();
    // objLoader.setPath('/img/texure');
    // var mtlLoader = new THREE.MTLLoader();
    // mtlLoader.setPath('/img/texure');

    // new Promise(resolve => mtlLoader.load());
    // let mtlLoader = new MTLLoader();

    // let objLoader = new OBJLoader();

    // mtlLoader.load(
    //   './img/textures/notebook/Lowpoly_Notebook_2.mtl',
    //   materials => {
    //     materials.preload();
    //     objLoader.setMaterials(materials);
    //     objLoader.load(
    //       './img/textures/notebook/Lowpoly_Notebook_2.obj',
    //       object => {
    //         scene.add(object);
    //       }
    //     );
    //   }
    // );
    light1 = new THREE.AmbientLight(0xffffff, 0.7);
    light = new THREE.PointLight(0xffffff, 1);
    light.position.set(-window.innerWidth / 2, window.innerHeight / 2, 500);
    scene.add(light, light1);
  }

  // Draw the scene every time the screen is refreshed
  function animate() {
    requestAnimationFrame(animate);
    light.position.x = 50 * Math.sin(Date.now() / 240);
    light.position.y = 50 * Math.cos(Date.now() / 240);
    light.position.z = 50 * Math.cos(Date.now() / 240);
    // Rotate cube (Change values to change speed)
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

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

  window.addEventListener('resize', onWindowResize, false);

  const container = document.querySelector('#texture-container');

  if (container) {
    init();
    animate();
  }
  // $('window').on('mouseenter', () => controls.update());
  window.addEventListener('mousemove', ev => console.log(getMousePos(ev)));
}
