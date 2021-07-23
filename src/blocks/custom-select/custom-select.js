function formatColors(color) {
  if (!color.id) {
    return color.text;
  }
  const $color = $(
    `<span class="custom-select__color"><img src="images/dist/colors/${color.element.value.toLowerCase()}.svg">${color.text
    }</span>`
  );
  return $color;
}

$(document).ready(function () {
  $('.custom-select__select').each(function () {
    const select = $(this);
    const placeholder = select.data('placeholder');
    const isMultiple = select.attr('multiple');
    const isColorPicker = select.hasClass('custom-select__select--colors');
    let options;

    if (isMultiple) {
      if (isColorPicker) {
        options = {
          templateResult: formatColors,
          closeOnSelect: false,
          placeholder: placeholder,
          width: '100%',
          minimumResultsForSearch: -1,
          dropdownCssClass:
            'custom-select__dropdown custom-select__dropdown--multiple',
          tags: false,
          dropdownAutoWidth: true,
        };
      } else {
        options = {
          closeOnSelect: false,
          placeholder: placeholder,
          width: '100%',
          minimumResultsForSearch: -1,
          dropdownCssClass:
            'custom-select__dropdown custom-select__dropdown--multiple',
          tags: false,
          dropdownAutoWidth: true,
        };
      }
    } else {
      options = {
        placeholder: placeholder,
        width: '100%',
        minimumResultsForSearch: -1,
        dropdownCssClass: 'custom-select__dropdown',
        tags: false,
        dropdownAutoWidth: true,
      };
    }

    select.select2(options);
  });

  $('.custom-select__select').on('select2:select', function (e) {
    $(this).parent().addClass('selected');
  });

  $('.custom-select__select[multiple]').on(
    'select2:select select2:unselect',
    function (e) {
      const select = $(this);
      const parent = select.parent();
      const placeholder = select.data('placeholder');
      const renderList = parent.find('.select2-selection__rendered');
      const numberOfSelectedItems = select.find(':selected').length;
      const selectedItems = `<li>${placeholder} (${numberOfSelectedItems})</li>`;

      if (numberOfSelectedItems < 1) {
        select.val(null).trigger('change');
      } else {
        renderList.empty();
        renderList.append(selectedItems);
      }
    }
  );

  $('.custom-select__select[multiple]').on(
    'select2:opening select2:closing',
    function (event) {
      const $searchfield = $(this).parent().find('.select2-search__field');
      $searchfield.prop('disabled', true);
    }
  );
});
