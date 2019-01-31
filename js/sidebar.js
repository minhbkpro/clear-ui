(function($){
  $(function(){
    $(document).on('click', '.cui-sidebar .nav-link', function() {
      $(this).parent().toggleClass('open');
    });
  });
})(jQuery);