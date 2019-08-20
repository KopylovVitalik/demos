let bounsingBall = sk => {
  var x = 50;
  var speed = 3;
  var width = 400;

  sk.setup = () => {
    sk.createCanvas(400, 400);
  };

  sk.draw = () => {
    sk.background(120);
    sk.stroke(255);
    sk.strokeWeight(10);
    sk.noFill();
    sk.ellipse(x, 100, 50, 50);
    // sk.print('WORKS');

    if (x > width - 25 || x < 25) {
      speed = -1 * speed;
    }

    x = x + speed;
  };
};

export default bounsingBall;
