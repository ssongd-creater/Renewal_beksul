$(function () {
  
  $(window).on("scroll", function () {
    let scroll_btn = $(this).scrollTop();

    console.log(scroll_btn);
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
      $(".left_history_1st").addClass("active_left_1");
      $(".left_history_1st").css("!important");
    }else {
      $(".left_history_1st").removeClass("active_left_1");
    };

    if (scroll_btn >= 2430) {
      $(".left_history_1st").removeClass("active_left_1");
      $(".right_history_1st").addClass("active_right_1");
      $(".right_history_1st").css("!important");
    } else {
      $(".right_history_1st").removeClass("active_right_1");
    }

    if (scroll_btn >= 2710) {
      $(".left_history_1st").removeClass("active_left_1");
      $(".right_history_1st").removeClass("active_right_1");
      $(".left_history_2nd").addClass("active_left_1");
      $("left_history_2nd").css("!important");
    } else {
      $(".left_history_2nd").removeClass("active_left_1");
    }

    if (scroll_btn >= 2900) {
      $(".left_history_1st").removeClass("active_left_1");
      $(".right_history_1st").removeClass("active_right_1");
      $(".left_history_2nd").removeClass("active_left_1");
      $(".right_history_2nd").addClass("active_right_1");
      $("right_history_2nd").css("!important");
    } else {
      $(".right_history_2nd").removeClass("active_right_1");
    }

    // if (scroll_btn >= 2900) {
    //   $(".left_history_1st").removeClass("active_left_1");
    //   $(".right_history_1st").removeClass("active_right_1");
    //   $(".left_history_2nd").removeClass("active_left_1");
    //   $(".right_history_2nd").removeClass("active_right_1");
    //   $(".middle_logo").show(this.before)
    // } else {
    //   $(".right_history_2nd").removeClass("active_right_1");
    //   $(".middle_logo::before").hide(this.before);
      //}
  });



  




});