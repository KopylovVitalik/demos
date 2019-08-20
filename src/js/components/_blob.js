import anime from 'animejs';

const blob = document.querySelector('.js-blob');

if (blob) {
  blob.addEventListener('click', animateBlob);
}

function animateBlob() {
  console.log('blob');
  anime({
    // targets: ['.js-blob path', 'feTurbulence', 'feDisplacementMap'],
    targets: ['.js-blob path'],
    d: [
      // {
      //   value:
      //     'M115.6,-120C145.5,-85.8,162.2,-42.9,161.8,-0.5C161.3,42,143.6,83.9,113.7,133.7C83.9,183.6,42,241.3,2.5,238.8C-37,236.3,-74,173.7,-122.7,123.8C-171.3,74,-231.7,37,-232.9,-1.2C-234,-39.4,-176.1,-78.7,-127.4,-112.9C-78.7,-147.1,-39.4,-176,1.8,-177.8C42.9,-179.6,85.8,-154.1,115.6,-120Z'
      // },
      {
        value:
          'M129.4,-127.4C155.6,-103.2,156.3,-51.6,158.1,1.8C159.8,55.2,162.6,110.3,136.5,130.3C110.3,150.3,55.2,135.2,-1.5,136.7C-58.2,138.2,-116.4,156.4,-156.3,136.4C-196.1,116.4,-217.6,58.2,-217.4,0.1C-217.3,-58,-195.6,-116,-155.8,-140.1C-116,-164.3,-58,-154.6,-3.2,-151.5C51.6,-148.3,103.2,-151.6,129.4,-127.4Z'
      },
      {
        value:
          'M145.4,-137.2C181.4,-109.4,198.7,-54.7,200.7,2C202.7,58.7,189.4,117.4,153.4,165.2C117.4,213,58.7,250,-4.8,254.9C-68.4,259.7,-136.7,232.4,-178.9,184.5C-221,136.7,-237,68.4,-226.3,10.7C-215.6,-46.9,-178.1,-93.8,-136,-121.6C-93.8,-149.5,-46.9,-158.2,3.9,-162.1C54.7,-166,109.4,-165,145.4,-137.2Z'
      },
      {
        value:
          'M127.8,-132.1C152.8,-102.8,151.4,-51.4,148.2,-3.2C145,45,140,90,115,113C90,136,45,137,8.4,128.7C-28.3,120.3,-56.6,102.6,-93.1,79.6C-129.6,56.6,-174.3,28.3,-182.4,-8.1C-190.5,-44.5,-162.1,-89.1,-125.6,-118.4C-89.1,-147.8,-44.5,-161.9,3.4,-165.3C51.4,-168.7,102.8,-161.4,127.8,-132.1Z'
      }
    ],
    stroke: [
      // { value: '#FE840E' },
      // { value: '#00F', duration: 0, delay: 1000 },
      // { value: '#FF0', duration: 0, delay: 1000 },
      // { value: '#F00', duration: 0, delay: 1000 }
      { value: '#00F' },
      { value: '#FF0' },
      { value: '#F00' }
      // { value: '#ff03d4', duration: 0, delay: 1000 }
    ],
    fill: [
      // { value: '#FE840E' },
      // { value: '#00F', duration: 0, delay: 1000 },
      // { value: '#FF0', duration: 0, delay: 1000 },
      // { value: '#F00', duration: 0, delay: 1000 }
      { value: '#0FF' },
      { value: '#F00' },
      { value: '#FFF' }
      // { value: '#ff03d4', duration: 0, delay: 1000 }
    ],
    // baseFrequency: 0,
    // scale: 1,
    easing: 'linear',
    duration: 15000,
    loop: true,
    direction: 'alternate',
    loopComplete: function(anim) {
      console.log('loop completed');
    },
    loopBegin: function(anim) {
      console.log('loop begins');
    },
    change: function(anim) {
      console.log(anim.progress);
    }
  });
}

// TweenLite.to("#path",1,{attr:{d:'M50,50 100,0 100,100 Z'}});
