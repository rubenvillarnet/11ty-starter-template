import $ from 'jquery';

const currentPath = location.pathname;

$('.nav li a').each(function () {
  const $this = $(this);
  if ($this.attr('href') === currentPath) {
    $this.addClass('active');
  }
});
