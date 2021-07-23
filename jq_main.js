$(function () {
  // let navHeight = $(".navi").outerHeight();
  // let imgHeight = $(".main_photo").outerHeight();
  // let btnHeight = $(".main_button").outerHeight();
  // let imgWidth = $(".main_photo").outerWidth();
  // const test = $(".main_button");

  // const imgButton = navHeight + imgHeight;
  // const btnFix = imgButton - btnHeight;
  // //console.log(navHeight);
  // test.offset({btnFix}).top;
  // console.log(btnFix);
  
  $(window).on("scroll", function () {
    let scroll_btn = $(this).scrollTop();

    //console.log(scroll_btn);
    if (scroll_btn !== 0) {
      $(".main_button").removeClass('btnup');
      $(".main_button").addClass('btndown');
      $(".main_button").html('<i class= "fa fa-angle-up"></i>');
      $(".information").addClass('show_ani');
      $(".info_img").addClass('show_ani');
    } else {
      //$(".main_button").addClass = ('btneff');

      $(".main_button").removeClass('btndown');
      $(".main_button").addClass('btnup');
      $(".main_button").html('SCROLL DOWN <i class= "fa fa-angle-down"></i>');
    }

    if (scroll_btn >= 1090) {
      $(".sub_infoimg").show();
      $(".sub_infoimg").addClass('show_ani');
      $(".sub_infoimg .sub_imgs").addClass('show_ani');
      $(".sub_infoimg .sub_imgs div").addClass('show_ani');

    };

    if (scroll_btn >= 2173) {
      $(".left_history_1st").addClass("active");
      $(".left_history_1st").css("!important");
    } else {
      $(".left_history_1st").removeClass("active");
    }
  });



  




});