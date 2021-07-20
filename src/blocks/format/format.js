$(function () {
  $('.tabs-list__link').click(function (e) {
    e.preventDefault();

    var tabActive = $(this).attr('href'),
      activeListClass = 'tabs-list__link--active',
      ListItemClass = 'tabs-list__link',
      tabWrap = '.tabs'

    $(this).addClass(activeListClass).parents('.tabs-list').find('.' + ListItemClass).not($(this)).removeClass(activeListClass);
    $(this).parents(tabWrap).children('.tab').removeClass('tab--active');
    $(tabActive).addClass('tab--active');
  });
});