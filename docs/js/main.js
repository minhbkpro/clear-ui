// add color code in color list
$('.docs-color-list .docs-color-box').each(function() {
  var $this = $(this);

  $this.html('<span>' + rgb2hex($this.css('background-color')) + '</span>');
});

/**
 * Convert rgb to hex
 * @param  string rgb
 * @return string
 */
function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}