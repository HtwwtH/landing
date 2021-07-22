
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
    $(`.${$(this).data('collapse')}`).toggle();
  })
});


