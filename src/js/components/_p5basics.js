import p5 from 'p5/lib/p5.min';
import 'p5/lib/addons/p5.dom';
import bounsingBall from './p5/_bouncing-ball';

const container = document.getElementById('p5basics-container');

if (container) {
  p5animations();
}

function p5animations() {
  new p5(bounsingBall);
  new p5(bounsingBall);
  new p5(bounsingBall);
  new p5(bounsingBall);
  new p5(bounsingBall);
}
