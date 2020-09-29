import $ from 'jquery';

$(function () {
  const popUps = $('.popup-link');
  if (popUps.length) {
    popUps.magnificPopup({
      type: 'image',
      gallery: {
        enabled: true,
        tPrev: 'Anterior',
        tNext: 'Siguiente',
        tCounter: '%curr% de %total%',
      },
    });
  }
});
