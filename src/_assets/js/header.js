import $ from 'jquery';

const currentPath = location.pathname;

$('.navbar-nav li a').each(function () {
  const $this = $(this);
  if ($this.attr('href') === currentPath) {
    $this.addClass('active');
  }
});

$('.hamburger').click(function () {
  $(this).toggleClass('is-active');
});
