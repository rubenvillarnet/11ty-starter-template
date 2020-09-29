import $ from 'jquery';
import Flickity from 'flickity';
import jQueryBridget from 'jquery-bridget';

// make Flickity a jQuery plugin
Flickity.setJQuery($);
jQueryBridget('flickity', Flickity, $);

$('.example-carousel').flickity({
  // options
  cellAlign: 'left',
  contain: true,
});
