"use strict";

$(function () {
  $('a[data-rel^=lightcase]').lightcase();
  $('.select-styler').select2({
    width: '100%',
    minimumResultsForSearch: -1
  });
  $('.select-styler-filter').select2({
    width: '100%',
    minimumResultsForSearch: -1,
    dropdownCssClass: "filter"
  });
  $('.group-title').click(function () {
    $(this).toggleClass('group-title-collapsed');
    $(".".concat($(this).data('collapse'))).toggle();
  });
  var logo = $('.header__logo');
  logo.mouseenter(function () {
    logo.find('.header__hidden-menu').slideDown();
  });
  $('.header__logo .logo-wrapper').mouseleave(function (e) {
    if (e.relatedTarget.className.indexOf('header__hidden-menu') == -1) $('.header__hidden-menu').slideUp();
  });
  $('.header__hidden-menu').mouseleave(function (e) {
    if (e.relatedTarget.className.indexOf('logo-wrapper') == -1) $('.header__hidden-menu').slideUp();
  });
});