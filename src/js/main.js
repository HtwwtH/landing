
$(function () {
  // click burger button
  $('#showMobileMenu').click(function () {
    if ($(".header__menu-mobile").css('left') == '0px')
      $(".header__menu-mobile").animate({ left: '-280px' }, 600);
    else
      $(".header__menu-mobile").animate({ left: '0' }, 600);
  })

  // click search button on mobile
  $('#showMobileSearch').click(function () {
    $(".header__form-inner_mobile").slideToggle();
  })

  // выпадающие меню в хэдере
  var dropdown = $('.dropdown');
  dropdown.each(function () {
    $(this).mouseenter(function () {
      if ($(window).width() >= '1200') {
        $(this).find('.dropdown__menu').slideDown();
      }
    })
    $(this).find('.dropdown-wrapper').mouseleave(function (e) {
      if ((e.relatedTarget.className).indexOf('dropdown__menu') == -1)
        $('.dropdown__menu').slideUp();
    });
    $('.dropdown__menu').mouseleave(function (e) {
      if ((e.relatedTarget.className).indexOf('dropdown-wrapper') == -1)
        $('.dropdown__menu').slideUp();
    })
  })

});


