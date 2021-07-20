$(function(){
    $('.tabs-list__link').click(function(e){
      e.preventDefault();

      var tabActive = $(this).attr('href'),
          activeListClass = 'tabs-list__link--active',
          ListItemClass = 'tabs-list__link',
          tabWrap = '.tabs'

      $(this).addClass(activeListClass).parents('.tabs-list').find('.' + ListItemClass).not($(this)).removeClass(activeListClass);
      $(this).parents(tabWrap).children('.tab').removeClass('tab--active');
      $(tabActive).addClass('tab--active');
    });

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

    $('.group-title').click(function(){
      $(this).toggleClass('group-title-collapsed');
      $(`.${$(this).data('collapse')}`).toggle();
    })
});

