import { Curtains } from 'curtainsjs';
import { TweenMax } from 'gsap';

const vertexShader = `
			#ifdef GL_ES
			precision mediump float;
			#endif

			// those are the mandatory attributes that the lib sets
			attribute vec3 aVertexPosition;
			attribute vec2 aTextureCoord;

			// those are mandatory uniforms that the lib sets and that contain our model view and projection matrix
			uniform mat4 uMVMatrix;
			uniform mat4 uPMatrix;

			// if you want to pass your vertex and texture coords to the fragment shader
			varying vec3 vVertexPosition;
			varying vec2 vTextureCoord;

			void main() {
				vec3 vertexPosition = aVertexPosition;

				gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

				// set the varyings
				vTextureCoord = aTextureCoord;
				vVertexPosition = vertexPosition;
			}`;

// const fragmentShader = `
// 			#ifdef GL_ES
// 			precision mediump float;
// 			#endif

// 			// get our varyings
// 			varying vec3 vVertexPosition;
// 			varying vec2 vTextureCoord;

// 			// the uniform we declared inside our javascript
// 			uniform float uTime;

// 			// our texture sampler (default name, to use a different name please refer to the documentation)
// 			uniform sampler2D uSampler0;

// 			void main() {
// 				vec2 textureCoord = vec2(vTextureCoord.x, vTextureCoord.y);

// 				// displace our pixels along the X axis based on our time uniform
// 				// textures coords are ranging from 0.0 to 1.0 on both axis
// 				textureCoord.x += sin(textureCoord.y * 25.0) * cos(textureCoord.x * 25.0) * (cos(uTime / 50.0)) / 25.0;

// 				gl_FragColor = texture2D(uSampler0, textureCoord);
// 			}
// `;

// var vertexShader = `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//         }
//     `;

const fragmentShader = `
				#ifdef GL_ES
				precision mediump float;
				#endif

        // varying vec2 vUv;

        uniform sampler2D texture;
        uniform sampler2D texture2;
				uniform sampler2D disp;
				
        uniform float dispFactor;
				uniform float effectFactor;
				
				// FROM CURTAINS				
				varying vec3 vVertexPosition;
				varying vec2 vTextureCoord;

        float random (vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
        }

        void main() {

            vec4 disp = texture2D(disp, vTextureCoord);

            vec2 distortedPosition = vec2(vTextureCoord.x + dispFactor * (disp.r*effectFactor), vTextureCoord.y);
            // vec2 distortedPosition2 = vec2(vTextureCoord.x, vTextureCoord.y - (1.0 - dispFactor) * (disp.g*effectFactor));
            vec2 distortedPosition2 = vec2(vTextureCoord.x - (1.0 - dispFactor) * (disp.g*effectFactor), vTextureCoord.y);

            vec4 _texture = texture2D(texture, distortedPosition);
            vec4 _texture2 = texture2D(texture2, distortedPosition2);

            vec4 finalTexture = mix(_texture, _texture2, dispFactor);

            gl_FragColor = finalTexture;
            // gl_FragColor = disp;
        }
    `;

window.onload = function() {
  // get our canvas wrapper
  var canvasContainer = document.getElementById('canvas');

  // set up our WebGL context and append the canvas to our wrapper
  var webGLCurtain = new Curtains('canvas');

  // get our plane element
  var planeElements = document.querySelectorAll('.plane');

  // set our initial parameters (basic uniforms)
  var params = {
    vertexShader: vertexShader, // our vertex shader ID
    fragmentShader: fragmentShader, // our framgent shader ID
    uniforms: {
      time: {
        name: 'uTime', // uniform name that will be passed to our shaders
        type: '1f', // this means our uniform is a float
        value: 0
      },
      effectFactor: { name: 'effectFactor', type: '1f', value: 2.0 },
      dispFactor: { name: 'dispFactor', type: '1f', value: 0.0 }
    }
  };

  // create our plane mesh
  [...planeElements].forEach(_el => {
    var el = _el;
    var plane = webGLCurtain.addPlane(_el, params);
    plane.onReady(() => {
      el.addEventListener('mouseenter', function(e) {
        TweenMax.to(plane.uniforms.dispFactor, 1, {
          value: 1
        });
      });
      el.addEventListener('mouseleave', function(e) {
        TweenMax.to(plane.uniforms.dispFactor, 1, {
          value: 0
        });
      });
    });
  });
  // var plane =

  // set up our basic methods
  // plane.onRender(function() {
  //   // fired at each requestAnimationFrame call
  //   plane.uniforms.time.value++; // update our time uniform value
  // });
};
