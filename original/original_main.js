$(function () {

  'use strict';

  var opts = { // 토글 설정
    method: 0, // 1:smoothstate, 2:pjax
    imagesLoaded: true, // 이미지 로드 후 동작
    smoothScroll: false, // false 면 동작하지 않음
    parallax: true, // false 면 동작하지 않음
  };

  var $window = window.$window || $(window),
    $document = window.$document || $(document),
    $html = window.$html || $('html'),
    $body = $('body'), // window.$body || $('body'),
    $container = window.$container || $('#container'),
    $header = window.$header || $('#header'),
    $footer = window.$footer || $('#footer');

  var bodyClass = $body.attr('class'); // bodyClass

  $body.append('<div class="md-overlay"></div><div class="md-indicator"><span></span><span></span><span></span><span></span></div>');

  // if (bodyClass.indexOf('page-brand') > -1 && bodyClass.indexOf('page-brand-submain') < 0) { // 브랜드일때, 서버언어로 처리 필요
  //     // $header.addClass('is-transparent'); // 서버언어로 처리 필요
  // }

  // all menu
  var _prevAllmenuScrollTop = 0;
  var closeAllmenu = function () {
    $html.removeClass('is-allmenu-anim');
    $html.removeClass('is-allmenu-in is-overlay');
    $('html, body').stop().animate({
      'scrollTop': _prevAllmenuScrollTop
    }, 0);
  };
  $document.on('click', '.js-allmenu', function (e) {
    e.preventDefault();
    var _bool = $html.hasClass('is-allmenu-anim');

    if (_bool !== true) {
      _prevAllmenuScrollTop = $window.scrollTop();
      $html.addClass('is-allmenu-anim is-overlay');
      setTimeout(function () {
        $html.addClass('is-allmenu-in');
      }, 400);
    } else {
      closeAllmenu();
    }
  });

  var detectMobile = detectMobile || function () { // 모바일 체크
    var check = false;
    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  var isSm = false;

  var responsiveDetector = function () {
    var $sm = $('<div class="detector-sm detector-md"></div>');
    var $lg = $('<div class="detector-lg"></div>');
    $body.append($sm);
    $body.append($lg);
    var _prev = null;
    $window.on('load resize', function () {
      isSm = $sm.is(':visible');
      if (_prev !== isSm) {
        $html.toggleClass('is-sm', isSm);
      }
      _prev = isSm;
    });
  };
  responsiveDetector();

  var throttle = (function () { // throttle
    var _timerThrottle;
    return function (_fn, _delay) {
      clearTimeout(_timerThrottle);
      _timerThrottle = setTimeout(_fn, _delay);
    };
  }());

  var debounce = debounce || function (func, wait, immediate) { // debonce
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  var scrollTop = 0;
  var isScrollDowned = false;

  $window.on('load scroll resize', function () {
    scrollTop = $window.scrollTop();
    isScrollDowned = (scrollTop >= 10);
    $html.toggleClass('is-scroll-downed', isScrollDowned);
    // $html.toggleClass('is-scroll-downed', true);
  });

  var initVisual = function () { // 메인 비쥬얼
    var $el = $('#visual');
    if (!$el.length) return false;
    var $slider = $el.find('.wrap .item'),
      $subject = $el.find('.subjects .item'),
      $pagingWrap = $el.find('.pagings .tab'),
      $paging = null,
      $prev = $el.find('.nav.prev'),
      $next = $el.find('.nav.next'),
      $pause = $el.find('.play');
    var idx = -1;
    var _deg = 0;
    var length = $slider.length;
    var timerAnim = null;
    var timerDo = null;
    var isAnimating = false;
    var initPaging = function () { // 페이징 만들기
      $pagingWrap.empty();
      for (var i = 0; i < length; i++) {
        var _htmlPaging = '<li class="item"><a href="javascript:;"><span><em>' + (i + 1) + '번 슬라이드</em></span></a></li>';
        $pagingWrap.append(_htmlPaging);
      }
      $paging = $pagingWrap.children();
    };
    initPaging();

    var active = function (_idx) {
      isAnimating = true;
      var prevIdx = _idx - 1;
      if (prevIdx < 0) {
        prevIdx = length - 1;
      }
      $slider.eq(_idx).addClass('in')
      $subject.eq(_idx).addClass('in').siblings().removeClass('in');
      $paging.eq(_idx).addClass('in').siblings().removeClass('in');
      $paging.find('em.sr-only').remove();
      $paging.eq(_idx).find('span').append('<em class="sr-only">- 활성화된 슬라이드</em>');
      timerDo = setTimeout(function () {
        $slider.eq(_idx).siblings().removeClass('in');
        isAnimating = false;
      }, 200);
    };
    var next = function () {
      if (isAnimating === true) return false;
      idx += 1;
      if (idx >= length) {
        idx = 0;
      }
      active(idx);
    };
    var prev = function () {
      if (isAnimating === true) return false;
      idx -= 1;
      if (idx < 0) {
        idx = length - 1;
      }
      active(idx);
    };
    var autoPlay = function () {
      clearTimeout(timerAnim);
      if (!$pause.hasClass('stop')) {
        timerAnim = setTimeout(function () {
          if (!$pause.hasClass('stop')) {
            next();
          }
          autoPlay();
        }, 3000);
      }
    };
    var pause = function (_bool) {
      $pause.toggleClass('stop', _bool);
      if (_bool === true) {
        clearTimeout(timerAnim);
      } else {
        autoPlay();
      }
    };
    if (length <= 1) {
      $prev.hide();
      $next.hide();
      $paging.hide();
      $pause.hide();
      next();
    } else {
      next();
      autoPlay();
    }
    $paging.on('click', function (e) {
      e.preventDefault();
      var _idx = $(this).index();
      active(_idx);
      autoPlay();
    });
    $slider.find('a').on('focus', function (e) {
      e.preventDefault();
      var _idx = $(this).closest('.item').index();
      active(_idx);
      pause(true);
      // autoPlay();
    });
    $next.on('click', function (e) {
      e.preventDefault();
      clearTimeout(timerAnim);
      next();
      autoPlay();
    });
    $prev.on('click', function (e) {
      e.preventDefault();
      clearTimeout(timerAnim);
      prev();
      autoPlay();
    });
    $pause.on('click', function (e) {
      e.preventDefault();
      var _bool = (!$pause.hasClass('stop'));
      pause(_bool);
    });
    var $inner = $('#inner');
    $window.on('load resize', function () {
      var $visualHeight = $el.height();
      if ($visualHeight >= 833) {
        $inner.css({
          marginTop: $visualHeight
        });
      } else {
        $inner.removeAttr('style');
      }
    });
  };
  initVisual();

  var initTopButton = function () {
    // console.log('init top button');
    var $target = $('.js-topbutton-target'),
      $content = $('#content'),
      $topButton = $('#topbutton');
    var _htmlTopButton = '<div id="topbutton" class="is-fixed"><a href="#top"><i class="icon"><em>topbutton</em></i></a></div>';

    // console.log('topbutton length', $topButton.length);

    if (!$topButton.length) { // top 버튼이 없으면
      $topButton = $(_htmlTopButton);
      // $body.append($topButton); // 20210310 메인 유튜브 배너 추가로 탑버튼 컨텐츠 div 밑으로 이동
      $content.append($topButton);
    }

    var _onScroll = function () {
      var _bottom = $window.height() - $target.outerHeight();
      if (isScrollDowned !== true) {
        $topButton.css({
          opacity: 1,
          bottom: _bottom
        });
      } else {
        $topButton.css({
          opacity: 1,
          bottom: 0
        });
      }
    }

    if (bodyClass.indexOf('page-brand') > -1 || bodyClass.indexOf('page-home') > -1) {
      if (bodyClass.indexOf('page-brand-submain') < 0 && $target.length) {
        $topButton.removeClass('is-fixed');
        $window.on('load resize scroll', function () {
          _onScroll();
        });
      } else {
        $topButton.addClass('is-fixed');
      }
    } else {
      $topButton.addClass('is-fixed');
    }


  };
  initTopButton();


  var initInovation = function () {
    var $el = $('#inovation');
    if (!$el.length) return false;
    var idx = -1;
    var $slider = $el.find('.core .item');
    var $bg = $el.find('.backgrounds .item');
    var $paging = $el.find('.pagers .item');
    var $pager = $el.find('.pager');
    var length = $slider.length;
    var timerAnim = null;
    var timerDo = null;
    var _deg = 0;
    var active = function (_idx) {
      var prevIdx = _idx - 1;
      if (prevIdx < 0) {
        prevIdx = length - 1;
      }
      $slider.eq(_idx).addClass('in')
      timerDo = setTimeout(function () {
        $slider.eq(_idx).siblings().removeClass('in');
      }, 200);
      $bg.eq(_idx).addClass('in').siblings().removeClass('in');
      $paging.eq(_idx).addClass('in').siblings().removeClass('in');
    };
    var next = function () {
      idx += 1;
      if (idx >= length) {
        idx = 0;
      }
      active(idx);
    };
    var autoPlay = function () {
      clearTimeout(timerAnim);
      timerAnim = setTimeout(function () {
        next();
        autoPlay();
      }, 6500);
    };
    next();
    autoPlay();
    $pager.on('click', function (e) {
      e.preventDefault();
      next();
      autoPlay();
    });
  };
  initInovation();

  // slider default single
  // var initSingleSlider = function(){
  //     $('.js-slider-single:visible').each(function() {
  //         var $this = $(this),
  //             $container = $this.find('.swiper-container'),
  //             $pagination = $this.closest('.grid').find('.swiper-pagination'),
  //             $play = $this.closest('.grid').find('.js-swiper-play'),
  //             $items = $this.find('.swiper-slide');
  //         if ($container.hasClass('init')) return false; // 재생성 방지
  //         if ($items.length < 2) return false;
  //         var slider = new Swiper($container, {
  //             slidesPerView: 'auto',
  //             centeredSlides: true,
  //             speed: 400,
  //             spaceBetween: 15,
  //             loop: true,
  //             pagination: {
  //                 el: $pagination,
  //                 clickable: true,
  //             },
  //             autoplay: {
  //               delay: 4000
  //             },
  //             on: {
  //                 init: function(){
  //                     $container.addClass('init');
  //                 }
  //             }
  //         });
  //     });
  // };
  //
  // initSingleSlider();

  var initSlider = function () {
    $('.js-slider:visible').each(function () {
      var $this = $(this),
        $container = $this.find('.swiper-container'),
        $pagination = $this.find('.swiper-pagination'),
        $play = $this.find('.js-swiper-play'),
        $items = $this.find('.swiper-slide'),
        $prev = $this.find('.swiper-button-prev'),
        $next = $this.find('.swiper-button-next'),
        _loop = ($this.data('loop') !== undefined && $this.data('loop') == false) ? false : true,
        _view = ($this.data('view') === undefined) ? 1 : $this.data('view'),
        _center = ($this.data('center') === undefined) ? false : $this.data('center'),
        _margin = ($this.data('margin') === undefined) ? 0 : $this.data('margin'),
        _autoplay = ($this.data('autoplay') === false) ? false : true;

      if ($container.hasClass('init')) return false; // 재생성 방지
      if ($items.length < _view + 1) return false;
      var slider = new Swiper($container, {
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
        slidesPerView: _view,
        slidesPerGroup: _view,
        centeredSlides: _center,
        speed: 400,
        spaceBetween: _margin,
        loop: _loop,
        pagination: {
          el: $pagination,
          clickable: true,
        },
        navigation: {
          nextEl: $next,
          prevEl: $prev,
        },
        autoplay: {
          enabled: _autoplay,
          disableOnInteraction: false,
          delay: 4000
        },
        on: {
          init: function () {
            $container.addClass('init');
            $this.addClass('loaded');
            // console.info(slider.pagination);
            if (!$this.parent().hasClass('slider-home-brands') && !$this.parent().hasClass('slider-tour-map')) {
              $this.find('.swiper-slide a, .swiper-slide img').attr('aria-hidden', 'true').attr('tabindex', '-1');
              $this.find('.swiper-slide-active a, .swiper-slide-active img').attr('aria-hidden', 'false').attr('tabindex', '0');
            }
          },
          slideChangeTransitionEnd: function () {
            if (!$this.parent().hasClass('slider-home-brands') && !$this.parent().hasClass('slider-tour-map')) {
              $this.find('.swiper-slide a, .swiper-slide img').attr('aria-hidden', 'true').attr('tabindex', '-1');
              $this.find('.swiper-slide-active a, .swiper-slide-active img').attr('aria-hidden', 'false').attr('tabindex', '0');
            }
          }
        }
      });

      $play.on('click', function () {
        var $this = $(this);

        if ($this.hasClass('stop')) {
          $this.removeClass('stop').find('span').text('정지');
          slider.autoplay.start();
        } else {
          $this.addClass('stop').find('span').text('재생');
          slider.autoplay.stop();
        }
      });
    });

  };

  initSlider();

  $document.on('click', '.js-reset-slider', function () {
    setTimeout(function () {
      // initSingleSlider();
      initSlider();
    }, 300);
  });


  // slider default single
  // $('.js-slider-brands-carousel').each(function() {
  //     var $this = $(this),
  //         $container = $this.find('.swiper-container'),
  //         // $scrollbar = $this.find('.swiper-scrollbar'),
  //         // $pagination = $this.closest('.grid').find('.swiper-pagination'),
  //         $items = $this.find('.swiper-slide'),
  //         $prev = $this.parent().find('.swiper-button-prev'),
  //         $next = $this.parent().find('.swiper-button-next');
  //     var _width = 452 * 3;
  //     var slider = new Swiper($container, {
  //         width: _width,
  //         // freemode: true,
  //         slidesPerView: 3,
  //         speed: 400,
  //         spaceBetween: 0,
  //         loop: true,
  //         navigation: {
  //           nextEl: $next,
  //           prevEl: $prev,
  //         },
  //         autoplay: {
  //           delay: 4000
  //         }
  //     });
  // });

  //레시피 슬라이더
  var initRecipeSlider = function () {
    $('.js-recipe-slider:visible').each(function () {
      var $this = $(this),
        $container = $this.find('.swiper-container'),
        $play = $this.find('.js-swiper-recipe-play'),
        _autoplay = ($this.data('autoplay') === false) ? false : true;

      var slider3d = new Swiper($container, {
        speed: 800,
        simulateTouch: false,
        loop: true,
        loopAdditionalSlides: 1,
        autoplay: {
          enabled: _autoplay,
          delay: 2600,
          disableOnInteraction: false,
        },
        a11y: true,
        pagination: {
          el: '.swiper-recipe-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-recipe-next',
          prevEl: '.swiper-recipe-prev',
        },
        draggable: false,
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 70,
          stretch: 85,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        },
        on: {
          init: function () {
            $container.addClass('init');
            $this.addClass('loaded');
            if (!$this.parent().hasClass('js-recipe-slider')) {
              $this.find('.swiper-slide a').attr('aria-hidden', 'true').attr('tabindex', '-1');
              $this.find('.swiper-slide-active a').attr('aria-hidden', 'false').attr('tabindex', '0');
            }
          },
          slideChangeTransitionEnd: function () {
            if (!$this.parent().hasClass('js-recipe-slider')) {
              $this.find('.swiper-slide a').attr('aria-hidden', 'true').attr('tabindex', '-1');
              $this.find('.swiper-slide-active a').attr('aria-hidden', 'false').attr('tabindex', '0');
            }
          }
        }
      });

      $play.on('click', function () {
        var $this = $(this);
        if ($this.hasClass('stop')) {
          $this.removeClass('stop').find('span').text('정지');
          slider3d.autoplay.start();
        } else {
          $this.addClass('stop').find('span').text('재생');
          slider3d.autoplay.stop();
        }
      });
    });

  };
  initRecipeSlider();

  // 브랜드 연관브랜드 스와이퍼
  var brandCarouselSwiper = (function () {
    var el, _swiper, swiperEl, containerEl, paginationEl, prevEl, nextEl, colEl;
    var titleData, idx, isLoad, itemLgt, colLgt, colWidth, containerWidth, colClass;
    function init() {
      el = $('.brand-carousel-slider');
      swiperEl = el.find('.js-carousel-swiper');
      containerEl = swiperEl.find('.swiper-container');
      paginationEl = swiperEl.find('.swiper-pagination');
      colEl = swiperEl.find('.swiper-slide .col');

      isLoad = el.length === 0;
      idx = 0;
      itemLgt = containerEl.find('.swiper-slide').length;
      colWidth = colEl.width();
      colLgt = colEl.length;
      containerWidth = colWidth * colLgt;
      colClass = 'col-1-' + colLgt;

      if (isLoad) {
        return false;
      }

      swiperEl.css('opacity', '1');
      bindEvent();
    }
    function bindEvent() {
      swiperFn();
    }
    function swiperFn() {
      if (itemLgt > 1) {
        swiperEl.addClass('in');
        _swiper = new Swiper(containerEl, {
          keyboard: {
            enabled: true,
            onlyInViewport: false,
          },
          speed: 400,
          spaceBetween: 30,
          navigation: {
            nextEl: swiperEl.find('.swiper-button-next'),
            prevEl: swiperEl.find('.swiper-button-prev'),
          },
          on: {
            init: function () {
              paginationEl.html('<span class="count eng-title"><span class="current">' + (this.realIndex + 1) + '</span><span class="total">/' + itemLgt + '</span></span>');
            },
            slideChange: function () {
              paginationEl.find('.current').text(this.realIndex + 1);
            }
          }
        });
      } else {
        colEl.removeClass('col-1-5').addClass(colClass);
        containerEl.css('max-width', containerWidth);
      }
    }

    return {
      init: init
    }
  })();
  brandCarouselSwiper.init();
  // window.brandCarouselSwiper = (function(){
  //     var el, titleEl, _swiper, swiperEl, prevSwiper, paginationEl, prevEl, nextEl;
  //     var titleData, idx, maxData, _options, prevIdx, isLoad, itemLgt, itemIdx, currentIdx;
  //     function init(data){
  //         el = $('.brand-carousel-slider');
  //         titleEl = el.find('.titles .title');
  //         swiperEl = el.find('.js-carousel-swiper');
  //
  //         isLoad = el.length === 1;
  //         _swiper = [];
  //         titleData = data;
  //         maxData = data.length;
  //         idx = 0;
  //
  //         if(isLoad){
  //             return false;
  //         }
  //         bindEvent();
  //     }
  //     function bindEvent(){
  //         categoryFn();
  //         swiperFn();
  //     }
  //     function categoryFn(){
  //         $document.on('click','.brand-carousel-slider .btn-next', function(e){
  //             e.preventDefault();
  //
  //             prevIdx = idx;
  //             if(idx < maxData-1){
  //                 idx++;
  //             } else if(idx === maxData-1){
  //                 idx = 0;
  //             }
  //
  //             currentSwiper(idx);
  //             titleFn(idx);
  //             swiperFn(idx);
  //             if(_swiper[prevIdx] != undefined){
  //                 _swiper[prevIdx].destroy();
  //             }
  //         });
  //         $document.on('click','.brand-carousel-slider .btn-prev', function(e){
  //             e.preventDefault();
  //
  //             prevIdx = idx;
  //             if(idx > 0){
  //                 idx--;
  //             } else if(idx === 0){
  //                 idx = maxData-1;
  //             }
  //             currentSwiper(idx);
  //             titleFn(idx);
  //             swiperFn(idx);
  //             if(_swiper[prevIdx] != undefined){
  //                 _swiper[prevIdx].destroy();
  //             }
  //         });
  //     }
  //     function titleFn(idx){
  //         titleEl.text(titleData[idx]);
  //     }
  //     function swiperFn(idx){
  //         idx = idx === undefined ? 0 : idx;
  //         currentIdx = 0;
  //         el.find('.js-carousel-swiper').each(function(index, obj){
  //             if(idx === index){
  //                 itemLgt = $(this).find('.swiper-container .swiper-slide').length;
  //                 if(itemLgt > 1){
  //                     paginationEl = $(this).find('.swiper-pagination');
  //                     prevEl = $(obj).find('.swiper-button-prev');
  //                     nextEl = $(obj).find('.swiper-button-next');
  //                     $(this).addClass('swiper');
  //                     _swiper[index] = new Swiper($(this).find('.swiper-container'), {
  //                         speed: 400,
  //                         spaceBetween: 30,
  //                         navigation: {
  //                             nextEl: $(obj).find('.swiper-button-next'),
  //                             prevEl: $(obj).find('.swiper-button-prev'),
  //                         },
  //                         on: {
  //                             init : function(){
  //                                 buttonStyle(this.realIndex);
  //                                 paginationEl.html('<span class="count eng-title"><span class="current">' + (this.realIndex + 1) + '</span><span class="total">/' + itemLgt + '</span></span>');
  //                             },
  //                             slideChange : function(){
  //                                 paginationEl.find('.current').text(this.realIndex + 1);
  //                                 buttonStyle(this.realIndex);
  //                             }
  //                         }
  //                     });
  //                 }
  //             }
  //         });
  //     }
  //     function currentSwiper(idx){
  //         swiperEl.removeClass('swiper');
  //         swiperEl.removeClass('in');
  //         swiperEl.eq(idx).addClass('in');
  //     }
  //     function buttonStyle(currentIdx){
  //         itemIdx = currentIdx;
  //
  //         if(itemIdx === 0){
  //             nextEl.removeClass('off');
  //             prevEl.addClass('off');
  //         } else if(itemLgt-1 === itemIdx){
  //             prevEl.removeClass('off');
  //             nextEl.addClass('off');
  //         } else {
  //             nextEl.removeClass('off');
  //             prevEl.removeClass('off');
  //         }
  //     }
  //
  //     return{
  //         init:init
  //     }
  // })();

  // 브랜드 채널 스와이프
  var brandChannelSwiper = (function () {
    var el, containerEl, countEl, _swiper, isLoad;
    var itemLgt, _option;

    function init() {
      el = $('.js-brand-channel');
      containerEl = el.find('.swiper-container');
      countEl = el.find('.swiper-count');

      itemLgt = el.find('.swiper-slide').length;
      isLoad = el.length === 0 || itemLgt === 1;

      if (isLoad) {
        return false;
      }
      bindEvent();
      //2019-11-12, 정재홍, 웹접근성 보완을 위한 초첨 이동
      $('.swiper-slide-duplicate').attr('aria-hidden', 'true').attr('tabindex', '-1');
      $('.swiper-slide-duplicate a').attr('aria-hidden', 'true').attr('tabindex', '-1');
    }

    function bindEvent() {
      typeFn();
    }

    function typeFn() {
      if (itemLgt <= 3) {
        _option = {
          keyboard: {
            enabled: true,
            onlyInViewport: false,
          },
          slidesPerView: 'auto',
          centeredSlides: true,
          speed: 400,
          spaceBetween: 30,
          loop: true,
          navigation: {
            nextEl: el.find('.swiper-button-next'),
            prevEl: el.find('.swiper-button-prev'),
          },
          pagination: {
            el: el.find('.swiper-pagination'),
            clickable: true,
          },
          on: {
            init: function () {
              countEl.html('<span class="count eng-title"><span class="current">' + (this.realIndex + 1) + '</span><span class="total"> / ' + itemLgt + '</span></span>');
            },
            slideChange: function () {
              countEl.find('.current').text(this.realIndex + 1);
            }
          }
        }
      }

      _swiper = new Swiper(containerEl, _option);

      el.find('.js-swiper-play').on('click', function () {
        var $this = $(this);

        if ($this.hasClass('stop')) {
          $this.removeClass('stop').find('span').text('정지');
          _swiper.autoplay.start();
        } else {
          $this.addClass('stop').find('span').text('재생');
          _swiper.autoplay.stop();
        }
      });
    }

    return { init: init }
  })();
  brandChannelSwiper.init();

  // 브랜드 비비고 스와이프
  var bibigoSwiper = (function () {
    var el, containerEl, countEl, titleEl, descEl, _swiper, isLoad;
    var itemLgt, _option;

    function init() {
      el = $('.js-bibigo-swiper');
      containerEl = el.find('.swiper-container');
      countEl = el.find('.swiper-count');
      titleEl = el.find('.product');
      descEl = el.find('.description p');

      itemLgt = el.find('.swiper-slide').length;
      isLoad = el.length === 0 || itemLgt === 1;

      if (isLoad) {
        return false;
      }
      bindEvent();
    }

    function bindEvent() {
      typeFn();
    }

    function typeFn() {
      _option = {
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
        slidesPerView: 'auto',
        centeredSlides: true,
        speed: 400,
        spaceBetween: 53,
        loop: true,
        slideActiveClass: 'active',
        navigation: {
          nextEl: el.find('.swiper-button-next'),
          prevEl: el.find('.swiper-button-prev'),
        },
        pagination: {
          el: el.find('.swiper-pagination'),
          clickable: true,
        },
        on: {
          init: function () {
            countEl.html('<span class="count eng-title"><span class="current">' + (this.realIndex + 1) + '</span><span class="total"> / ' + itemLgt + '</span></span>');
          },
          slideChange: function () {
            countEl.find('.current').text(this.realIndex + 1);
            titleEl.removeClass('in');
            descEl.removeClass('in');
            titleEl.eq(this.realIndex).addClass('in');
            descEl.eq(this.realIndex).addClass('in');
          }
        }
      }

      _swiper = new Swiper(containerEl, _option);

      el.find('.js-swiper-play').on('click', function () {
        var $this = $(this);

        if ($this.hasClass('stop')) {
          $this.removeClass('stop').find('span').text('정지');
          _swiper.autoplay.start();
        } else {
          $this.addClass('stop').find('span').text('재생');
          _swiper.autoplay.stop();
        }
      });
    }

    return { init: init }
  })();
  bibigoSwiper.init();
  // $document.on('contextmenu', function() {
  //     alert('본 디자인은 초기 시안으로 외부 유출 및 공유를 금지합니다.');
  //     return false;
  // });

  // var inView = new InView('.js-inview');

  var initInview = function (_selector, _options) {
    var $items = $(_selector);
    var _defaults = {
      classToggle: 'is-inview',
      classOnce: 'is-inviewed',
      range: {
        top: 0.15, // 상단 마진, 윈도우 크기에서 몇 퍼센트 (0.25);
        bottom: 0.15 // 하단 마진, 윈도우 크기에서 몇 퍼센트 (0.25);
      }
    };
    var _opts = $.extend({}, _defaults, _options);
    var _length = $items.length;
    if (!_length) return false;
    var _timerInview = null;
    var _core = function () {
      clearTimeout(_timerInview);
      for (var i = 0; i < _length; i++) {
        var $this = $items.eq(i),
          _bool = $.isInview($this, _opts.range),
          _fired = $this.hasClass(_opts.classOnce),
          _hasClass = $this.hasClass(_opts.classToggle);
        if (_fired !== true && _bool === true) {
          $this.toggleClass(_opts.classOnce, true);
        }
        if (_hasClass === true && _bool !== true) {
          $this.toggleClass(_opts.classToggle, false);
        } else if (_hasClass !== true && _bool === true) {
          $this.toggleClass(_opts.classToggle, true);
        }
      }
    };
    $window.on('load scroll resize', function () {
      _core();
    });
    setTimeout(function () {
      _core();
    }, 500);
  };
  initInview('.js-inview');
  initInview('.js-inview-container', {
    classOnce: 'is-inviewed-container',
    range: {
      top: 0.2, // 상단 마진, 윈도우 크기에서 몇 퍼센트 (0.25);
      bottom: 0.4 // 하단 마진, 윈도우 크기에서 몇 퍼센트 (0.25);
    }
  });
  $('.section-visual.js-inview').addClass('is-inviewed'); // polyfill
  if ($('.page-innovation-rnd-introduce').length) {
    setTimeout(function () {
      $('.page-innovation-rnd-introduce #visual .js-inview').addClass('is-inviewed'); // innovation main title
    }, 500);
  }

  $window.on('load', function () {
    setTimeout(function () {
      $html.addClass('is-loaded');
    }, 10);
  });

  var doResizeFrame = function () { // ir iframe
    if (!$body.hasClass('page-ir')) return false;
    var boolIE = $html.hasClass('ie');
    var $iframe = $('#irIframe');
    var _timerIframe = null;
    var _core = function () {
      if ($iframe.hasClass('is-loaded')) return false;
      $iframe.iFrameResize({ // iframe resizer
        log: false,
        bodyMargin: '0px auto 100px auto'
      }, $iframe);
      $iframe.addClass('is-loaded');
    }
    if ($iframe.length && typeof iFrameResize == 'function') {
      if (boolIE === true) {
        _timerIframe = setTimeout(function () {
          _core();
        }, 200);
      }
      $iframe.on('load', function () {
        _core();
      });
    }
  };
  doResizeFrame();
  /**
   * 임시용이라 제거함(개발)
   */
  /*if (bodyClass.indexOf('page-brand') > -1) {
      // 데모용 임시 링크
      $('.brand-products .item a').each(function(){
          var $this = $(this);
          if ($this.attr('href').indexOf('javascript') > -1) {
              $this.attr('href', 'http://www.cjonmart.net/shopping/product/productRead.do?pcd=30100106');
              $this.attr('target', '_blank');
          }
      });
  }*/

  // 영문, 지속가능경영 목표
  $('.lang-en .csr-purpose-d').equalHeight({ // equalHeight
    items: '.module'
  });

});

$(function () {

  var $document = $(document);
  var $html = $('html');

  var $header = $('#header');
  var $d1 = $header.find('li.d1');
  var _timerLeave = null;
  var _timerAnimClose = null;
  var _animClose = false;

  var $navigation = $('#header .navigations');

  var initNavigation = function () {

    $d1 = $header.find('li.d1');

    $d1.each(function () {
      var $this = $(this);
      var _bool = $this.find('.sub-d3').length > 0;
      $this.toggleClass('no-d3', !_bool);
    });

    $document.on('mouseenter', '#header', function (e) {
      $html.toggleClass('is-header-over', true);
    });

    $document.on('mouseenter focus', '#header li.d1', function (e) { // 키보드 탐색 포함
      clearTimeout(_timerLeave);
      e.preventDefault();
      var $this = $(e.target);
      if (_animClose === true) return false;
      $this = $this.is('li.d1') ? $this : $this.closest('li.d1');
      $this.addClass('in').siblings().removeClass('in');
      $html.toggleClass('is-header-over', true);
      $html.removeClass('is-toggle-language is-toggle-user is-toggle-social');
    });

    $document.on('mouseleave', '#header', function (e) {
      clearTimeout(_timerLeave);
      var $this = $(e.target);
      // $this = $this.is('li.d1') ? $this : $this.closest('li.d1');
      _timerLeave = setTimeout(function () {
        $('#header li.d1.in').removeClass('in');
        $html.toggleClass('is-header-over', false);
      }, 400);
    });
    $document.on('click', '.js-close-submenu', function (e) {
      e.preventDefault();
      clearTimeout(_timerAnimClose);
      $('li.d1').removeClass('in');
      _animClose = true;
      _timerAnimClose = setTimeout(function () {
        _animClose = false;
      }, 600);
    });

    // menuAim
    $.fn.menuaim = function () {
      this.each(function () {
        var $this = $(this);
        var activateSubmenu = function (row) {
          var $row = $(row),
            $submenu = $row.find('.sub-d3');
          $submenu.addClass('in');
          $row.find('a.d2').addClass('in');
          //console.log('active d3');
        };
        var deactivateSubmenu = function (row) {
          var $row = $(row),
            $submenu = $row.find('.sub-d3');
          $submenu.removeClass('in');
          $row.find('a.d2').removeClass('in');
        };
        $this.menuAim({
          activate: activateSubmenu,
          deactivate: deactivateSubmenu
        });
      });
    };

    $('.suit-classic .js-menu-aim').menuaim();  // init

    $('.js-menu-aim a.d2').on('focus', function (e) { // 키보드 탐색
      var $this = $(e.target);
      $this = ($this.is('a')) ? $this : $this.closest('a');
      $this.parent().prev().find('.sub-d3').removeClass('in');
      $this.next().toggleClass('in');
    });

  };

  // console.log(window.setting);

  if (window.setting !== undefined && window.setting.dev === true) { // 개발모드에서 _navigation.html 불러오기

    var _hostname = location.pathname,
      _headerPath = window.setting.path.header,
      _footerPath = window.setting.path.footer;
    var _replace = '.html';

    if (_hostname.indexOf('_en') > -1) { // 영문
      _replace = '_en.html';
    } else if (_hostname.indexOf('_cn') > -1) { // 중문
      _replace = '_cn.html';
    }
    _headerPath = _headerPath.replace('.html', _replace);
    _footerPath = _footerPath.replace('.html', _replace);

    var $breadcrumb = $('#header .breadcrumb'); // breadcrumb
    var _breadcrumb = null;
    if ($breadcrumb.length) {
      _breadcrumb = $breadcrumb.html();
    }

    $('<div />').load(_headerPath, function (_response) {
      var $sandbox = $('<div />').html(_response);
      var _html = $sandbox.children().html();
      $('#header').empty().html(_html);
      initNavigation(); // 초기화

      if (_breadcrumb !== null) { // breadcrumb
        $('#header .breadcrumb').html(_breadcrumb);
      }
      $('<div />').load(_footerPath, function (_response) {
        var $sandbox = $('<div />').html(_response);
        var _html = $sandbox.children().html();
        $('#footer').empty().html(_html);
      });
    });

  } else {
    initNavigation(); // 초기화
  }

});
