// (function($) {
//   'use strict';
//
//   // create object
//   var CUISelect = function(element, options) {
//     this.init(element, options);
//   };
//
//   // default options
//   CUISelect.DEFAULTS = {};
//
//   // init function
//   CUISelect.prototype.init = function(element, options) {
//     if (element != undefined) this.element = $(element);
//     if(options != undefined) {
//       this.options = this.getOptions(options);
//     }
//
//     // not init if this is not an select or disabled select
//     if (this.element.is(':not(select), .disabled, :disabled')) return;
//
//     // hide select
//     this.element.hide();
//
//     // show dummy select
//     this.build();
//   };
//
//   // build html function
//   CUISelect.prototype.build = function() {
//     var cuiSelect = this;
//
//     // clear old tag
//     cuiSelect.element.next(".dropdown").remove();
//
//     // build toggle
//     var classes = cuiSelect.element.attr("class").split(" ");
//     classes.splice(classes.indexOf('cui-select'), 1);
//     classes = classes.join(' ');
//     var selectedValue = cuiSelect.element.val();
//     var selectedText = cuiSelect.element.find("option:selected").text();
//     var htmlToggle = '<a class="dropdown-toggle ' + classes + '" data-toggle="dropdown">' + selectedText + "</a>";
//
//     // build options
//     var htmlOptions = '';
//     cuiSelect.element.children().each(function(index1, element1) {
//       var $element1 = $(element1);
//
//       if ($element1.is("optgroup")) {
//         htmlOptions += '<h6 class="dropdown-header"><span>' + $element1.attr("label") + "</span></h6>";
//
//         $element1.children().each(function(index2, element2) {
//           var $element2 = $(element2);
//           var selected = selectedValue == $element2.attr("value") ? "selected" : "";
//           htmlOptions += '<a class="dropdown-item ' + selected + '" data-value="' + $element2.attr("value") + '">' + $element2.text() + "</a>";
//         });
//       }
//
//       if ($element1.is("option")) {
//         var selected = selectedValue == $element2.attr("value") ? "selected" : "";
//         htmlOptions += '<a class="dropdown-item ' + selected + '" data-value="' + $element1.attr("value") + '">' + $element1.text() + "</a>";
//       }
//     });
//
//     cuiSelect.element.after('<div class="cui-select dropdown">' + htmlToggle + '<div class="dropdown-menu">' + htmlOptions + "</div></div>");
//
//     // events
//     cuiSelect.element
//       .next(".dropdown")
//       .find(".dropdown-item")
//       .click(function() {
//         var $this = $(this);
//         var value = $this.data("value");
//         cuiSelect.element.val(value);
//         cuiSelect.init();
//       });
//   };
//
//   // get options function
//   CUISelect.prototype.getOptions = function(options) {
//     return $.extend({}, CUISelect.DEFAULTS, options);
//   };
//
//   // define plugin
//   $.fn.cuiSelect = function() {
//     return this.each(function() {
//       var $this = $(this);
//       var options = typeof option == 'object' && option;
//       var data = $this.data('cui.select');
//
//       if(!data) $this.data('cui.select', (data = new CUISelect(this, options)));
//     });
//   };
//
//   // init cui-select
//   $('.cui-select').cuiSelect();
// })(jQuery);