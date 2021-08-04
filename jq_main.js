$(function () {
  
  $("#main_button").click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 400);
    return false;
  });

  $(window).on("scroll", function () {
    let scroll_btn = $(this).scrollTop();

    //Button Scroll Event Jquery
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

    
    

    // History Scroll event
    if (scroll_btn >= 1090) {
      $(".sub_infoimg").show();
      $(".sub_infoimg").addClass('show_ani');
      $(".sub_infoimg .sub_imgs").addClass('show_ani');
      $(".sub_infoimg .sub_imgs div").addClass('show_ani');
    };

    if (scroll_btn >= 2030) {
      $(".left_history_1st").addClass("active_left_1");
    }else {
      $(".left_history_1st").removeClass("active_left_1");
    };

    if (scroll_btn >= 2140) {
      $(".left_history_1st").removeClass("active_left_1");
      $(".right_history_1st").addClass("active_right_1");
    } else {
      $(".right_history_1st").removeClass("active_right_1");
    };

    if (scroll_btn >= 2340) {
      $(".left_history_1st").removeClass("active_left_1");
      $(".right_history_1st").removeClass("active_right_1");
      $(".left_history_2nd").addClass("active_left_1");
    } else {
      $(".left_history_2nd").removeClass("active_left_1");
    };

    if (scroll_btn >= 2540) {
      $(".left_history_1st").removeClass("active_left_1");
      $(".right_history_1st").removeClass("active_right_1");
      $(".left_history_2nd").removeClass("active_left_1");
      $(".right_history_2nd").addClass("active_right_1");
    } else {
      $(".right_history_2nd").removeClass("active_right_1");
    };

    if (scroll_btn >= 2830) {
      $(".left_history_1st").removeClass("active_left_1");
      $(".right_history_1st").removeClass("active_right_1");
      $(".left_history_2nd").removeClass("active_left_1");
      $(".right_history_2nd").removeClass("active_right_1");
      $(".middle_logo").addClass("active_middle");
    } else {
      $(".middle_logo").removeClass("active_middle");
    };

    if (scroll_btn >= 3250) {
      $(".left_history_1st").removeClass("active_left_1");
      $(".right_history_1st").removeClass("active_right_1");
      $(".left_history_2nd").removeClass("active_left_1");
      $(".right_history_2nd").removeClass("active_right_1");
      $(".middle_logo").removeClass("active_middle");
      $(".left_history_3rd").addClass("active_left_1");
    } else {
      $(".left_history_3rd").removeClass("active_left_1");
    };

    if (scroll_btn >= 3430) {
      $(".left_history_1st").removeClass("active_left_1");
      $(".right_history_1st").removeClass("active_right_1");
      $(".left_history_2nd").removeClass("active_left_1");
      $(".right_history_2nd").removeClass("active_right_1");
      $(".middle_logo").removeClass("active_middle");
      $(".left_history_3rd").removeClass("active_left_1");
      $(".right_history_3rd").addClass("active_right_1");
    } else {
      $(".right_history_3rd").removeClass("active_right_1");
    };

    if (scroll_btn >= 3650) {
      $(".left_history_1st").removeClass("active_left_1");
      $(".right_history_1st").removeClass("active_right_1");
      $(".left_history_2nd").removeClass("active_left_1");
      $(".right_history_2nd").removeClass("active_right_1");
      $(".middle_logo").removeClass("active_middle");
      $(".left_history_3rd").removeClass("active_left_1");
      $(".right_history_3rd").removeClass("active_right_1");
      $(".left_history_4rd").addClass("active_left_1");
    } else {
      $(".left_history_4rd").removeClass("active_left_1");
    };

    if (scroll_btn >= 3830) {
      $(".left_history_1st").removeClass("active_left_1");
      $(".right_history_1st").removeClass("active_right_1");
      $(".left_history_2nd").removeClass("active_left_1");
      $(".right_history_2nd").removeClass("active_right_1");
      $(".middle_logo").removeClass("active_middle");
      $(".left_history_3rd").removeClass("active_left_1");
      $(".right_history_3rd").removeClass("active_right_1");
      $(".left_history_4rd").removeClass("active_left_1");
      $(".right_history_4rd").addClass("active_right_1");
    } else {
      $(".right_history_4rd").removeClass("active_right_1");
    };
  });

  //Main Page Slide Section


  




});