"use strict";

$(function () {
  // click burger button
  $('#showMobileMenu').click(function () {
    if ($(".header__menu-mobile").css('left') == '0px') $(".header__menu-mobile").animate({
      left: '-280px'
    }, 600);else $(".header__menu-mobile").animate({
      left: '0'
    }, 600);
  }); // click search button on mobile

  $('#showMobileSearch').click(function () {
    $(".header__form-inner_mobile").slideToggle();
  }); // выпадающие меню в хэдере

  var dropdown = $('.dropdown');
  dropdown.each(function () {
    $(this).mouseenter(function () {
      if ($(window).width() >= '1200') {
        $(this).find('.dropdown__menu').fadeIn(100);
      }
    });
    $(this).find('.dropdown-wrapper').mouseleave(function (e) {
      if (e.relatedTarget.className.indexOf('dropdown__menu') == -1) $('.dropdown__menu').fadeOut(100);
    });
    $('.dropdown__menu').mouseleave(function (e) {
      if (e.relatedTarget.className.indexOf('dropdown-wrapper') == -1) $('.dropdown__menu').fadeOut(100);
    });
  }); // fix header on scroll on pc

  if ($(document).width() >= 1200) {
    var lastScrollTop = 0;
    var header = $('.header__main');
    var headerOffset = header.offset().top;
    $(window).scroll(function (event) {
      var st = $(this).scrollTop();

      if (st >= headerOffset) {
        header.addClass('fixed');
      } else if (header.hasClass('fixed') == true) header.removeClass('fixed');

      lastScrollTop = st;
    });
  }
});