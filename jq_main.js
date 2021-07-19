$(function () {
  $(window).on("scroll", function () {
    let scroll_btn = $(this).scrollTop();

    //console.log(scroll_btn);
    if (scroll_btn !== 0) {
      
      $(".main_button").removeClass('btnup');
      $(".main_button").addClass('btndown');
      $(".main_button").html('<i class= "fa fa-angle-up"></i>');
    } else {
      //$(".main_button").addClass = ('btneff');

      
      $(".main_button").removeClass('btndown');
      $(".main_button").addClass('btnup');
      $(".main_button").html('SCROLL DOWN <i class= "fa fa-angle-down"></i>');
      
    }
  });



  let imgHeight = $(".main_photo").height();

  console.log(imgHeight);




});