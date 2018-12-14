import $ from 'jquery';

const NAME = 'cuiSelect';

class CUISelect {
  constructor(element, options) {
    this.element = $(element);
    this.defaultOptions = {};
    this.options = $.extend({}, this.defaultOptions, options);
    this._init();
  }

  _init() {
    // not init if this is not an select or disabled select
    if (this.element.is(':not(select), .disabled, :disabled')) return;

    // hide select
    this.element.hide();

    // show dummy select
    this.element.after(this._build());
  };

  // build html function
  _build() {
    // build toggle
    let classes = this.element.attr('class').split(' ');
    classes.splice(classes.indexOf('cui-select'), 1);
    classes = classes.join(' ');
    let htmlToggle = '<a class="dropdown-toggle '+ classes +'" data-toggle="dropdown"></a>';

    // build options
    let htmlOptions = '';
    this.element.children().each(function() {
      let $this = $(this);

      if($this.is('optgroup')) {
        htmlOptions += '<li class="dropdown-header"><span>'+ $this.attr('label') +'</span></li>';
      }

      if($this.is('option')) {
        htmlOptions += '<li><a data-value="'+ $this.attr('value') +'">'+ $this.text() +'</a></li>';
      }
    });

    return '<div class="cui-select dropdown">' + htmlToggle + '<ul class="dropdown-menu">' + htmlOptions + '</ul></div>';
  };

  static _jQueryInterface(options) {
    return this.each(function() {
      const $element = $(this)
      let data = $element.data(DATA_KEY)

      if (!data) {
        data = new CUISelect(this, options)
        $element.data(DATA_KEY, data)
      }
    })
  }
}

$.fn[NAME] = CUISelect._jQueryInterface
$.fn[NAME].Constructor = CUISelect
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return CUISelect._jQueryInterface
}

export default CUISelect