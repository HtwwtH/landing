"use strict";

$(function () {
  console.log('sdfsdf');
  $('.ytp-large-play-button-bg').attr('fill', '#fff');
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
});