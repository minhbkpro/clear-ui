(function($) {
  'use strict';

  // create object
  var CUISelect = function(element, options) {
    this.init(element, options);
  };

  // default options
  CUISelect.DEFAULTS = {};

  // init function
  CUISelect.prototype.init = function(element, options) {
    this.element = $(element);
    options = this.getOptions(options);
    this.options = options;

    // not init if this is not an select or disabled select
    if (this.element.is(':not(select), .disabled, :disabled')) return;

    // hide select
    this.element.hide();

    // show dummy select
    this.element.after(this.build(element));
  };

  // build html function
  CUISelect.prototype.build = function(element) {
    var select = $(element);

    // build toggle
    var classes = this.element.attr('class').split(' ');
    classes.splice(classes.indexOf('cui-select'), 1);
    classes = classes.join(' ');
    var htmlToggle = '<a class="dropdown-toggle ' + classes + '" data-toggle="dropdown"></a>';

    // build options
    var htmlOptions = '';
    this.element.children().each(function() {
      var $this = $(this);

      if($this.is('optgroup')) {
        htmlOptions += '<li class="dropdown-header"><span>'+ $this.attr('label') +'</span></li>';
      }

      if($this.is('option')) {
        htmlOptions += '<li><a data-value="'+ $this.attr('value') +'">'+ $this.text() +'</a></li>';
      }
    });

    return '<div class="cui-select dropdown">' + htmlToggle + '<ul class="dropdown-menu">' + htmlOptions + '</ul></div>';
  };

  // get options function
  CUISelect.prototype.getOptions = function(options) {
    return $.extend({}, CUISelect.DEFAULTS, options);
  };

  // define plugin
  $.fn.cuiSelect = function() {
    return this.each(function() {
      var $this = $(this);
      var options = typeof option == 'object' && option;
      var data = $this.data('cui.select');

      if(!data) $this.data('cui.select', (data = new CUISelect(this, options)));
    });
  };

  // init cui-select
  $('.cui-select').cuiSelect();
})(jQuery);