$(function () {

  'use strict';

  var $window = window.$window || $(window),
    $document = window.$document || $(document),
    $html = window.$html || $('html'),
    $header = window.$header || $('#header');

  var bodyClass = $('body').attr('class');

  var toggleHtmlClass = function (e) {
    var $this = $(e.target);
    $this = ($this.is('a')) ? $this : $this.closest('a');
    var _class = $this.attr('data-class');
    $html.toggleClass(_class);
  };

  // element toggle
  $document.on('click', '.js-toggle-el', function (e) {
    var $this = $(e.target);
    $this = ($this.is('a')) ? $this : $this.closest('a');
    if ($this.data('prevent') !== 'false') {
      e.preventDefault();
    }
    var _href = $this.attr('href');
    if (_href.indexOf('#') < 0) {
      _href = '#' + $this.data('id');
    }
    var _targetEl = $(_href);
    var _parentEl = $this.attr('data-parent');
    if (_parentEl) {
      $this.closest(_parentEl).addClass('in').siblings().removeClass('in');
    }
    $this.toggleClass('in');
    _targetEl.toggleClass('in').siblings().removeClass('in');
  });

  $document.on('click', '.js-active-el', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    $this = ($this.is('a')) ? $this : $this.closest('a');
    var _targetEl = $($this.attr('href')),
      _parentEl = $this.data('parent');
    if (_parentEl) {
      $this.closest(_parentEl).addClass('in').siblings().removeClass('in');
    }
    $this.addClass('in');
    _targetEl.addClass('in').siblings().removeClass('in');
  });

  // html toggle class
  $document.on('click', '.js-toggle-html', function (e) {
    e.preventDefault();
    toggleHtmlClass(e);
  });

  // header
  $document.on('click', '.js-toggle-html-header', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    $this = ($this.is('a')) ? $this : $this.closest('a');
    var _class = $this.attr('data-class');
    if (_class == 'is-toggle-language') {
      $html.removeClass('is-toggle-social is-toggle-user is-toggle-search');
    } else if (_class == 'is-toggle-social') {
      $html.removeClass('is-toggle-language is-toggle-user is-toggle-search');
    } else if (_class == 'is-toggle-user') {
      $html.removeClass('is-toggle-language is-toggle-social is-toggle-search');
    } else if (_class == 'is-toggle-search') {
      $html.removeClass('is-toggle-language is-toggle-social is-toggle-user');
      if (!$html.hasClass('is-toggle-search')) {
        var $field = $header.find('input.text');
        $field.val('');
        setTimeout(function () {
          $field.focus();
        }, 30);
        $html.addClass('is-overlay');
      } else {
        $html.removeClass('is-overlay');
      }
    }
    $html.toggleClass(_class);
    $('#header li.d1.in').removeClass('in');
  });

  $document.on('focus', '#header .utils a', function (e) { // 키보드 탐색
    $html.removeClass('is-overlay is-header-over');
    $('li.d1.in').removeClass('in');
  });

  $document.on('focusout', '#closeSearch', function (e) { // 키보드 탐색
    $html.removeClass('is-toggle-search is-overlay');
    $('.d1-social a.js-toggle-html-header').trigger('focus');
  });

  // collapse
  $document.on('click', '.js-toggle-collapse', function (e) {
    var $this = $(e.target);
    var $parent = $this.closest('.collapse-item');
    var $sr = $this.find('em');
    $parent.toggleClass('in');
    if ($parent.hasClass('in')) {
      $sr.text('접기');
    } else {
      $sr.text('펼치기');
    }
  });

  // collapse single
  $document.on('click', '.js-toggle-collapse-single', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    var $parent = null;
    var $sr = $this.find('em');
    $this = ($this.is('a')) ? $this : $this.closest('a');
    $parent = $this.closest('.collapse-item');
    var _boolToggle = ($this.data('toggle') !== 'false'); // data-toggle 이 off 가 아니면, 토글기능 해제
    if (_boolToggle === true) {
      $parent.addClass('in');
      $sr.text('접기');
    } else {
      $parent.toggleClass('in');
      $sr.text('펼치기');
    }
    $parent.siblings().removeClass('in');
  });

  var timerTouch = null;

  // touch 감지
  // $document.on('touchstart', function(e) {
  //     clearTimeout(timerTouch);
  //     $html.addClass('touchstart');
  //     timerTouch = setTimeout(function() {
  //         $html.removeClass('touchstart');
  //     }, 600);
  // });

  // 탭
  $(".js-tab .in a").attr("title", "활성화된 탭");

  var _activeTab = function (_el) {
    var $tab = _el || $('.js-tab');
    var _activeText = '현재 탭';
    var _deactiveText = '활성화된 탭';
    $tab.each(function () {
      var $li = $(this).find('li');
      var $active = $li.filter('.in');
      $li.find('a').attr('title', '탭 선택');
      $active.find('a').attr('title', '현재 탭');
    });
  };

  $document.on('click', '.js-tab li a', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    $this = ($this.is('a')) ? $this : $this.closest('a');
    $this.closest('li').addClass('in').siblings().removeClass('in');
    _activeTab($this.closest('.js-tab')); // 대체 텍스트 보강

    if ($this.attr('href').indexOf('#') > -1) {
      var $target = $($this.attr('href'));
      if ($target.length) {
        var $wrap = $target.closest('.toggle-wrap');
        if ($wrap.length) { // .toggle
          $target.addClass('in').siblings().removeClass('in');
        } else { // .tab-cont
          var $tabContent = $(".tab-cont");
          if ($tabContent.length) {
            $tabContent.hide();
            $target.show();
          }
        }
      }
    }

  });

  // css 체크박스
  $document.on('click', 'a.css-checkbox', function (e) {
    var $this = $(e.target);
    $this = $this.is('a') ? $this : $this.closest('a');
    $this.prev().trigger('click');
    return false;
  });

  // 인쇄하기
  $document.on('click', '.js-print', function (e) {
    e.preventDefault();
    window.print();
  });

  // 인쇄하기
  $document.on('click', 'a[href="#top"]', function (e) {
    e.preventDefault();
    $('html, body').stop().animate({
      'scrollTop': 0
    }, 300);
  });

  // 파일 찾기 추가
  $document.on('change', '.file-wrap input[type="file"]', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    var $field = $this.closest('div').find('input[type="text"]').eq(0);
    var _val = $this.prop('files')[0].name || $this.val();
    $field.val(_val);
  });

  $document.on('keypress', '.file-wrap label[for]', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    if (e.keyCode == 13) {
      $this.trigger('click');
    }
  });

  // 파일 찾기 추가
  $document.on('click', '.file-wrap .js-file-add', function (e) {
    e.preventDefault();
    var $this = $(e.target),
      $wrap = $this.closest('.file-wrap'),
      $active = $wrap.find('.file-item.in'),
      $deactive = $wrap.find('.file-item').not('.in');
    var $target = $deactive.eq(0);
    $target.addClass('in').find('input').val('');
  });

  // 파일 찾기 제거
  $document.on('click', '.file-wrap .js-file-remove', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    $this.closest('.file-item').removeClass('in');
    $this.closest('div').find('input[type="text"]').val('');
  });

  // combobox
  $document.on('click', '.js-jumpmenu', function (e) {
    e.preventDefault();
    $document.off('.combobox');
    var $this = $(e.target);
    $this = ($this.is('a')) ? $this : $this.closest('a');
    var $combobox = $this.closest('.combobox');
    var $sr = $this.find('em');
    $combobox.toggleClass('in');
    var _checkSr = function () {
      if ($combobox.hasClass('in')) {
        $sr.text('목록 닫기');
        $this.attr('aria-expanded', 'true');
      } else {
        $sr.text('목록 열기');
        $this.attr('aria-expanded', 'false');
      }
    }
    _checkSr();
    $document.on('click.combobox', function (e) { // combobox 닫기
      var $clickedEl = $(e.target);
      if ($combobox.hasClass('in') && $clickedEl.closest('.combobox').length < 1) {
        $combobox.removeClass('in');
        _checkSr();
      }
    });

  });

  // combobox
  $document.on('click', '.combobox-scroll-inner a', function (e) {
    var $this = $(e.target);
    $this.closest('.combobox').removeClass('in');
  });

  // 브랜드 툴팁
  $document.on('click', '.tooltip-button', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    if (!$this.closest('.js-tooltip').hasClass('in')) {
      $('.tooltip-button').closest('.js-tooltip').removeClass('in');
      $this.closest('.js-tooltip').addClass('in');
      $this.find('em').text('상세 닫기');
    } else {
      $this.closest('.js-tooltip').removeClass('in');
      $this.find('em').text('상세 보기');
    }
  });

  // footer 연관 페이지
  $document.on('click', '.section-util-links a', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    $this = ($this.is('a')) ? $this : $this.closest('a');
    var $target = $($this.attr('href')),
      _marginTop = 160, // 보강 필요
      _to = $target.offset().top - _marginTop;
    $('html, body').stop().animate({
      'scrollTop': _to
    }, 80);
  });

  // 동영상 재생
  $document.on('click', '.js-toggle-youtube', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    $this = ($this.is('a')) ? $this : $this.closest('a');
    var _href = $this.attr('href');
    var _html = '<iframe title="동영상 영역" width="960" height="480" src="' + _href + '?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    var $container = $this.closest('.container'),
      $videoWrap = $container.find('.media-wrap'),
      $toggle = $container.find('.toggle');
    $videoWrap.addClass('media-aspect').html(_html);
    $this.hide();
    $toggle.addClass('in');
  });

  $document.on('keypress', 'input.css-checkbox', function (e) {
    var _key = e.key;
    if (_key !== undefined) {
      if (_key.toLowerCase() == 'enter') {
        var $this = $(e.target);
        $this.next('label').trigger('click');
      }
    }
  });

  if (bodyClass.indexOf('page-about') > -1) { // about
    $document.on('focus', '.business-major-items .action a', function (e) {
      var $this = $(e.target),
        $item = $this.closest('.item');
      $item.addClass('in').siblings().removeClass('in');
    });
    $document.on('click', '.history-nav a', function (e) { // history 구분
      e.preventDefault();
      var $this = $(this),
        _target = $this.data('target');
      $this.addClass('in').siblings().removeClass('in');
      $('#timeline').removeClass().addClass('is-' + _target);
    });
  }

});

$(function () { // google tag manager

  var $document = window.$document || $(document),
    $html = window.$html || $('html');

  var initGtag = function () { // gtag 관련 모듈
    var _language = '국문';
    _language = ($html.attr('lang') == 'en') ? '영문' : _language;
    _language = ($html.attr('lang') == 'zh') ? '중문' : _language;

    var sendGoogleTag = function (_el, _data) {
      if (typeof _data !== 'object') {
        console.log('gtag error');
        return false;
      }
      var _event = _data[0].trim(),
        _label = _data[1].trim();
      if (typeof gtag !== 'undefined') {
        console.log('sendGoogleTag', _event, _language, _label);
        gtag('event', _event, { 'event_category': _language, 'event_label': _label });
      }
    };

    // google tag assistant
    // gtag('event', 'aaa', {'event_category' : 'bbb','event_label' : 'ccc'});
    $document.on('click', '.js-gtag', function (e) {
      var $this = $(e.target);
      $this = ($this.is('a')) ? $this : $this.closest('a');
      var _data = $this.data('gtag'),
        _event = '',
        _label = '';
      if (_data === undefined || _data.indexOf(',') < 0) {
        console.log('gtag error');
      } else {
        _data = _data.split(',');
        _event = _data[0].trim();
        _label = _data[1].trim();
        sendGoogleTag($this, [_event, _label]);
      }
    });

  };

  initGtag();

});
