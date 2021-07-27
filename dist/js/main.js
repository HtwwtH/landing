"use strict";

$(function () {
  // click burger button
  $('#showMobileMenu').click(function () {
    $(".header__mob-menu-content").animate({
      width: 'toggle'
    }, 600);
  }); // click search button on mobile

  $('#showMobileSearch').click(function () {
    $(".header__form-inner_mobile").slideToggle();
  }); // выпадающие меню в хэдере

  var dropdown = $('.dropdown');
  dropdown.each(function () {
    $(this).mouseenter(function () {
      if ($(window).width() >= '1200') {
        $(this).find('.dropdown__menu').slideDown();
      }
    });
    $(this).find('.dropdown-wrapper').mouseleave(function (e) {
      if (e.relatedTarget.className.indexOf('dropdown__menu') == -1) $('.dropdown__menu').slideUp();
    });
    $('.dropdown__menu').mouseleave(function (e) {
      if (e.relatedTarget.className.indexOf('dropdown-wrapper') == -1) $('.dropdown__menu').slideUp();
    });
  });
});