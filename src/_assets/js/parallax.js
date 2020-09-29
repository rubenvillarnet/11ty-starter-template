const simpleParallax = require('simple-parallax-js');

var image = document.getElementsByClassName('parallax-image');
new simpleParallax(image, {
  scale: 1.5,
});
