$(document).ready(function () {
  $('.featured-catalog__trigger').on('click', function () {
    $('body').addClass('modal-open');
    $('.mobile-filters').addClass('open');
  });

  $('.mobile-filters__close, .mobile-filters__apply').on(
    'click',
    function () {
      $('body').removeClass('modal-open');
      $('.mobile-filters').removeClass('open');
    }
  );
});
