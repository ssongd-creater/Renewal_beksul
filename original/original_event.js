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

  $document.on('focus', '#header .utils a', function (e) { // ????????? ??????
    $html.removeClass('is-overlay is-header-over');
    $('li.d1.in').removeClass('in');
  });

  $document.on('focusout', '#closeSearch', function (e) { // ????????? ??????
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
      $sr.text('??????');
    } else {
      $sr.text('?????????');
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
    var _boolToggle = ($this.data('toggle') !== 'false'); // data-toggle ??? off ??? ?????????, ???????????? ??????
    if (_boolToggle === true) {
      $parent.addClass('in');
      $sr.text('??????');
    } else {
      $parent.toggleClass('in');
      $sr.text('?????????');
    }
    $parent.siblings().removeClass('in');
  });

  var timerTouch = null;

  // touch ??????
  // $document.on('touchstart', function(e) {
  //     clearTimeout(timerTouch);
  //     $html.addClass('touchstart');
  //     timerTouch = setTimeout(function() {
  //         $html.removeClass('touchstart');
  //     }, 600);
  // });

  // ???
  $(".js-tab .in a").attr("title", "???????????? ???");

  var _activeTab = function (_el) {
    var $tab = _el || $('.js-tab');
    var _activeText = '?????? ???';
    var _deactiveText = '???????????? ???';
    $tab.each(function () {
      var $li = $(this).find('li');
      var $active = $li.filter('.in');
      $li.find('a').attr('title', '??? ??????');
      $active.find('a').attr('title', '?????? ???');
    });
  };

  $document.on('click', '.js-tab li a', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    $this = ($this.is('a')) ? $this : $this.closest('a');
    $this.closest('li').addClass('in').siblings().removeClass('in');
    _activeTab($this.closest('.js-tab')); // ?????? ????????? ??????

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

  // css ????????????
  $document.on('click', 'a.css-checkbox', function (e) {
    var $this = $(e.target);
    $this = $this.is('a') ? $this : $this.closest('a');
    $this.prev().trigger('click');
    return false;
  });

  // ????????????
  $document.on('click', '.js-print', function (e) {
    e.preventDefault();
    window.print();
  });

  // ????????????
  $document.on('click', 'a[href="#top"]', function (e) {
    e.preventDefault();
    $('html, body').stop().animate({
      'scrollTop': 0
    }, 300);
  });

  // ?????? ?????? ??????
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

  // ?????? ?????? ??????
  $document.on('click', '.file-wrap .js-file-add', function (e) {
    e.preventDefault();
    var $this = $(e.target),
      $wrap = $this.closest('.file-wrap'),
      $active = $wrap.find('.file-item.in'),
      $deactive = $wrap.find('.file-item').not('.in');
    var $target = $deactive.eq(0);
    $target.addClass('in').find('input').val('');
  });

  // ?????? ?????? ??????
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
        $sr.text('?????? ??????');
        $this.attr('aria-expanded', 'true');
      } else {
        $sr.text('?????? ??????');
        $this.attr('aria-expanded', 'false');
      }
    }
    _checkSr();
    $document.on('click.combobox', function (e) { // combobox ??????
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

  // ????????? ??????
  $document.on('click', '.tooltip-button', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    if (!$this.closest('.js-tooltip').hasClass('in')) {
      $('.tooltip-button').closest('.js-tooltip').removeClass('in');
      $this.closest('.js-tooltip').addClass('in');
      $this.find('em').text('?????? ??????');
    } else {
      $this.closest('.js-tooltip').removeClass('in');
      $this.find('em').text('?????? ??????');
    }
  });

  // footer ?????? ?????????
  $document.on('click', '.section-util-links a', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    $this = ($this.is('a')) ? $this : $this.closest('a');
    var $target = $($this.attr('href')),
      _marginTop = 160, // ?????? ??????
      _to = $target.offset().top - _marginTop;
    $('html, body').stop().animate({
      'scrollTop': _to
    }, 80);
  });

  // ????????? ??????
  $document.on('click', '.js-toggle-youtube', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    $this = ($this.is('a')) ? $this : $this.closest('a');
    var _href = $this.attr('href');
    var _html = '<iframe title="????????? ??????" width="960" height="480" src="' + _href + '?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
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
    $document.on('click', '.history-nav a', function (e) { // history ??????
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

  var initGtag = function () { // gtag ?????? ??????
    var _language = '??????';
    _language = ($html.attr('lang') == 'en') ? '??????' : _language;
    _language = ($html.attr('lang') == 'zh') ? '??????' : _language;

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
