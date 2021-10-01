"use strict";

function formatColors(color) {
  if (!color.id) {
    return color.text;
  }

  var $color = $("<span class=\"custom-select__color\"><img src=\"images/dist/colors/".concat(color.element.value.toLowerCase(), ".svg\">").concat(color.text, "</span>"));
  return $color;
}

$(document).ready(function () {
  $('.custom-select__select').each(function () {
    var select = $(this);
    var placeholder = select.data('placeholder');
    var isMultiple = select.attr('multiple');
    var isColorPicker = select.hasClass('custom-select__select--colors');
    var options;

    if (isMultiple) {
      if (isColorPicker) {
        options = {
          templateResult: formatColors,
          closeOnSelect: false,
          placeholder: placeholder,
          width: '100%',
          minimumResultsForSearch: -1,
          dropdownCssClass: 'custom-select__dropdown custom-select__dropdown--multiple',
          tags: false,
          dropdownAutoWidth: true
        };
      } else {
        options = {
          closeOnSelect: false,
          placeholder: placeholder,
          width: '100%',
          minimumResultsForSearch: -1,
          dropdownCssClass: 'custom-select__dropdown custom-select__dropdown--multiple',
          tags: false,
          dropdownAutoWidth: true
        };
      }
    } else {
      options = {
        placeholder: placeholder,
        width: '100%',
        minimumResultsForSearch: -1,
        dropdownCssClass: 'custom-select__dropdown',
        tags: false,
        dropdownAutoWidth: true
      };
    }

    select.select2(options);
  });
  $('.custom-select__select').on('select2:select', function (e) {
    $(this).parent().addClass('selected');
  });
  $('.custom-select__select[multiple]').on('select2:select select2:unselect', function (e) {
    var select = $(this);
    var parent = select.parent();
    var placeholder = select.data('placeholder');
    var renderList = parent.find('.select2-selection__rendered');
    var numberOfSelectedItems = select.find(':selected').length;
    var selectedItems = "<li>".concat(placeholder, " (").concat(numberOfSelectedItems, ")</li>");

    if (numberOfSelectedItems < 1) {
      select.val(null).trigger('change');
    } else {
      renderList.empty();
      renderList.append(selectedItems);
    }
  });
  $('.custom-select__select[multiple]').on('select2:opening select2:closing', function (event) {
    var $searchfield = $(this).parent().find('.select2-search__field');
    $searchfield.prop('disabled', true);
  });
});
"use strict";

$(document).ready(function () {
  $('.featured-catalog__trigger').on('click', function () {
    $('body').addClass('modal-open');
    $('.mobile-filters').addClass('open');
  });
  $('.mobile-filters__close, .mobile-filters__apply').on('click', function () {
    $('body').removeClass('modal-open');
    $('.mobile-filters').removeClass('open');
  });
});
"use strict";

$(function () {
  $('.tabs-list__link').click(function (e) {
    e.preventDefault();
    var tabActive = $(this).attr('href'),
        activeListClass = 'tabs-list__link--active',
        ListItemClass = 'tabs-list__link',
        tabWrap = '.tabs';
    $(this).addClass(activeListClass).parents('.tabs-list').find('.' + ListItemClass).not($(this)).removeClass(activeListClass);
    $(this).parents(tabWrap).children('.tab').removeClass('tab--active');
    $(tabActive).addClass('tab--active');
  });
});
"use strict";

function reliabilityAnimations2() {
  var controller = new ScrollMagic.Controller();
  var reliabilityFeatures = document.querySelectorAll('.reliability__fade');
  reliabilityFeatures.forEach(function (feature, index, arr) {
    var tl = new TimelineMax();
    var previous = arr[0];
    feature.style.opacity = 0.5;

    if (index >= 1) {
      previous = arr[index - 1];
    }

    new ScrollMagic.Scene({
      triggerElement: feature,
      triggerHook: 0.6,
      duration: '60%'
    }) // .addIndicators()
    .on('enter', function () {
      // console.log('enter');
      tl.to(previous, 0.45, {
        opacity: 0.5
      });
      tl.to(feature, 0.45, {
        opacity: 1
      });
    }).on('leave', function () {
      // console.log('leave');
      tl.to(previous, 0.35, {
        opacity: 1
      });
      tl.to(feature, 0.35, {
        opacity: 0.5
      });
    }).addTo(controller);
  });
}

function initAnimations() {
  var isMobile = $(window).width() < 1200;

  if (!isMobile) {
    reliabilityAnimations2();
  }
}

$(document).ready(function () {
  initAnimations();
});
"use strict";

$(document).ready(function () {
  $('.reviews .slider').slick({
    infinite: true,
    arrows: false,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [{
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
});