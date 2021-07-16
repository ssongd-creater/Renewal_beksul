$(function () {
  $(window).on("scroll", function () {
    let scroll_btn = $(this).scrollTop();

    //console.log(scroll_btn);
    if (scroll_btn !== 0) {
      $(".main_button").css(
        {
          "position": "fixed",
          "color": "#fff",
          "background": "#8d2125",
          "left": "auto",
          "transform": "none",
          "right": "0px"
        }
      );
      $(".main_button").html("<i class="+"fa"+"fa - angle - down >"+"</i > ")
    } else {
      $(".main_button").css(
        {
          "position": "absolute",
          "background": "#8d2125",
          "left": "50%",
          "transform": "translateX(-50%)",
          "right": "auto"
        }
      );
      $(".main_button").html("SCROLL DOWN < i class="+"fa fa-angle-down"+ "></i >");
    }
  });








});