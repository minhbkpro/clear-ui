$(function() {
  // add color code in color list
  $('.docs-color-list .docs-color-box').each(function() {
    let $this = $(this);
    $this.html('<span>' + rgb2hex($this.css('background-color')) + '</span>');
  });
});

/**
 * Convert rgb to hex.
 *
 * @param rgb
 *
 * @return string
 */
function rgb2hex(rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" +
      ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}