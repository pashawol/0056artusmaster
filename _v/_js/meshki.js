/*-------------OLD Browser Panel---------------------------------------*/

var interval;

/*Get browser version*/
function get_browser() {
  var ua = navigator.userAgent, tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'IE ' + (tem[1] || '');
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR\/(\d+)/)
    if (tem != null) {
      return 'Opera ' + tem[1];
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return M[0];
}

function get_browser_version() {
  var ua = navigator.userAgent, tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'IE ' + (tem[1] || '');
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR\/(\d+)/)
    if (tem != null) {
      return 'Opera ' + tem[1];
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return M[1];
}


var browser = get_browser();
var browser_version = get_browser_version();


/*-------------End OLD Browser Panel---------------------------------------*/


function InitPlayer() {
  $('.js_videoplayer').each(function () {
    var the_player_wrapper = $(this);
    var the_player = $('video', the_player_wrapper);


    the_player.mediaelementplayer({
      alwaysShowControls: true,
      startVolume: 1,
      features: ['playpause', 'volume', 'duration', 'progress', 'fullscreen'],
      success: function (mediaElement, domObject) {


        $('.play').on('click', function () {
          mediaElement.play();
        });
      }
    });
  });
  $('.mejs-time-current').css('width', '0px');

}

/*-------------------popup init-------------------*/
function InitPopup(popup) {

  if (typeof(popup) == 'object') {
    popup = $(popup);
    var cls = popup.attr('data-popup');
  }
  else {
    var cls = popup;
  }


  $('.custom-popup.' + cls).prev('.custom-overlay').fadeIn('100');

  $('.custom-popup.' + cls).fadeIn('300');


  if (cls == 'js_video_popup') {
    var video_target = popup.attr('href');
    $('.custom-popup.' + cls).find('video').attr('src', video_target);
    $('.page').addClass('blur');
    InitPlayer();
  }

  if (cls == 'js_video_youtube_popup') {
    var video_target = popup.attr('href');
    $('.custom-popup.' + cls).find('source').attr('src', video_target);
    $('.page').addClass('blur');
    InitPlayer();
  }


  if (cls == 'js_photo_gallery_popup') {
    $('.page').addClass('blur');
  }


}

/*-------------------end popup init-------------------*/


/*----------------------------------ALIGN POPUPS-------------------------*/
function AlignPopup() {
  $('.custom-popup').each(function () {
    if ($(this).outerWidth() > $(window).width() - 80 && $(this).outerHeight() + 80 > $(window).height()) {
      $(this).css({
        'position': 'absolute',
        'top': $(window).scrollTop() + 50 + 'px',
        'left': '40px'
      });
    }

    else if ($(this).outerHeight() + 80 > $(window).height()) {
      $(this).css({
        'position': 'absolute',
        'top': $(window).scrollTop() + 50 + 'px',
        'left': ($(window).width() - $(this).outerWidth()) / 2 + 'px'
      });
    }

    else if ($(this).outerWidth() > $(window).width() - 80) {
      $(this).css({
        'position': 'absolute',
        'top': $(window).scrollTop() + 50 + 'px',
        'left': '40px'
      });
    }

    else {
      $(this).css('top', ($(window).height() - $(this).outerHeight()) / 2 + 'px');
      $(this).css('left', ($(window).width() - $(this).outerWidth()) / 2 + 'px');
      $(this).css('position', 'fixed');
    }
  });


  if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/Blackberry/i)) {
    $('.custom-popup').addClass('mobilepopup');

    $('.custom-popup').each(function () {
      if ($(this).outerWidth() > $(window).width() && $(this).outerHeight() + 80 > $(window).height()) {
        $(this).css({
          'position': 'absolute',
          'top': $(window).scrollTop() + 50 + 'px',
          'left': '10px'
        });
      }

      else if ($(this).outerHeight() + 80 > $(window).height()) {
        $(this).css({
          'position': 'absolute',
          'top': $(window).scrollTop() + 50 + 'px',
          'left': ($(window).width() - $(this).outerWidth()) / 2 + 'px'
        });
      }

      else if ($(this).outerWidth() > $(window).width()) {
        $(this).css({
          'position': 'absolute',
          'top': $(window).scrollTop() + 50 + 'px',
          'left': '10px'
        });
      }

      else {
        $(this).css('top', ($(window).height() - $(this).outerHeight()) / 2 + 'px');
        $(this).css('left', ($(window).width() - $(this).outerWidth()) / 2 + 'px');
        $(this).css('position', 'absolute');
      }
    });
  }
}

/*----------------------------------END ALIGN POPUPS-------------------------*/


/*main item block price for one*/
function setMainItemPrice() {
  var mi_total_price_for_one = $('.js_mi_total_price_for_one');
  var mi_get_price_for_one = $('.row.active .price_block').html();
  mi_total_price_for_one.html(mi_get_price_for_one);
}

/*end main item block price*/


/*items blocks price for one*/
function setItemPrice() {
  $('.js_i_total_price_for_one').each(function () {
    var i_total_price_for_one = $(this);
    var i_get_price_for_one = $(this).closest('.js_item_block').find('.row.active .price_block').html();
    i_total_price_for_one.html(i_get_price_for_one);
  })
}

/*end items blocks price*/


/*count price on item page*/
function FinalMainItemPrice() {
  $('.js_mi_total_price, .js_i_total_price').each(function () {
    var amount = $(this).closest('.js_item_block').find('.js_counter_input').val().replace(/\s/g, '');
    var price = $(this).closest('.js_item_block').find('.row.active .hidden_price').html();
    price = price.replace(' ', '');
    price = parseFloat(price);
    amount = parseInt(amount);
    var final = (price * amount);
    final = number_format(final, 2, '.', ' ');
    $(this).html(final);
    changePriceView();
  });
}

/*end count price on item page*/

/*count cart price for item*/
function FinalCartItemPrice() {
  $('.js_item_block .js_cart_item_total_price').each(function () {
    var amount = $(this).closest('.js_item_block').find('.js_counter_input').val().replace(/\s/g, '');
    var price = $(this).closest('.js_item_block').find('.hidden_price').html();
    price = price.replace(' ', '');
    price = parseFloat(price);
    amount = parseInt(amount);
    var final = (price * amount);
    final = number_format(final, 2, '.', ' ');
    $(this).html(final);
    changePriceView();
    var hidden_total_item_price = $(this).closest('.js_item_block').find('.js_hidden_total_item_price');
    hidden_total_item_price.html(final);
  });
  showFinalCartResult();


  $('.js_item_not_available_block .js_cart_item_total_price').each(function () {
    var amount = $(this).closest('.js_item_not_available_block').find('.js_counter_input').val().replace(/\s/g, '');
    var price = $(this).closest('.js_item_not_available_block').find('.hidden_price').html();
    price = price.replace(' ', '');
    price = parseFloat(price);
    amount = parseInt(amount);
    var final = (price * amount);
    final = number_format(final, 2, '.', ' ');
    $(this).html(final);
    changePriceView();
    var hidden_total_item_price = $(this).closest('.js_item_not_available_block').find('.js_hidden_total_item_price');
    hidden_total_item_price.html(final);
  });
}

/*end count cart price for item*/

function UpdateCartQuantity() {
  $('#BasketRefresh').removeAttr('disabled');
  $.post($('#basket_form').attr('action'), $('#basket_form').serialize(), function (data) {
    $('#cart_items').html($(data).find('#cart_items'));
    setTimeout(function () {
      ItemCounter();
      changePriceView();
    }, 1);
    $('#BasketRefresh').attr('disabled');
  });
}

/*Final cart price*/
function showFinalCartResult() {
  var c = 0;
  $('.cart_block_holder .js_item_block').each(function () {
    var total_block = $(this);
    var totals = $('.hidden_total_item_price', total_block).html();
    totals = totals.replace(' ', '');
    totals = parseFloat(totals);
    c += totals;
  })
  c = number_format(c, 2, '.', ' ');
  $('.js_cart_final_price').html(c);
  changePriceView();
}

/*end Final cart price*/


/*(add green bg to active row Price/Amount in Item) */
function ItemCounterAmount() {
  $('.js_item_block').each(function () {
    var parent = $(this);
    $('.js_counter_input', parent).keyup(function () {
      InfoTextTooltip(parent);
      if ($(this).val().replace(/\s/g, '') >= 1000 || $(this).val() <= 1000) {
        $('.js_amount_price .row', parent).removeClass('active');
        $('.js_amount_price .row[data-amount=1000]', parent).addClass('active');
        setMainItemPrice();
        setItemPrice();
        FinalMainItemPrice();
        FinalCartItemPrice();
      }
      if ($(this).val().replace(/\s/g, '') >= 10000) {
        $('.js_amount_price .row', parent).removeClass('active');
        $('.js_amount_price .row[data-amount=10000]', parent).addClass('active');
        setMainItemPrice();
        setItemPrice();
        FinalMainItemPrice();
        FinalCartItemPrice();
      }
      if ($(this).val().replace(/\s/g, '') >= 20000) {
        $('.js_amount_price .row', parent).removeClass('active');
        $('.js_amount_price .row[data-amount=20000]', parent).addClass('active');
        setMainItemPrice();
        setItemPrice();
        FinalMainItemPrice();
        FinalCartItemPrice();
      }
      if ($(this).val().replace(/\s/g, '') >= 50000) {
        $('.js_amount_price .row', parent).removeClass('active');
        $('.js_amount_price .row[data-amount=50000]', parent).addClass('active');
        setMainItemPrice();
        setItemPrice();
        FinalMainItemPrice();
        FinalCartItemPrice();
      }
    });
    $('.js_counter_input', parent).change(function () {
      InfoTextTooltip(parent);
      if ($(this).val().replace(/\s/g, '') >= 1000 || $(this).val() <= 1000) {
        $('.js_amount_price .row', parent).removeClass('active');
        $('.js_amount_price .row[data-amount=1000]', parent).addClass('active');
        setMainItemPrice();
        setItemPrice();
        FinalMainItemPrice();
        FinalCartItemPrice();
      }
      if ($(this).val().replace(/\s/g, '') >= 10000) {
        $('.js_amount_price .row', parent).removeClass('active');
        $('.js_amount_price .row[data-amount=10000]', parent).addClass('active');
        setMainItemPrice();
        setItemPrice();
        FinalMainItemPrice();
        FinalCartItemPrice();
      }
      if ($(this).val().replace(/\s/g, '') >= 20000) {
        $('.js_amount_price .row', parent).removeClass('active');
        $('.js_amount_price .row[data-amount=20000]', parent).addClass('active');
        setMainItemPrice();
        setItemPrice();
        FinalMainItemPrice();
        FinalCartItemPrice();
      }
      if ($(this).val().replace(/\s/g, '') >= 50000) {
        $('.js_amount_price .row', parent).removeClass('active');
        $('.js_amount_price .row[data-amount=50000]', parent).addClass('active');
        setMainItemPrice();
        setItemPrice();
        FinalMainItemPrice();
        FinalCartItemPrice();
      }


    })
  })
}

/*(add green bg to active row Price/Amount in Item) */


function number_format(number, decimals, dec_point, thousands_sep) {	// Format a number with grouped thousands
  //
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +	 bugfix by: Michael White (http://crestidg.com)

  var i, j, kw, kd, km;

  // input sanitation & defaults
  if (isNaN(decimals = Math.abs(decimals))) {
    decimals = 2;
  }
  if (dec_point == undefined) {
    dec_point = ',';
  }
  if (thousands_sep == undefined) {
    thousands_sep = '.';
  }

  i = parseInt(number = (+number || 0).toFixed(decimals)) + '';

  if ((j = i.length) > 3) {
    j = j % 3;
  } else {
    j = 0;
  }

  km = (j ? i.substr(0, j) + thousands_sep : '');
  kw = i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands_sep);
  //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
  kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : '');


  return km + kw + kd;
}


function InfoTextTooltip(block) {
  //var row = block.find('.add_to_cart_block_1  .row').length;

  //alert($('.amount_price_block .row.active').index());
  console.log(block.find('.amount_price_block .rows .row.active').index());
  if (block.find('.amount_price_block .rows .row.active').index() >= 3) {
    var info_text = block.find('.amount_price_block .rows  .row:first-child').find('.row_left .inner').html();
    var info_text_2 = block.find('.amount_price_block .rows  .row:first-child').find('.row_right .inner').html();
    block.find('.item_counter .info_text').html(info_text + ' шт цена  ' + info_text_2);
    block.find('.info_text').addClass('hide');
  }
  else {
    var info_text = block.find('.amount_price_block .row.active').next().find('.row_left .inner').html();
    var info_text_2 = block.find('.amount_price_block .row.active').next().find('.row_right .inner').html();
    block.find('.item_counter .info_text').html(info_text + ' шт цена  ' + info_text_2);
    block.find('.info_text').removeClass('hide');
  }
}

function InfoTextTooltip2(block) {
  var info_text = block.find('.amount_price_block .rows  .row:first-child').find('.row_left .inner').html();
  var info_text_2 = block.find('.amount_price_block .rows  .row:first-child').find('.row_right .inner').html();
  var numb = block.find('.js_counter_input').val().match(/\d/g).join('');
  var min_amount = block.find('.js_counter_input').attr('data-min-value');

  if (numb == min_amount) {
    block.find('.item_counter .info_text').html('Минимальная партия ' + min_amount + ' шт');
  }
  else if (block.find('.amount_price_block .rows .row.active').index() <= 0) {
    /* var info_text = block.find('.amount_price_block .rows  .row:first-child').find('.row_left .inner').html();
     var info_text_2 = block.find('.amount_price_block .rows  .row:first-child').find('.row_right .inner').html();
     block.find('.item_counter .info_text').html(info_text+ ' шт цена  ' +info_text_2);
     block.find('.info_text').removeClass('hide');*/
    block.find('.item_counter .info_text').html('Минимальная партия ' + min_amount + ' шт');
  }
  else {
    var info_text = block.find('.amount_price_block .row.active').prev().find('.row_left .inner').html();
    var info_text_2 = block.find('.amount_price_block .row.active').prev().find('.row_right .inner').html();
    block.find('.item_counter .info_text').html(info_text + ' шт цена  ' + info_text_2);
    block.find('.info_text').removeClass('hide');
  }
}

/*---------------------ITEM COUNTER---------------------*/
function ItemCounter() {
  $('.js_item_block .js_counter_input').each(function () {
    var val = $(this).val().replace(/\s/g, '');
    var formatted_val = number_format(val, 0, '.', ' ');
    $(this).val(formatted_val);
  })

  $('.js_item_not_available_block .js_counter_input').each(function () {
    var val = $(this).val().replace(/\s/g, '');
    var formatted_val = number_format(val, 0, '.', ' ');
    $(this).val(formatted_val);
  })
  $('.js_item_not_available_block .js_counter').each(function () {
    var the_counter = $(this);
    var parent = $(this).closest('.js_item_not_available_block');

    $('.js_btn_counter_next', the_counter).unbind('click');
    $('.js_btn_counter_next', the_counter).click(function (e) {
      e.preventDefault();

      clearTimeout(interval);
      $(this).parent().parent().find('.info_text').fadeIn();
      interval = setTimeout(function () {
        $('.item_counter .info_text, .cart_items_block .item_counter .info_text').fadeOut();
      }, 5000);

      var step = $count = $('.js_counter_input', the_counter).attr('data-step');
      //alert(step);
      $count = $('.js_counter_input', the_counter).val().replace(/\s/g, '');
      if (step) {
        $count2 = parseInt($count) + parseInt(step);
      }
      else {
        $count2 = parseInt($count) + 1;
      }

      $count2 = number_format($count2, 0, '.', ' ');
      $('.js_counter_input', the_counter).val($count2);
      var input_value = $('.js_counter_input', parent).val().replace(/\s/g, '');
      FinalCartItemPrice();
      UpdateCartQuantity();
    })
    $('.js_btn_counter_prev', the_counter).unbind('click');
    $('.js_btn_counter_prev', the_counter).click(function (e) {
      e.preventDefault();
      if ($('.js_counter_input', the_counter).attr('data-min-value')) {
        var value = $('.js_counter_input', the_counter).attr('data-min-value');
        var count2;
        var step = $('.js_counter_input', the_counter).attr('data-step');
        var count = $('.js_counter_input', the_counter).val().replace(/\s/g, '');
        if (step) {
          count2 = parseInt(count) - parseInt(step);
        }
        else {
          count2 = parseInt(count) - 1;
        }
        if (count2 < parseInt(value)) count2 = value;
        count2 = number_format(count2, 0, '.', ' ');
        $('.js_counter_input', the_counter).val(count2);

      }
      else {
        count = $('.js_counter_input', the_counter).val();
        count2 = parseInt($count) - 1;
        if (count2 < 1) count2 = 1;
        $('.js_counter_input', the_counter).val(count2);
      }
      FinalCartItemPrice();
      UpdateCartQuantity();
    })
    $('.js_counter_input', the_counter).unbind('blur');
    $('.js_counter_input', the_counter).blur(function () {
      if ($('.js_counter_input').attr('data-min-value')) {
        var value = $('.js_counter_input').attr('data-min-value');
        $count = $('.js_counter_input', the_counter).val().replace(/\s/g, '');
        $count2 = parseInt($count);
        if ($count2 < value || $('.js_counter_input', the_counter).val().replace(/\s/g, '') == '') {
          $count2 = value;
          $('.js_counter_input', the_counter).val($count2);

        }
      }
      else {
        if ($('.js_counter_input', the_counter).val().replace(/\s/g, '') == '') {

          $('.js_counter_input', the_counter).val(1);
        }
      }
      $count2 = number_format($count2, 0, '.', ' ');
      $('.js_counter_input', the_counter).val($count2);
      FinalCartItemPrice();
      UpdateCartQuantity();
    })
  })


  $('.js_item_block .js_counter').each(function () {
    var the_counter = $(this);
    var parent = $(this).closest('.js_item_block');

    $('.js_btn_counter_next', the_counter).unbind('click');
    $('.js_btn_counter_next', the_counter).click(function (e) {
      e.preventDefault();


      clearTimeout(interval);
      $(this).parent().parent().find('.info_text').fadeIn();
      interval = setTimeout(function () {
        $('.item_counter .info_text, .cart_items_block .item_counter .info_text').fadeOut();
      }, 5000);

      var step = $count = $('.js_counter_input', the_counter).attr('data-step');
      //alert(step);
      $count = $('.js_counter_input', the_counter).val().replace(/\s/g, '');
      if (step) {
        $count2 = parseInt($count) + parseInt(step);
      }
      else {
        $count2 = parseInt($count) + 1;
      }
      $count2 = number_format($count2, 0, '.', ' ');


      InfoTextTooltip(parent);


      $('.js_counter_input', the_counter).val($count2);
      var input_value = $('.js_counter_input', parent).val().replace(/\s/g, '');
      if (input_value >= 1000 && input_value <= 9999) {
        $('.js_amount_price .row', parent).removeClass('active');
        $('.js_amount_price .row[data-amount=1000]', parent).addClass('active');
        setMainItemPrice();
        setItemPrice();
        FinalMainItemPrice();
        FinalCartItemPrice();
      }
      if (input_value >= 10000 && input_value <= 19999) {
        $('.js_amount_price .row', parent).removeClass('active');
        $('.js_amount_price .row[data-amount=10000]', parent).addClass('active');
        setMainItemPrice();
        setItemPrice();
        FinalMainItemPrice();
        FinalCartItemPrice();
      }
      if (input_value >= 20000 && input_value <= 49999) {
        $('.js_amount_price .row', parent).removeClass('active');
        $('.js_amount_price .row[data-amount=20000]', parent).addClass('active');
        setMainItemPrice();
        setItemPrice();
        FinalMainItemPrice();
        FinalCartItemPrice();
      }
      if (input_value >= 50000) {
        $('.js_amount_price .row', parent).removeClass('active');
        $('.js_amount_price .row[data-amount=50000]', parent).addClass('active');
        setMainItemPrice();
        setItemPrice();
        FinalMainItemPrice();
        FinalCartItemPrice();
      }
      UpdateCartQuantity();
    })

    $('.js_btn_counter_prev', the_counter).unbind('click');
    $('.js_btn_counter_prev', the_counter).click(function (e) {

      e.preventDefault();

      clearTimeout(interval);
      $(this).parent().parent().find('.info_text').fadeIn();
      interval = setTimeout(function () {
        $('.item_counter .info_text, .cart_items_block .item_counter .info_text').fadeOut();
      }, 5000);


      InfoTextTooltip2(parent);


      if ($('.js_counter_input', the_counter).attr('data-min-value')) {
        var value = $('.js_counter_input', the_counter).attr('data-min-value');
        var count2;
        var step = $('.js_counter_input', the_counter).attr('data-step');
        var count = $('.js_counter_input', the_counter).val().replace(/\s/g, '');
        if (step) {
          count2 = parseInt(count) - parseInt(step);
        }
        else {
          count2 = parseInt(count) - 1;
        }
        if (count2 < parseInt(value)) count2 = value;
        count2 = number_format(count2, 0, '.', ' ');
        $('.js_counter_input', the_counter).val(count2);

      }
      else {
        count = $('.js_counter_input', the_counter).val();
        count2 = parseInt($count) - 1;
        if (count2 < 1) count2 = 1;
        $('.js_counter_input', the_counter).val(count2);
      }
      var input_value = $('.js_counter_input', parent).val().replace(/\s/g, '');
      if (input_value >= 1000 && input_value <= 9999) {
        $('.js_amount_price .row', parent).removeClass('active');
        $('.js_amount_price .row[data-amount=1000]', parent).addClass('active');
        setMainItemPrice();
        setItemPrice();
        FinalMainItemPrice();
        FinalCartItemPrice();
      }
      if (input_value >= 10000 && input_value <= 19999) {
        $('.js_amount_price .row', parent).removeClass('active');
        $('.js_amount_price .row[data-amount=10000]', parent).addClass('active');
        setMainItemPrice();
        setItemPrice();
        FinalMainItemPrice();
        FinalCartItemPrice();
        FinalCartItemPrice();
      }
      if (input_value >= 20000 && input_value <= 49999) {
        $('.js_amount_price .row', parent).removeClass('active');
        $('.js_amount_price .row[data-amount=20000]', parent).addClass('active');
        setMainItemPrice();
        setItemPrice();
        FinalMainItemPrice();
        FinalCartItemPrice();
      }
      if (input_value >= 50000) {
        $('.js_amount_price .row', parent).removeClass('active');
        $('.js_amount_price .row[data-amount=50000]', parent).addClass('active');
        setMainItemPrice();
        setItemPrice();
        FinalMainItemPrice();
        FinalCartItemPrice();
      }
      UpdateCartQuantity();
    })


    $('.js_counter_input', the_counter).unbind('blur');
    $('.js_counter_input', the_counter).blur(function () {

      InfoTextTooltip(parent);

      if ($('.js_counter_input').attr('data-min-value')) {
        var value = $('.js_counter_input').attr('data-min-value');
        $count = $('.js_counter_input', the_counter).val().replace(/\s/g, '');
        $count2 = parseInt($count);
        if ($count2 < value || $('.js_counter_input', the_counter).val().replace(/\s/g, '') == '') {
          $count2 = value;
          $('.js_counter_input', the_counter).val($count2);

        }
      }
      else {
        if ($('.js_counter_input', the_counter).val().replace(/\s/g, '') == '') {

          $('.js_counter_input', the_counter).val(1);
        }
      }

      var step = $('.js_counter_input', the_counter).attr('data-step');
      if (step && $count2) {
        if ($count2 % step != 0) {
          do {
            $count2 = $count2 + 1;
          } while ($count2 % step != 0)
        }
      }


      $count2 = number_format($count2, 0, '.', ' ');
      $('.js_counter_input', the_counter).val($count2);
      ItemCounterAmount();
      setMainItemPrice();
      setItemPrice();
      FinalMainItemPrice();
      FinalCartItemPrice();
      UpdateCartQuantity();
    })


  });
}

/*----------------END ITEM COUNTER-----------------*/


/*-------------------news blocks near to each other-------------------*/
function alignBlocks() {
  var $container = $('.js_align_blocks');
  $container.masonry({
    itemSelector: '.block'
  });
}

/*-------------------End news blocks near to each other-------------------*/


function posHoverBlockInSlider() {
  $('.js_items_slider').each(function () {
    var index3 = $(this).find('.swiper-slide-active').index() + 4;
    var index4 = $(this).find('.swiper-slide-active').index() + 5;

    $(this).find('.swiper-slide:nth-child(' + index3 + ')').addClass('left_pos_hover');
    $(this).find('.swiper-slide:nth-child(' + index4 + ')').addClass('left_pos_hover');

    $('.js_items_slider .js_swiper_next, .js_items_slider .js_swiper_prev').click(function () {
      var index3 = $(this).parent().find('.swiper-slide-active').index() + 4;
      var index4 = $(this).parent().find('.swiper-slide-active').index() + 5;
      //alert(index);
      $(this).parent().find('.swiper-slide').removeClass('left_pos_hover');
      $(this).parent().find('.swiper-slide:nth-child(' + index3 + ')').addClass('left_pos_hover');
      $(this).parent().find('.swiper-slide:nth-child(' + index4 + ')').addClass('left_pos_hover');
    })
  })
}

/*-------------------Tabs-------------------*/
function initTabs() {
  var isAnimating = false;
  $('[data-tab]').click(function (e) {
    e.preventDefault();

    if ($(this).hasClass('active')) {

    }
    else {
      if (!isAnimating) {
        var parent = $(this).parent().parent();
        var cls = $(this).attr('data-tab');
        var cls2 = $(this).attr('data-table-tab');
        //alert(cls2);
        isAnimating = true;
        $('[data-tab]', parent).removeClass('active');
        $(this, parent).addClass('active');

        if ($('.hidden_content').hasClass('active')) {
          $('.hidden_content.active', parent).fadeOut(300, function () {
            $('.hidden_content.active', parent).removeClass('active');
            $('.hidden_content' + '#' + cls, parent).fadeIn(300, function () {
              isAnimating = false;

              var items_slider2 = new Swiper('.js_items_slider2 .swiper-container', {
                slidesPerView: '5',
                spaceBetween: 25,
                loop: false,
                nextButton: '.js_items_slider2 .js_swiper_next',
                prevButton: '.js_items_slider2 .js_swiper_prev',
                mousewheelControl: false,
                simulateTouch: false
              });
              posHoverBlockInSlider();
            });
            $('.hidden_content' + '#' + cls, parent).addClass('active');
            $('.js_select select:visible').styler({
              selectSearch: false
            });

            var slides = '3';
            if ($(window).width() <= 680) slides = '2';
            if ($(window).width() <= 480) slides = '1';
            var similar_items_slider = new Swiper('.js_similar_items_slider .swiper-container', {
              slidesPerView: slides,
              spaceBetween: 70,
              loop: false,
              nextButton: '.js_similar_items_slider .js_swiper_next',
              prevButton: '.js_similar_items_slider .js_swiper_prev',
              mousewheelControl: false,
              simulateTouch: false
            });

          })
        }
        else {
          $('.hidden_content' + '#' + cls, parent).fadeIn(300, function () {
            isAnimating = false;
          });
          $('.hidden_content' + '#' + cls, parent).addClass('active');
        }


        if ($('.hidden_table_content').hasClass('active')) {
          $('.hidden_table_content.active').fadeOut(300, function () {
            $('.hidden_table_content.active').removeClass('active');
            $('.hidden_table_content' + '#' + cls2).fadeIn(300, function () {
              isAnimating = false;
            });
            $('.hidden_table_content' + '#' + cls2).addClass('active');
            $('.jspContainer').css('height', $('.compare_items').innerHeight() + $('.tables_from_tabs').innerHeight() + 'px');
          })
        }
        else {
          $('.hidden_table_content' + '#' + cls2).fadeIn(300, function () {
            isAnimating = false;
          });
          $('.hidden_table_content' + '#' + cls2).addClass('active');
        }


      }
    }
  });
  $('.hidden_content.active').fadeIn();
  $('.hidden_table_content.active').fadeIn();
}

/*-------------------end Tabs-------------------*/


function initFilterTabs() {
  var isAnimating = false;
  $('[data-filter]').click(function (e) {
    e.preventDefault();

    if ($(this).hasClass('active')) {

    }
    else {
      if (!isAnimating) {
        var cls = $(this).attr('data-filter');
        isAnimating = true;
        $('[data-filter]').removeClass('active');
        $(this, parent).addClass('active');

        if ($('.filter_content.hidden_content').hasClass('active')) {
          $('.filter_content.hidden_content.active').fadeOut(300, function () {
            $('.filter_content.hidden_content.active').removeClass('active');
            $('.filter_content.hidden_content' + '#' + cls).fadeIn(300, function () {
              isAnimating = false;

            });
            $('.filter_content.hidden_content' + '#' + cls).addClass('active');
          })
        }
        else {
          $('.filter_content.hidden_content' + '#' + cls).fadeIn(300, function () {
            isAnimating = false;
          });
          $('.filter_content.hidden_content' + '#' + cls).addClass('active');
        }

      }
    }
  });
  $('.filter_content.hidden_content.active').fadeIn();
}

/*-------------------end Tabs-------------------*/


/*-----------------CLEAR INPUT VALUE WHEN CLICK-----------------------*/
function doClear(theText) {
  if (theText.value == theText.defaultValue) {
    theText.value = ''
  }
}

function doDefault(theText) {
  if (theText.value == '') {
    theText.value = theText.defaultValue
  }
}

/*-------------------END CLEAR INPUT VALUE WHEN CLICK-----------------*/


/*Bookmarks panel*/
function init_small_side_panel() {

}

/*end Bookmarks panel*/


function ChooseFile() {
  if ($('.js_file_input').val() != '') {
    $('.js_file_value').html($('.js_file_input').val());
    $('.js_remove_file').css('display', 'block');
    $('.file_name_holder').css('display', 'inline-block');
  }
}


/*make cents in price upper*/
function changePriceView() {
  $.each($('.js_change_price'), function () {
    var price = $(this).html();
    $(this).html(price.replace(/(\D*)(\d+)([\.\,])(\d*)/, '<span class=js_"price_rub">$1</span><span class="js_price_rub">$2</span><span class="js_price_cent">$4</span><span style="width:15px; display:inline-block;"></span>'));
  });
}

/*make cents in price upper*/


$(window).resize(function () {
  AlignPopup();
  SetCatalogMenuHeight();

});

$(window).load(function () {
  alignBlocks();
});

$(window).scroll(function () {

  /* bottom button position*/
  var page_height = $('.page').height() - $('.footer').height() - $(window).height();
  var page_width = $(window).width();
  var scrollTop = $(window).scrollTop();
  // if (scrollTop >= page_height) {
  //   $('.recently_viewed_block_holder').addClass('stick_to_footer');
  //   $('.stick_to_footer').css('bottom', $('.footer').height() + 'px');
  // }
  // else {
  //   $('.recently_viewed_block_holder').removeClass('stick_to_footer');
  //   $('.recently_viewed_block_holder').css('bottom', '0');
  // }
  /* end bottom button position*/


  var scrolled_top = $(window).scrollTop();
  if (scrolled_top > 0) {
    $('.header_top_block').addClass('fixed');
    $('.header_main_page_top_block').css('margin-bottom', '70px');
  }
  else {
    $('.header_top_block').removeClass('fixed');

  }

  var elem = $('.search_input_holder');
  if (elem && elem.offset()) {
    var top = elem.offset().top + elem.outerHeight() - $(document).scrollTop();
    var height = $('.filter_menu_holder').height() + 35;
    if (top < 28) {
      $('.filter_menu_holder').addClass('fixed');
      elem.css('margin-bottom', '' + height + 'px');
    }
    else {
      $('.filter_menu_holder').removeClass('fixed');
      elem.css('margin-bottom', '0px');
    }
  }


  var height2 = $('.page').height() - $('.footer').height() - $('.cart_total_block').height() - 350;
  if (scrolled_top > height2) {
    $('.cart_headings_inner_holder').fadeOut();
  }
  else {
    $('.cart_headings_inner_holder').fadeIn();
  }


  if (scrolled_top > 134) {
    $('.cart_headings_inner_holder').addClass('fixed');
  }
  else {
    $('.cart_headings_inner_holder').removeClass('fixed');
    $('.cart_headings_inner_holder').fadeIn();
  }


  if ($('.cart_headings_inner_holder').hasClass('LK_cart_headings_inner_holder')) {
    if (scrolled_top > 190) {
      $('.cart_headings_inner_holder').addClass('fixed');
    }
    else {
      $('.cart_headings_inner_holder').removeClass('fixed');
    }
  }


  if ($('.page').hasClass('print_page')) {
    $('.header_LK_top_block').css('margin-bottom', '0px');
  }


  if (scrollTop > 400) {
    $('.btn_top').addClass('active');
  }
  else {
    $('.btn_top').removeClass('active');
  }

})


/*item catalog page filter*/
function catalogCheckFilter() {
  $('.catalog_filter_items_holder .block').each(function () {
    var parent = $(this);

    $('input[type=checkbox]', parent).each(function () {
      var legchecked = $('input[type=checkbox]:checked', parent).length;
      if (legchecked) {
        var id = $('input[type=checkbox]', parent).attr('data-remove-id');
        $('.btn_remove#' + id).addClass('active');
      }
      else {
        $('.btn_remove', parent).removeClass('active');
      }
    });
  })
}

/*item catalog page filter*/


/*choose product page filter*/
function ChooseProductCheckFilter() {
  $('.js_choose_products_block_filter').each(function () {
    var parent = $(this);
    var subtitle = $(this).find('.subtitle');

    $('input[type=checkbox]', parent).each(function () {
      var legchecked = $('input[type=checkbox]:checked', parent).length;
      if (legchecked) {
        var id = $('input[type=checkbox]', parent).attr('data-remove-id');
        $('.btn_remove#' + id, parent).addClass('active');

        var text_id = $('.js_all', parent).attr('id');
        var subtitle_text = '';

        $('input[type=checkbox]:checked', parent).each(function () {
          if ($(this).attr('data-id') == text_id) {
            subtitle_text += ' ' + $(this).parent().find('.label-text').html() + '<span class=\'comma\'>,</span>';
          }
        })

        subtitle.html(subtitle_text);
      }
      else {
        $('.btn_remove', parent).removeClass('active');
        subtitle.html('');
      }
    });
  })
}

/*end choose product page filter*/

/*choose product page filter*/
function ChooseProductRadioFilter() {
  $('.js_choose_products_block_filter').each(function () {
    var parent = $(this);
    $('input[type=radio]', parent).each(function () {
      var legchecked = $('input[type=radio]:checked', parent).length;
      if (legchecked) {
        var id = $('input[type=radio]', parent).attr('data-remove-id');
        $('.btn_remove#' + id, parent).addClass('active');
      }
      else {
        $('.btn_remove', parent).removeClass('active');
      }
    });
  })
}

/*end choose product page filter*/


/*registration page checkboxes functions*/
function RegistrationActivateRadio() {
  var represent_checkbox = $('.js_represent');
  var isCheked = represent_checkbox.prop('checked');
  if (isCheked == true) {
    represent_checkbox.closest('.represent_block').find('input[type=radio]').removeAttr('disabled');
  }
  else if (isCheked == false) {
    represent_checkbox.closest('.represent_block').find('input[type=radio]').attr('disabled', true);
    represent_checkbox.closest('.represent_block').find('input[type=radio]').attr('checked', false);
    $('.registration_bottom_block').slideUp();
  }
}


function RegistrationShowAdresses() {
  var radiochecked = $('.represent_block  input[type=radio]:checked').length;
  if (radiochecked) {
    $('.registration_bottom_block').slideDown();
  }
  else {
    $('.registration_bottom_block').slideUp();
  }
}


function showDeliveryAddress() {
  $('.js_fill_delivery_address').each(function () {
    var delivery_checkbox = $(this);
    var isCheked = delivery_checkbox.prop('checked');
    if (isCheked == true) {
      delivery_checkbox.closest('.js_register_form').find('.register_delivery_block').slideDown();

      delivery_checkbox.closest('.js_register_form').find('.register_delivery_block').find('select, textarea, input').removeAttr('disabled');

    }
    else if (isCheked == false) {

      delivery_checkbox.closest('.js_register_form').find('.register_delivery_block').find('select, textarea, input').attr('disabled', 'disabled');

      delivery_checkbox.closest('.js_register_form').find('.register_delivery_block').slideUp();
      delivery_checkbox.closest('.js_register_form').find('.register_delivery_block input').val('');
      delivery_checkbox.closest('.js_register_form').find('.js_delivery_street option').eq(0).prop('selected', true);
      delivery_checkbox.closest('.js_register_form').find('.js_delivery_street li').removeClass('sel selected');
      delivery_checkbox.closest('.js_register_form').find('.js_delivery_street li').eq(0).addClass('sel selected');

      delivery_checkbox.closest('.js_register_form').find('.js_delivery_region option').eq(0).prop('selected', true);
      delivery_checkbox.closest('.js_register_form').find('.js_delivery_region li').removeClass('sel selected');
      delivery_checkbox.closest('.js_register_form').find('.js_delivery_region li').eq(0).addClass('sel selected');

      delivery_checkbox.closest('.js_register_form').find('.js_delivery_city option').eq(0).prop('selected', true);
      delivery_checkbox.closest('.js_register_form').find('.js_delivery_city li').removeClass('sel selected');
      delivery_checkbox.closest('.js_register_form').find('.js_delivery_city li').eq(0).addClass('sel selected');

      delivery_checkbox.closest('.js_register_form').find('.js_delivery_street .jq-selectbox__select-text').html($('.js_delivery_street option:selected').html());
      delivery_checkbox.closest('.js_register_form').find('.js_delivery_region .jq-selectbox__select-text').html($('.js_delivery_region option:selected').html());
      delivery_checkbox.closest('.js_register_form').find('.js_delivery_city .jq-selectbox__select-text').html($('.js_delivery_city option:selected').html());

      delivery_checkbox.closest('.js_register_form').find('.js_copy_actual_address').prop('checked', false);
    }
  })

}

function CopyLegalAddress() {
  var copy_legal_address_checkbox = $('.js_copy_legal_address');
  var isCheked = copy_legal_address_checkbox.prop('checked');
  if (isCheked == true) {
    $('.js_actual_index_val').val($('.js_legal_index_val').val());
    $('.js_actual_house_val').val($('.js_legal_house_val').val());
    $('.js_actual_additional_val').val($('.js_legal_additional_val').val());
    $('.js_actual_street input').val($('.js_legal_street input').val());


    $('.js_actual_city select').html($('.js_legal_city select').html()).trigger('refresh');
    var city_selected_index = $('.js_legal_city option:selected').index();
    $('.js_actual_city option').eq(city_selected_index).prop('selected', true);
    $('.js_actual_city li').removeClass('sel selected');
    $('.js_actual_city li').eq(city_selected_index).addClass('sel selected');
    $('.js_actual_city .jq-selectbox__select-text').html($('.js_actual_city option:selected').html());


    var regionselected_index = $('.js_legal_region option:selected').index();
    $('.js_actual_region option').eq(regionselected_index).prop('selected', true);
    $('.js_actual_region li').removeClass('sel selected');
    $('.js_actual_region li').eq(regionselected_index).addClass('sel selected');
    $('.js_actual_region .jq-selectbox__select-text').html($('.js_actual_region option:selected').html());
    $('.js_actual_region').change();


  }
  else if (isCheked == false) {
    $('.js_actual_index_val').val('');
    $('.js_actual_house_val').val('');
    $('.js_actual_additional_val').val('');

    $('.js_actual_street option').eq(0).prop('selected', true);
    $('.js_actual_street li').removeClass('sel selected');
    $('.js_actual_street li').eq(0).addClass('sel selected');

    $('.js_actual_region option').eq(0).prop('selected', true);
    $('.js_actual_region li').removeClass('sel selected');
    $('.js_actual_region li').eq(0).addClass('sel selected');

    $('.js_actual_city option').eq(0).prop('selected', true);
    $('.js_actual_city li').removeClass('sel selected');
    $('.js_actual_city li').eq(0).addClass('sel selected');

    $('.js_actual_street .jq-selectbox__select-text').html($('.js_actual_street option:selected').html());
    $('.js_actual_region .jq-selectbox__select-text').html($('.js_actual_region option:selected').html());
    $('.js_actual_city .jq-selectbox__select-text').html($('.js_actual_city option:selected').html());
  }
}


function CopyActualAddress() {
  var copy_actual_address_checkbox = $('.js_copy_actual_address');
  var isCheked = copy_actual_address_checkbox.prop('checked');
  if (isCheked == true) {
    $('.js_delivery_index_val').val($('.js_actual_index_val').val());
    $('.js_delivery_house_val').val($('.js_actual_house_val').val());
    $('.js_delivery_additional_val').val($('.js_actual_additional_val').val());
    $('.js_delivery_street input').val($('.js_actual_street input').val());

    $('.js_delivery_city select').html($('.js_actual_city select').html()).trigger('refresh');
    var city_selected_index = $('.js_actual_city option:selected').index();
    $('.js_delivery_city option').eq(city_selected_index).prop('selected', true);
    $('.js_delivery_city li').removeClass('sel selected');
    $('.js_delivery_city li').eq(city_selected_index).addClass('sel selected');
    $('.js_delivery_city .jq-selectbox__select-text').html($('.js_actual_city option:selected').html());


    var regionselected_index = $('.js_actual_region option:selected').index();
    $('.js_delivery_region option').eq(regionselected_index).prop('selected', true);
    $('.js_delivery_region li').removeClass('sel selected');
    $('.js_delivery_region li').eq(regionselected_index).addClass('sel selected');
    $('.js_delivery_region .jq-selectbox__select-text').html($('.js_delivery_region option:selected').html());
    $('.js_delivery_region').change();
  }
  else if (isCheked == false) {
    $('.js_delivery_index_val').val('');
    $('.js_delivery_house_val').val('');
    $('.js_delivery_additional_val').val('');
    $('.js_delivery_street input').val('');


    $('.js_delivery_region option').eq(0).prop('selected', true);
    $('.js_delivery_region li').removeClass('sel selected');
    $('.js_delivery_region li').eq(0).addClass('sel selected');

    $('.js_delivery_city option').eq(0).prop('selected', true);
    $('.js_delivery_city li').removeClass('sel selected');
    $('.js_delivery_city li').eq(0).addClass('sel selected');

    $('.js_delivery_region .jq-selectbox__select-text').html($('.js_delivery_region option:selected').html());
    $('.js_delivery_city .jq-selectbox__select-text').html($('.js_delivery_city option:selected').html());
  }

}


function CopyLegalAddressLK(el) {
  var copy_legal_address_checkbox = $(el);
  copy_legal_address_checkbox.each(function () {
    var parent = $(this).closest('.edit_payers_block')

    var isCheked = $(this).prop('checked');
    if (isCheked == true) {

      $('.js_actual_index_val', parent).val($('.js_legal_index_val', parent).val());
      $('.js_actual_street', parent).val($('.js_legal_street', parent).val());
      $('.js_actual_house_val', parent).val($('.js_legal_house_val', parent).val());
      $('.js_actual_additional_val', parent).val($('.js_legal_additional_val', parent).val());

      var city_selected_index = $('.js_legal_city option:selected', parent).index();
      $('.js_actual_city option', parent).eq(city_selected_index).prop('selected', true);
      $('.js_actual_city li', parent).removeClass('sel selected');
      $('.js_actual_city li', parent).eq(city_selected_index).addClass('sel selected');
      $('.js_actual_city .jq-selectbox__select-text', parent).html($('.js_actual_city option:selected', parent).html());

      var regionselected_index = $('.js_legal_region option:selected', parent).index();
      $('.js_actual_region option', parent).eq(regionselected_index).prop('selected', true);
      $('.js_actual_region li', parent).removeClass('sel selected');
      $('.js_actual_region li', parent).eq(regionselected_index).addClass('sel selected');
      $('.js_actual_region .jq-selectbox__select-text', parent).html($('.js_actual_region option:selected', parent).html());

    }
    else if (isCheked == false) {
      $('.js_actual_index_val', parent).val('');
      $('.js_actual_house_val', parent).val('');
      $('.js_actual_street', parent).val('');
      $('.js_actual_additional_val', parent).val('');

      $('.js_actual_region option', parent).eq(0).prop('selected', true);
      $('.js_actual_region li', parent).removeClass('sel selected');
      $('.js_actual_region li', parent).eq(0).addClass('sel selected');

      $('.js_actual_city option', parent).eq(0).prop('selected', true);
      $('.js_actual_city li', parent).removeClass('sel selected');
      $('.js_actual_city li', parent).eq(0).addClass('sel selected');

      $('.js_actual_region .jq-selectbox__select-text', parent).html($('.js_actual_region option:selected', parent).html());
      $('.js_actual_city .jq-selectbox__select-text', parent).html($('.js_actual_city option:selected', parent).html());
    }
  })
}

/*end registration page checkboxes functions*/

/*remove input placeholders on click*/
function ClearPlaceholder() {
  $('input,textarea').focus(function () {
    $(this).data('placeholder', $(this).attr('placeholder'))
    $(this).attr('placeholder', '');
  });
  $('input,textarea').blur(function () {
    $(this).attr('placeholder', $(this).data('placeholder'));
  });
}

/*end remove placeholders on click*/


/*catalog height*/
function SetCatalogMenuHeight() {
  //alert(catalog_height+offset.top+$('.header_top_block').innerHeight());
  //alert(window_height);

  if ($('.catalog_hidden_block').length) {
    var offset = $('.header_top_block').offset();
    var catalog_height = $('.catalog_hidden_block').innerHeight();
    var window_height = $(window).height();
    if (window_height <= catalog_height + offset.top + $('.header_top_block').innerHeight()) {
      $('.catalog_hidden_block').height(window_height - 60 - 153);

      $('.js_scroll_pane').jScrollPane({
        showArrows: true
      });
    }
    else {
      $('.catalog_hidden_block').css('height', 'auto');
      $('.jspContainer').css('height', 'auto');
      $('.jspPane').css('position', 'relative');
      $('.jspVerticalBar').css('display', 'none');
    }
  }

  if ($('.main_page_catalog_hidden_block').length > 0) {

    var offset = 300;
    var catalog_width = $('.main_page_catalog_hidden_block').innerWidth();
    var window_width = $(window).width();
    var catalog_height = $('.main_page_catalog_hidden_block').innerHeight();
    var window_height = $(window).height();
    if (window_height <= catalog_height + offset) {
      $('.main_page_catalog_hidden_block').height(window_height - offset);
      $('.js_scroll_pane').jScrollPane({
        showArrows: true
      });
    } else {
      $('.main_page_catalog_hidden_block').css('height', 'auto');
      $('.jspContainer').css('height', 'auto');
      $('.jspPane').css('position', 'relative');
      $('.jspVerticalBar').css('display', 'none');
    }
    if (window_width <= 1240) {
      var left = $('.main_page_btn_catalog').offset().left;
      var left_offset = (window_width - catalog_width) / 2 - left;
      $('.main_page_catalog_hidden_block').css('left', '' + left_offset + 'px');
    } else {
      $('.main_page_catalog_hidden_block').css('left', '0');
    }
  }

}

$(document).ready(function () {
  AlignPopup();
  initTabs();
  init_small_side_panel();
  ItemCounter();
  $(window).scroll();

  changePriceView();
  ItemCounterAmount();
  setMainItemPrice();
  setItemPrice();
  FinalMainItemPrice();
  FinalCartItemPrice();
  catalogCheckFilter();
  ChooseProductCheckFilter();
  ChooseProductRadioFilter();
  initFilterTabs();


  SetCatalogMenuHeight();

  /*registration page checkboxes functions*/
  RegistrationShowAdresses();
  showDeliveryAddress();
  CopyLegalAddress();
  CopyActualAddress();
  RegistrationActivateRadio();
  RegistrationShowAdresses();
  //CopyLegalAddressLK();
  ClearPlaceholder();

  /*registration page radio buttons switch*/
  if ($('.js_radio_legal').prop('checked') == true) {
    $('.js_form_legal_block').css('display', 'block');
    $('.js_form_entrepreneur_block').css('display', 'none');
  }
  if ($('.js_radio_entrepreneur').prop('checked') == true) {
    $('.js_form_legal_block').css('display', 'none');
    $('.js_form_entrepreneur_block').css('display', 'block');
  }

  $('body').on('change', '.js_radio_legal', function () {
    var isCheked = $(this).prop('checked');
    if (isCheked == true) {
      $('.js_form_legal_block').css('display', 'block').find('select, textarea, input').removeAttr('disabled').trigger('refresh');
      if (!$('.js_form_legal_block').find('.js_fill_delivery_address').prop('checked')) {
        $('.js_form_legal_block').find('.register_delivery_block').find('select, textarea, input').attr('disabled', 'disabled');
      }

      $('.js_form_individ_block').css('display', 'none').find('select, textarea, input').attr('disabled', 'disabled').trigger('refresh');
      $('.js_form_entrepreneur_block').css('display', 'none').find('select, textarea, input').attr('disabled', 'disabled').trigger('refresh');

      $('.js_form_legal_block input, .js_form_legal_block select, .js_form_entrepreneur_block input, .js_form_entrepreneur_block select, .js_form_individ_block input, .js_form_individ_block select').each(function () {
        if ($(this).attr('disabled')) {
          if ($(this).hasClass('required')) {
            $(this).removeClass('required');
            $(this).addClass('addRequired');
          }
        }
        else {
          if ($(this).hasClass('addRequired')) {
            $(this).removeClass('addRequired');
            $(this).addClass('required');
          }
        }
      })
    }
    $('.js_select select:visible').styler({
      selectSearch: false
    });

  })
  $('body').on('change', '.js_radio_entrepreneur', function () {
    var isCheked = $(this).prop('checked');
    if (isCheked == true) {
      $('.js_form_individ_block').css('display', 'none').find('select, textarea, input').attr('disabled', 'disabled').trigger('refresh');
      $('.js_form_legal_block').css('display', 'none').find('select, textarea, input').attr('disabled', 'disabled').trigger('refresh');
      $('.js_form_entrepreneur_block').css('display', 'block').find('select, textarea, input').removeAttr('disabled').trigger('refresh');

      if (!$('.js_form_entrepreneur_block').find('.js_fill_delivery_address').prop('checked')) {
        $('.js_form_entrepreneur_block').find('.register_delivery_block').find('select, textarea, input').attr('disabled', 'disabled');
      }

      $('.js_form_legal_block input, .js_form_legal_block select, .js_form_entrepreneur_block input, .js_form_entrepreneur_block select, .js_form_individ_block input, .js_form_individ_block select').each(function () {
        if ($(this).attr('disabled')) {
          if ($(this).hasClass('required')) {
            $(this).removeClass('required');
            $(this).addClass('addRequired');
          }
        }
        else {
          if ($(this).hasClass('addRequired')) {
            $(this).removeClass('addRequired');
            $(this).addClass('required');
          }
        }
      })
    }
    $('.js_select select:visible').styler({
      selectSearch: false
    });

  })
  $('body').on('change', '.js_radio_individ', function () {
    var isCheked = $(this).prop('checked');
    if (isCheked == true) {
      $('.js_form_individ_block').css('display', 'block').find('select, textarea, input').removeAttr('disabled').trigger('refresh');

      $('.js_form_entrepreneur_block').css('display', 'none').find('select, textarea, input').attr('disabled', 'disabled').trigger('refresh');
      $('.js_form_legal_block').css('display', 'none').find('select, textarea, input').attr('disabled', 'disabled').trigger('refresh');

      $('.js_form_legal_block input, .js_form_legal_block select, .js_form_entrepreneur_block input, .js_form_entrepreneur_block select, .js_form_individ_block input, .js_form_individ_block select').each(function () {
        if ($(this).attr('disabled')) {
          if ($(this).hasClass('required')) {
            $(this).removeClass('required');
            $(this).addClass('addRequired');
          }
        }
        else {
          if ($(this).hasClass('addRequired')) {
            $(this).removeClass('addRequired');
            $(this).addClass('required');
          }
        }
      })
    }
    $('.js_select select:visible').styler({
      selectSearch: false
    });

  })
  /*registration page radio buttons switch*/

  $('.js_item_block .block_show').mouseover(function () {
    if ($(window).width() > 1240) {
      $(this).parent().find('.block_hide').css('display', 'inline-block');
      $(this).parent().css('width', '581px');
      $(this).closest('.js_item_block').addClass('hover');
    }
  })
  $('.js_item_block .block_show').mouseout(function () {
    $(this).parent().find('.block_hide').css('display', 'none');
    $(this).parent().css('width', 'auto');
    $(this).closest('.js_item_block').removeClass('hover');
  })

  var options2 = {
    data: ['blue', 'green', 'pink', 'red', 'yellow', 'black', 'white', 'pink', 'orange'],
  };
  if ($('.js_find_city').length > 0) {
    $('.js_find_city').easyAutocomplete(options2);
  }


  $('.js_represent').change(function () {
    RegistrationActivateRadio();
  })

  $('.represent_block input[type=radio]').change(function () {
    RegistrationShowAdresses();
  })

  $('.js_fill_delivery_address').change(function () {
    showDeliveryAddress();
    $('.js_select select:visible').styler({
      selectSearch: false
    });
  })
  $('.js_copy_legal_address').change(function () {
    CopyLegalAddress();
  })

  $('.js_copy_legal_addressLK').on('change', function () {
    CopyLegalAddressLK(this);
  })


  $('.js_copy_actual_address').change(function () {
    CopyActualAddress();
  })
  /*end registration page checkboxes functions*/


  $('.js_phone_mask').mask('+7 (999) 999-99-99');
  $('.js_inn_mask').mask('999999999999');
  $('.js_inn_legal_mask').mask('9999999999');
  $('.js_ogrn_mask').mask('999999999999999');
  $('.js_kpp_mask').mask('999999999');
  $('#ORDER_PROP_4').mask('+7 (999) 999-99-99');
  $('.js_index_mask').mask('99-99-99');

  $('body').on('change', '.js_index_mask', function () {

    var $this = $(this);
    if ($this.closest('.address_block').length) {
      var $parent = $this.closest('.address_block');
    }
    else if ($this.closest('.payers_block').length) {
      var $parent = $this.closest('.payers_block');
    }
    else {
      var $parent = $this.closest('.block');
    }

    $parent.append('<div class="icon_animation icon_placeholder"></div>');

    $this.removeClass('error');

    if ($(this).val().length == 8) {
      $.post('/ajax/geo.php', {action: 'get_address_by_zip', zip: $(this).val()}, function (data) {
        if (data == null) {
          $this.val('').addClass('error');
        }
        else {
          if (data.city) {
            $parent.find('select.city').attr('data-id', data.city);
          }
          if (data.region) {
            $parent.find('select.region').val(data.region).change().trigger('refresh');
          }
        }
        $parent.find('.icon_animation').remove();
      }, 'json');
    }
  });


  $('.catalog_filter_items_holder .block input[type=checkbox]').change(function () {
    catalogCheckFilter();
  })

  $('.catalog_filter_items_holder .btn_reset').click(function (e) {
    e.preventDefault();
    $(this).closest('form').find('input[type=checkbox]').prop('checked', false);
    catalogCheckFilter();
  })


  $('.js_choose_products_block_filter input[type=checkbox]').change(function () {
    ChooseProductCheckFilter();
  })


  /*tooltip*/
  var content = '';
  $('.js_tooltip').tooltipster({
    contentAsHTML: true,
    content: content,
    interactive: true,
    position: 'bottom',
    speed: 100,
    updateAnimation: false,
    onlyOne: true
    //autoClose:false
  });
  $('.js_tooltip').mouseover(function () {
    content = $(this).find('.tooltip_content').html();
    $(this).tooltipster('content', content);
  })


  /*$('.js_tooltip_item_property').tooltipster({
      contentAsHTML: true,
      content: content,
      interactive:true,
      position:'bottom',
      speed:100,
      updateAnimation:false,
      onlyOne:true
      //autoClose:false
  });
  $('.js_tooltip_item_property').mouseover(function(){
      content = $(this).find('.tooltip_content').html();
      $(this).tooltipster('content', content);
  })*/
  /*end tooltip*/

  /*custom scroll*/
  $('.js_scroll_pane').jScrollPane({
    showArrows: false,
  });

  var pane = $('.js_scroll_table').jScrollPane({
    showArrows: true,
    speed: 226
  });
  var api = pane.data('jsp');


  $('.js_scroll_table').bind(
    'jsp-scroll-x',
    function (event, scrollPositionX) {
      $('.bottom_table .items_parameters_table').css('left', '-' + scrollPositionX + 'px');
    }
  );
  /*end custom scroll*/


  /*go top link*/
  $('.js_scrollTo').click(function (e) {
    e.preventDefault();
    var href = $(this).attr('href');
    $('body').scrollTo(href, {duration: 'slow', offset: -180});
  })
  /*end go top*/


  /*-------------OLD Browser Panel---------------------------------------*/
  if (browser == 'Firefox') {
    if (browser_version < 40) {
      $('.old_browser_block').addClass('visible');
      $('.old_browser_overlay').addClass('visible');
    }
  }
  if (browser == 'Chrome') {
    if (browser_version < 45) {
      $('.old_browser_block').addClass('visible');
      $('.old_browser_overlay').addClass('visible');
    }
  }
  if (browser.search('IE') != -1) {
    if (browser_version <= 9) {
      $('.old_browser_block').addClass('visible');
      $('.old_browser_overlay').addClass('visible');
    }
  }
  if (browser_version.search('Opera') != -1) {
    var res = browser_version.split(' ');
    if (res[1] < 20) {
      $('.old_browser_block').addClass('visible');
    }
  }
  if (browser == 'Safari') {
    if (browser_version < 5) {
      $('.old_browser_block').addClass('visible');

    }
  }
  /*end Get browser version*/


  /*panel for old browser*/
  $('.close_old_browser_panel').click(function (e) {
    e.preventDefault();
    $(this).parent().parent().fadeOut();
    $('.old_browser_overlay').fadeOut();
  });
  /*panel forl old browser*/

  /*-------------END OLD Browser Panel---------------------------------------*/


  /*----------------------Revealing list click-----------------*/
  $('.js_holder.active').find('.js_block').css('display', 'block');
  $('.js_heading').click(function (e) {
    e.preventDefault();
    if ($(this).parent().hasClass('active')) {
      $(this).parent().removeClass('active');
      $(this).parent().find('.js_block').slideUp();
    }
    else {
      $(this).parent().addClass('active');
      $(this).parent().find('.js_block').slideDown();
    }
  });

  /*----------------------end Revealing list click-----------------*/


  /*----------------------Revealing list click-----------------*/
  $('.js_holder_main.active').find('.js_block_main').css('display', 'block');
  $('.js_heading_main').click(function (e) {
    e.preventDefault();
    if ($(this).parent().hasClass('active')) {
      $(this).parent().removeClass('active');
      $(this).parent().find('.js_block_main').slideUp();
    }
    else {
      $(this).parent().addClass('active');
      $(this).parent().find('.js_block_main').slideDown();
    }
  });

  /*----------------------end Revealing list click-----------------*/


  /*price range slider*/
  $('.range_slider_inner').each(function () {
    var parent = $(this).closest('.range_slider_block');
    $(this).slider({
      min: 0,
      max: 1000,
      step: 1,
      range: true,
      values: [0, 2000],
      slide: function (event, ui) {
        for (var i = 0; i < ui.values.length; ++i) {
          $('input.sliderValue[data-index=' + i + ']', parent).val(ui.values[i]);
        }
      }
    });
  })


  $('input.sliderValue').keyup(function () {
    var $this = $(this);
    var parent = $(this).closest('.range_slider_block');
    $('.range_slider_inner', parent).slider('values', $this.data('index'), $this.val());
  });
  $('input.sliderValue').change(function () {
    var $this = $(this);
    var parent = $(this).closest('.range_slider_block');
    $('.range_slider_inner', parent).slider('values', $this.data('index'), $this.val());
  });
  /*end price range slider*/


  $('.js_file_input').change(function () {
    ChooseFile();
  })


  /*show catalog list*/
  $('.js_catalog').click(function (e) {

    e.preventDefault();
    e.stopPropagation();

    var href = $(this).attr('href');
    // if (navigator.userAgent.match(/Android/i) ||
    //   navigator.userAgent.match(/webOS/i) ||
    //   navigator.userAgent.match(/iPhone/i) ||
    //   navigator.userAgent.match(/iPod/i) ||
    //   navigator.userAgent.match(/iPad/i) ||
    //   navigator.userAgent.match(/Blackberry/i)) {
    //   location.href = href;
    // }
    //
    // else {
      $(this).parent().find('.catalog_hidden_block, .js_catalog_hidden_block').fadeToggle();
      $(this).toggleClass('active');
      $('.js_scroll_pane').jScrollPane({
        showArrows: true
      });
    // }

  })
  $('.catalog_hidden_block').click(function (e) {
    e.stopPropagation();
  })


  $('body').click(function (e) {
    e.stopPropagation();
    $('.catalog_hidden_block').fadeOut();
    $('.js_catalog').removeClass('active');
    $('.js_phones_block').fadeOut();
    $('.personal_cabinet_dropdown_block').fadeOut();
    $('.js_catalog_block').removeClass('active');
  })

  $('.js_btn_close_catalog').click(function (e) {
    e.preventDefault();
    $('.catalog_hidden_block, .js_catalog_hidden_block').fadeToggle();
    $('.js_catalog').toggleClass('active');
  });
  /*show catalog list*/


  /*-------------------custom select-------------------*/
  $('.js_select select:visible').styler({
    selectSearch: false
  });

  /*-------------------custom select-------------------*/

  /*-----------------------------POPUP-------------------------*/
  var flag = true;
  var startSlide;

  $('[data-popup]').on('click', function (e) {
    e.preventDefault();
    AlignPopup();
    InitPopup($(this));

    /*images gallery carousel*/
    startSlide = parseInt($(this).attr('data-current'));
    if ($(this).attr('data-popup') == 'js_photo_gallery_popup') {
      if (flag) {
        $('#photo_carousel').flexslider({
          animation: 'slide',
          controlNav: false,
          animationLoop: false,
          slideshow: false,
          itemWidth: 115,
          itemMargin: 10,
          asNavFor: '#photo_slider',
          prevText: '',
          mousewheel: false,
          startAt: startSlide,
          nextText: ''

        });

        $('#photo_slider').flexslider({
          animation: 'fade',
          controlNav: false,
          animationLoop: false,
          slideshow: false,
          sync: '#photo_carousel',
          startAt: startSlide,
          prevText: '',
          nextText: '',
          smoothHeight: true,
          animationSpeed: 300,
          start: function (slider) {
            AlignPopup();
            flexslider = slider;
          }
        });
        $(window).resize();
        flag = false;
        /*images gallery carousel*/

      } else {
        flexslider.flexAnimate(startSlide);
      }
    }
    /*images gallery carousel*/


  });


  $('.custom-overlay, .custom-popup .js_close, #popup_notify .js_close').on('click', function (e) {
    e.preventDefault();
    $('.custom-overlay').delay(200).fadeOut('300');
    $('.custom-popup').fadeOut('300');
    $('#popup_notify').fadeOut('300');
    $('.page').removeClass('blur');


    if ($('#video_src')) {
      //document.getElementById('sert_resourse').innerHTML = '';
      $('.mejs-pause').click();

      //$('#video_src').attr('src', '');
    }

  });
  /*-----------------------END POPUP----------------------------*/

//*switch view*/
  if ($('.js_viewleft').hasClass('active')) {
    $('.js_view_content_1').addClass('active');
    $('.js_view_content_2').removeClass('active');
    $('.js_view_img').removeClass('js_viewright_img');
    $('.js_view_img').addClass('js_viewleft_img');

  }
  if ($('.js_viewright').hasClass('active')) {
    $('.js_view_content_1').removeClass('active');
    $('.js_view_content_2').addClass('active');
    $('.js_view_img').removeClass('js_viewleft_img');
    $('.js_view_img').addClass('js_viewright_img');

  }
  $('.js_viewleft').click(function (e) {
    e.preventDefault();
    $('.js_viewright').removeClass('active');
    $('.js_viewleft').addClass('active');
    $('.js_view_content_1').addClass('active');
    $('.js_view_content_2').removeClass('active');
    $('.js_view_img').removeClass('js_viewright_img');
    $('.js_view_img').addClass('js_viewleft_img');
  });

  $('.js_viewright').click(function (e) {
    e.preventDefault();
    $('.js_viewleft').removeClass('active');
    $('.js_viewright').addClass('active');
    $('.js_view_content_2').addClass('active');
    $('.js_view_content_1').removeClass('active');
    $('.js_view_img').removeClass('js_viewleft_img');
    $('.js_view_img').addClass('js_viewright_img');
  });

  $('.js_view_img').click(function () {
    if ($(this).hasClass('js_viewleft_img')) {
      $('.js_viewright').click();
    }
    else if ($(this).hasClass('js_viewright_img')) {
      $('.js_viewleft').click();
    }
  })
  /*end switch view*/


  /*uncheck all checkboxes*/
  $('.js_remove_checkbox').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    var id = $(this).attr('id');
    $(this).closest('form').find('input[type=checkbox][data-remove-id=' + id + ']').prop('checked', false);
    catalogCheckFilter();
    ChooseProductCheckFilter();
  })


  $('.js_choose_products_reset').click(function (e) {
    e.preventDefault();
    $(this).closest('form').find('input[type=checkbox]').prop('checked', false);
    ChooseProductCheckFilter();

    $('.range_slider_block').each(function () {
      var slider_range = $(this).find('.range_slider_inner');
      var options = slider_range.slider('option');
      slider_range.slider('values', [options.min, options.max]);
      $(this).closest('.range_slider_block').find('.sliderValue[data-index=0]').val(options.min);
      $(this).closest('.range_slider_block').find('.sliderValue[data-index=1]').val(options.max);
    })
  })


  $('.js_reset').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).closest('form').find('input[type=checkbox]').prop('checked', false);

  })
  /*end uncheck all checkboxes*/

  /*remove comparison list*/
  $('.js_btn_remove_filter_1').click(function (e) {
    e.preventDefault();
    $(this).parent().parent().parent().fadeOut(300, function () {
      $(this).remove();
    });
  })
  /*end remove comparison list*/


  $('.js_filter_show').click(function (e) {
    e.preventDefault();
    $(this).parent().find('.js_filter_show').removeClass('active');
    $(this).addClass('active');
  })


  /*check unckeck all checkboxes in group*/
  $('.js_all').change(function () {
    var id = $(this).attr('id');
    var isCheked = $(this).prop('checked');
    if (isCheked == true) {
      $(this).closest('form').find('input[type=checkbox][data-id=' + id + ']').each(function () {
        if (!$(this).prop('disabled')) {
          $(this).prop('checked', false).click();
        }
      });
      $(this).prop('checked', true);
      ChooseProductCheckFilter();
    }
    else if (isCheked == false) {
      $(this).closest('form').find('input[type=checkbox][data-id=' + id + ']').each(function () {
        if (!$(this).prop('disabled')) {
          $(this).prop('checked', true).click();
        }
      });
      $(this).prop('checked', false);
      ChooseProductCheckFilter();
    }
  })
  /*end check unckeck all checkboxes in group*/


  /*show hide readmore content*/
  $('.js_read_more').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('read_more_active');
    $(this).parent().find('.js_read_more_hidden_content').slideToggle();

  })
  /*end show hide readmore content*/


  /*show hide right panel*/
  $('.js_show_hide_panel').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.all_bookmarks').slideToggle();
  });
  /*end show hide right panel*/


  /*empty form file input*/
  $('.js_remove_file').click(function (e) {
    e.preventDefault();
    $(this).parent().parent().find('.js_file_value').empty();
    $('.js_remove_file').css('display', 'none');
    $('.file_name_holder').css('display', 'none');
  });

  /*end empty form file input*/


  /*item previews click*/
  $('.js_preview_small').click(function (e) {
    e.preventDefault();
    var id = $(this).attr('data-pic-id');
    $('.js_preview_small').removeClass('active');
    $(this).addClass('active');
    var src = $(this).find('img').attr('src');
    $('.js_preview_big .image_block').find('img').fadeOut(300, function () {
      $('.js_preview_big .image_block').find('img').attr('src', src);
      $('.js_preview_big .image_block').attr('data-current', id);
      $('.icon_item_card_zoom').attr('data-current', id);

      $('.js_preview_big .image_block').find('img').fadeIn();
    });
  });
  /*item previews click*/


  /*swiper sliders*/
  var js_partners_slider = new Swiper('.js_partners_slider .swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    nextButton: '.js_partners_slider .js_swiper_next',
    prevButton: '.js_partners_slider .js_swiper_prev'
  });

  var catalog_slider = new Swiper('.js_catalog_slider .swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    nextButton: '.js_catalog_slider .js_swiper_next',
    prevButton: '.js_catalog_slider .js_swiper_prev'
  });

  var swipersmall = new Swiper('.js_swiper_small .swiper-container', {
    slidesPerView: '5',
    spaceBetween: 10,
    loop: false,
    nextButton: '.js_swiper_small .js_swiper_next',
    prevButton: '.js_swiper_small .js_swiper_prev',
    mousewheelControl: true,
    direction: 'vertical'
  });

  var similar_items_block_1 = new Swiper('.js_similar_items_block_1', {
    spaceBetween: 0,
    slidesPerView: 2,
    loop: false,
    direction: 'vertical',
    nextButton: '.similar_items_block_1_slider .js_swiper_next',
    prevButton: '.similar_items_block_1_slider .js_swiper_prev'
  });

  var items_slider = new Swiper('.js_items_slider1 .swiper-container', {
    slidesPerView: '4',
    spaceBetween: 26,
    loop: false,
    nextButton: '.js_items_slider1 .js_swiper_next',
    prevButton: '.js_items_slider1 .js_swiper_prev',
    mousewheelControl: false,
    simulateTouch: false
  });

  var items_slider2 = new Swiper('.js_items_slider2 .swiper-container', {
    slidesPerView: '4',
    spaceBetween: 26,
    loop: false,
    nextButton: '.js_items_slider2 .js_swiper_next',
    prevButton: '.js_items_slider2 .js_swiper_prev',
    mousewheelControl: false,
    simulateTouch: false
  });

  var main_top_slider = new Swiper('.main_top_slider .swiper-container', {
    slidesPerView: '1',
    spaceBetween: 0,
    loop: true,
    nextButton: '.main_top_slider .js_swiper_next',
    prevButton: '.main_top_slider .js_swiper_prev',
    mousewheelControl: false,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    speed: 700,
    effect: 'fade',
    autoplay: 10000,
    simulateTouch: false
  });


  $('.js_similar_items_slider_vertical').each(function () {
    var index = parseInt((Math.random() * 100), 10);
    $(this).addClass('swiper_' + index);

    var swiper = new Swiper('.js_similar_items_slider_vertical.swiper_' + index + '  .swiper-container', {
      slidesPerView: '2',
      spaceBetween: 0,
      loop: false,
      nextButton: '.js_similar_items_slider_vertical.swiper_' + index + ' .js_swiper_next',
      prevButton: '.js_similar_items_slider_vertical.swiper_' + index + ' .js_swiper_prev',
      mousewheelControl: false,
      direction: 'vertical'
    });
  })


  /*end swiper sliders*/

  posHoverBlockInSlider();

  $('.icon_question_block, .icon_info_block').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
  })


  /*add hover to text or image when hover on item image or text*/
  $('.items_block .image_block, .items_block_tile_view .image_block').hover(function () {
    var parent = $(this).closest('.block');
    parent.find('.title_block').toggleClass('hover');
  })
  $('.items_block .title_block, .items_block_tile_view .title_block').hover(function () {
    var parent = $(this).closest('.block');
    parent.find('.image_block').toggleClass('hover');
  })

  $('.similar_items_block_1 .item_title_block').hover(function () {
    var parent = $(this).closest('.block');
    parent.find('.item_image_block').toggleClass('hover');
  })
  $('.similar_items_block_1 .item_image_block').hover(function () {
    var parent = $(this).closest('.block');
    parent.find('.item_title_block').toggleClass('hover');
  })


  $('.recently_items_block .item_title_block').hover(function () {
    var parent = $(this).closest('.block');
    parent.find('.item_image_block').toggleClass('hover');
  })
  $('.recently_items_block .item_image_block').hover(function () {
    var parent = $(this).closest('.block');
    parent.find('.item_title_block').toggleClass('hover');
  })
  /*end of add hover to text or image when hover on item image or text*/


  /*show phones block*/
  $('.js_phones').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('.js_phones_block').fadeToggle();
  })

  $('.js_phones_block').click(function (e) {
    e.stopPropagation();
  })
  /*end show phones block*/

  /*show amount info message*/
  $('.js_counter_input, .cart_items_block .js_counter_input').focus(function () {
    $(this).parent().parent().find('.info_text').fadeIn();
  })

  $('.js_counter_input, .cart_items_block .js_counter_input').blur(function () {
    $(this).parent().parent().find('.info_text').fadeOut();
  })
  /*end show amount info message*/


  /*show hide password in input*/
  $('.js_pass_show_hide').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).parent().find('input').prop('type', 'password');
    }
    else {
      $(this).addClass('active');
      $(this).parent().find('input').prop('type', 'text');
    }

  })
  /*end show hide password in input*/

  /*show dropdown of personal cabinet*/
  $('.js_personal_cabinet').click(function (e) {
    e.stopPropagation();
    $('.personal_cabinet_dropdown_block').fadeToggle();
    $(this).toggleClass('opened');
  })
  /*end show dropdown of personal cabinet*/


  /*remove cart item*/
  $('body').on('click', '.js_remove_cart_item', function (e) {
    e.preventDefault();
    $.get($(this).attr('href'));
    $(this).closest('.js_item_block').fadeOut(function () {
      if ($(this).parent().find('.js_item_block').length == 1) {
        $(this).closest('.cart_items_wrap').hide();
      }
      $(this).remove();
      UpdateCartQuantity();
      showFinalResult();
    });
  })
  /*end remove cart item*/

  /*edit profile*/

  $('.js_btn_edit_record_LK').click(function (e) {
    e.preventDefault();
    $(this).closest('.profile_list_block').find('.js_profile_info_text').fadeOut(function () {

      $(this).closest('.profile_list_block').find('.js_profile_info_input').fadeIn();
      $(this).closest('.profile_list_block').find('.js_profile_info_input_holder').fadeIn();
      $(this).closest('.profile_list_block').find('.js_profile_info_select').fadeIn();
      $(this).closest('.profile_list_block').find('.edit_payers_block').fadeIn();
      $(this).closest('.profile_list_block').find('.js_btn_delete_profile').fadeIn().css('display', 'inline-block');

      $(this).closest('.profile_list_block').find('input[type="text"]:visible, textarea:visible, select:visible').removeAttr('disabled');
      $(this).closest('.profile_list_block').find('select.region').change();

      $('.js_select select:visible').styler({
        selectSearch: false
      });

      if ($(this).closest('#form_user_payers').length == 0) {
        $(this).closest('.block').find('.js_profile_btn_save').fadeIn();
      }
    });

    $('.js_autocomplete_street').each(function () {
      if ($(this).attr('data-city')) {
        var source = '/ajax/city.php?city=' + $(this).attr('data-city');
        $(this).autocomplete({
          source: source
        });
      }
    });
  })
  $('.js_btn_delete_profile').click(function (e) {
    e.preventDefault();
    $.post('/ajax/user.php', {action: 'remove_' + $(this).attr('data-type'), 'id': $(this).attr('data-id')})
    $(this).closest('.profile_list_block').fadeOut();
  })
  $('body').on('click', '.js_btn_delete_profile_new', function (e) {
    $(this).closest('.profile_list_block').fadeOut(function () {
      $(this).remove();
    });
    return false;
  });
  $('.js_btn_delete_profile_adding').click(function (e) {
    e.preventDefault();
    $(this).closest('.profile_list_block').fadeOut();
  })
  $('.js_btn_edit_profile').click(function (e) {
    e.preventDefault();
    $(this).closest('.block').find('input[type="text"], textarea, select').removeAttr('disabled');
    $(this).closest('.block').find('.js_profile_info_text').fadeOut(function () {


      $(this).closest('.block').find('.row_profile_info_block_hidden').show();
      $(this).closest('.block').find('.js_profile_info_input').fadeIn();
      $(this).closest('.block').find('.js_profile_info_select').fadeIn();
      $(this).closest('.block').find('.js_profile_btn_save').fadeIn();
      $(this).closest('.block').find('.edit_payers_block').fadeIn();
      $(this).closest('.block').find('.js_btn_delete_profile').fadeIn().css('display', 'inline-block');

      $(this).closest('.block').find('select.region').change();

      $('.js_select select:visible').styler({
        selectSearch: false
      });
      $('.js_autocomplete_street').each(function () {
        if ($(this).attr('data-city')) {
          var source = '/ajax/city.php?city=' + $(this).attr('data-city');
          $(this).autocomplete({
            source: source
          });
        }
      });

    });
  })
  /*end edit profile*/

  /*add profile new record*/
  $('.js_btn_add_profile_field').click(function (e) {

    e.preventDefault();
    //var number = $(this).closest('.block').find('.profile_list_block').length;
    if ($(this).attr('data-add') == 'representatives') {
      var content = $('#form_user_agents .profile_list_block_to_copy').html();
    }
    if ($(this).attr('data-add') == 'delivery_adresses') {
      var content = $('#form_user_addresses .profile_list_block_to_copy').html();
    }
    if ($(this).attr('data-add') == 'payers') {
      var content = $('#form_user_payers .profile_list_block_to_copy').html();
    }
    $(this).closest('.block').find('.js_adding_fields_block').append(content);
    $(this).closest('.block').find('.profile_list_block').last().find('[disabled="disabled"]').removeAttr('disabled');
    var last_number = parseInt($(this).closest('.block').find('.profile_list_block').last().prev().find('.number').html());
    if (!last_number) {
      last_number = 0;
    }
    $(this).closest('.block').find('.profile_list_block').last().find('.number').html(last_number + 1);
    $(this).closest('.block').find('.js_profile_btn_save').fadeIn();

    initTabs();
    ClearPlaceholder();
    $('.js_index_mask').mask('99-99-99');
    $('.js_phone_mask').mask('+7 (999) 999-99-99');
    $('.js_kpp_mask').mask('999999999');
    $('.js_inn_mask').mask('999999999999');
    $('.js_inn_legal_mask').mask('9999999999');
    $('.js_ogrn_mask').mask('999999999999999');

    $('.js_copy_legal_addressLK').on('change', function () {
      CopyLegalAddressLK(this);
    })

    $('.js_select select:visible').styler({
      selectSearch: false
    });

    $('.js_autocomplete_street').each(function () {
      if ($(this).attr('data-city')) {
        var source = '/ajax/city.php?city=' + $(this).attr('data-city');
        $(this).autocomplete({
          source: source
        });
      }
    });

    if ($(this).attr('data-add') == 'payers') {
      $(this).closest('.block').find('.js_adding_fields_block').find('.payers_block_holder').last().find('.radio_label input:checked').change();
      FillPayers();
      InitPayersInfoTabs();
    }
  })
  /*end add profile new record*/

  /*poll page show hide polls*/
  $('.js_btn_view_results').click(function (e) {
    e.preventDefault();
    var parent = $(this).closest('.block');
    parent.find('.js_btn_view_results').css('display', 'none');
    parent.find('.pass_poll_block').fadeOut(function () {
      parent.find('.poll_result_block').fadeIn();
      parent.find('.submit_pass_poll').css('display', 'none');
      parent.find('.btn_pass_poll').css('display', 'block');
      parent.find('.js_btn_view_results').fadeOut();
    });
  })

  $('.js_pass_poll').click(function (e) {
    e.preventDefault();
    var parent = $(this).closest('.block');
    parent.find('.poll_result_block').fadeOut(function () {
      parent.find('.pass_poll_block').fadeIn();
      parent.find('.submit_pass_poll').css('display', 'block');
      parent.find('.btn_pass_poll').css('display', 'none');
      parent.find('.js_btn_view_results').fadeIn();
    });
  })
  /*end poll page show hide polls*/


  /*order history btn*/
  $('.js_btn_order_history_show_hide').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $(this).closest('.order_history_block').find('.order_history_hidden_block').slideToggle();
  })
  $('.js_btn_order_history_remove').click(function (e) {
    e.preventDefault();
    $(this).closest('.order_history_block').fadeOut();
  })
  /*end order history btn*/


  /*check if mobilde device do not fix  header block*/
  if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/Blackberry/i)) {
    $('.header_top_block').addClass('mobile');

  }
  /*end check if mobilde device do not fix  header block*/


  /*show recently view items*/
  $('.js_btn_recently_view').click(function (e) {
    e.preventDefault();
    var width = $(window).width();
    $(this).toggleClass('active');
    $('.recently_viewed_block').slideToggle();

    var slides = 3;
    if (width <= 600) slides = 2;
    if (width <= 380) slides = 1;
    var recently_items_slider = new Swiper('.recently_items_block .swiper-container', {
      slidesPerView: slides,
      spaceBetween: 70,
      loop: false,
      nextButton: '.recently_items_block .js_swiper_next',
      prevButton: '.recently_items_block .js_swiper_prev',
      mousewheelControl: false,
      simulateTouch: false
    });
  })

  /*end show recently view items*/

  var slides = '3';
  if ($(window).width() <= 680) slides = '2';
  if ($(window).width() <= 480) slides = '1';
  var related_items_slider = new Swiper('.related_items_block .swiper-container', {
    slidesPerView: slides,
    spaceBetween: 70,
    loop: false,
    nextButton: '.related_items_block .js_swiper_next',
    prevButton: '.related_items_block .js_swiper_prev',
    mousewheelControl: false,
    simulateTouch: false
  });


  /*item fly to cart effect*/
  $('.add_to_cart_block_1 .js_btn_add_to_cart_2').click(function (e) {
    e.preventDefault();
    var img = $('.item_main_block .item_preview_block_holder .item_preview_big .image_block img');
    img.clone()
      .css({
        'position': 'absolute',
        'z-index': '11100',
        'width': '500px',
        top: $(this).offset().top - 430,
        left: $(this).offset().left - 850
      })
      .appendTo('body')
      .animate({
        opacity: 0.05,
        left: $('.cart_block').offset()['left'],
        top: $('.cart_block').offset()['top'],
        width: 20
      }, 1000, function () {
        $(this).remove();
      });

  });
  $('.js_btn_add_to_cart_3').click(function (e) {
    e.preventDefault();
    var img = $('.items_block .block_show .image_block img');
    img.clone()
      .css({
        'position': 'absolute',
        'z-index': '11100',
        'width': '270px',
        top: $(this).offset().top - 360,
        left: $(this).offset().left - 20
      })
      .appendTo('body')
      .animate({
        opacity: 0.05,
        left: $('.cart_block').offset()['left'],
        top: $('.cart_block').offset()['top'],
        width: 20
      }, 1000, function () {
        $(this).remove();
      });

  });
  $('.js_btn_add_to_cart_4').click(function (e) {
    e.preventDefault();
    var img = $('.similar_items_block_1 .block .item_image_block img');
    img.clone()
      .css({
        'position': 'absolute',
        'z-index': '11100',
        'width': '102px',
        top: $(this).offset().top - 60,
        left: $(this).offset().left - 120
      })
      .appendTo('body')
      .animate({
        opacity: 0.05,
        left: $('.cart_block').offset()['left'],
        top: $('.cart_block').offset()['top'],
        width: 20
      }, 1000, function () {
        $(this).remove();
      });

  });
  /*end item fly to cart effect*/


  /*show catalog item hidden info*/
  $('.js_catalog_block').click(function (e) {
    e.stopPropagation();
    $('.js_catalog_block').removeClass('active');
    $(this).addClass('active');
  })
  /*end show catalog item hidden info*/


  $('.js_btn_clear_items').click(function (e) {
    e.preventDefault();
    $(this).parent().find('.block').fadeOut();
    $('.js_catalog_block').fadeOut();
    $('.pagination_holder').fadeOut();
  })


  $('.cart_item_image a').mouseover(function () {
    $(this).parent().parent().parent().find('.cart_item_name a').addClass('hover');
  })
  $('.cart_item_image a').mouseout(function () {
    $(this).parent().parent().parent().find('.cart_item_name a').removeClass('hover');
  })
  $('.cart_item_name a').mouseover(function () {
    $(this).parent().parent().parent().find('.cart_item_image a').addClass('hover');
  })
  $('.cart_item_name a').mouseout(function () {
    $(this).parent().parent().parent().find('.cart_item_image a').removeClass('hover');
  })
  $('.compare_items .image').mouseover(function () {
    $(this).parent().parent().parent().find('.item_title_block').addClass('hover');
  })
  $('.compare_items .image').mouseout(function () {
    $(this).parent().parent().parent().find('.item_title_block').removeClass('hover');
  })
  $('.compare_items .item_title_block').mouseover(function () {
    $(this).parent().parent().parent().find('.compare_items .image').addClass('hover');
  })
  $('.compare_items .item_title_block').mouseout(function () {
    $(this).parent().parent().parent().find('.compare_items .image').removeClass('hover');
  })


  $('.item_delete_link').click(function (e) {
    e.preventDefault();
    var id = $(this).attr('id');
    $('.compare_right_block .item_block[data-id=' + id + ']').remove();
    $('.compare_right_block .col_items_parameters[data-id=' + id + ']').remove();
    $('.compare_right_block .col_items_parameters[data-id=' + id + ']').remove();
    $('.js_scroll_table').jScrollPane({
      showArrows: true,
    });
    if ($('.compare_items .item_block').length <= 4) {
      $('.jspHorizontalBar').css('display', 'none');
      $('.btn_compare_left').css('display', 'none');
      $('.btn_compare_right').css('display', 'none');
    }
  })

  if ($('.compare_items .item_block').length <= 4) {
    $('.jspHorizontalBar').css('display', 'none');
    $('.btn_compare_left').css('display', 'none');
    $('.btn_compare_right').css('display', 'none');
  }


  /*-------------------validation-------------------*/
  $.validate({
    form: '.js_validation',
    onSubmit: false,
    modules: 'security',
    lang: 'ru'
  });
  $.validate({
    form: '.js_validation_comments',
    onSuccess: function () {
      $('.form_comment_block').fadeOut(300, function () {
        $('.comment_sent_text').fadeIn();
      });
      return false;
    }
  });
  $.validate({
    form: '.js_validation_has_message',
    onSubmit: false,
    onSuccess: function () {
      $('.custom-popup').fadeOut(300);
      if ($('.custom-overlay').is(':visible')) {
        $('.custom-popup.message_popup').delay(500).fadeIn();
      }
      else {
        $('.custom-popup.message_popup').prev('.custom-overlay').delay(500).fadeIn(300);
        $('.custom-popup.message_popup').delay(500).fadeIn();
      }
      return false;
    }
  });
  /*-------------------end validation-------------------*/

  /*compare page btn arrows click*/
  $('.js_compare_left').click(function (e) {
    e.preventDefault();
    var current = api.getContentPositionX();
    api.scrollTo(current - 226.8, 0, 300);
    $('.js_compare_right').css('display', 'block');
  })
  $('.js_compare_right').click(function (e) {
    e.preventDefault();
    var current = api.getContentPositionX();
    api.scrollTo(current + 226.8, 0, 300);
    $('.js_compare_left').css('display', 'block');
  })
  if ($('.inner_compare_right_block').length > 0) {
    if ($('.js_scroll_table').outerWidth() + api.getContentPositionX() >= api.getContentWidth() - 230) {
      $('.js_compare_right').css('display', 'none');
    }
    else $('.js_compare_right').css('display', 'block');
    if (api.getContentPositionX() < 230) {
      $('.js_compare_left').css('display', 'none');
    }
    else $('.js_compare_left').css('display', 'block');
  }
  if ($('.compare_items .item_block').length <= 4) {
    $('.js_compare_right, .js_compare_left').css('display', 'none');
  }
  $('.js_scroll_table').bind(
    'jsp-scroll-x',
    function (event, scrollPositionX, isAtTop, isAtBottom) {
      if ($('.js_scroll_table').outerWidth() + api.getContentPositionX() >= api.getContentWidth() - 10) {
        $('.js_compare_right').css('display', 'none');
      }
      else $('.js_compare_right').css('display', 'block');
      if (api.getContentPositionX() == 0) {
        $('.js_compare_left').css('display', 'none');
      }
      else $('.js_compare_left').css('display', 'block');
    }
  )
  /*end compare page btn arrows click*/


  $('.delivery_checkbox_block input[type=checkbox]').change(function () {
    var checkbox = $(this);
    var isCheked = $(this).prop('checked');
    if (isCheked == true) {
      $('.checkbox_delivery_block').parent().parent().find('input[type=checkbox]').not(this).prop('checked', false);
      $('.js_final_delivery_price').html(0.00);
    }
    if (isCheked == false) {
      $('.checkbox_delivery_block').parent().parent().find('input[type=checkbox]').prop('checked', false);
      checkbox.prop('checked');
    }
    var text = $('.delivery_checkbox_block input[type=checkbox]:checked').parent().find('.delivery_checkbox_hidden_price').html();
    var parent = $('.delivery_checkbox_block input[type=checkbox]:checked').parent().parent().parent();
    parent.find('.js_final_delivery_price').html(text);
    changePriceView();
  })


  $('select.js_icons_select').each(function () {
    var sb = new SelectBox({
      selectbox: $(this),
      //height: 150,
      width: 200
    });
  });


  $('.js_tooltip_item_property').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('added');
  })


  function ValidatePayerTab(tab) {
    var $emptyFields = $('.hidden_content.active input[data-validation]:enabled', tab).filter(function () {
      return $.trim(this.value) === '';
    });
    var id = tab.find('.hidden_content').find('.btn_next').attr('data-tab-info');
    if (!$emptyFields.length) {
      tab.find('.hidden_content').find('.btn_next').fadeIn();
      tab.find('.hidden_content').addClass('valid');
      tab.find('[data-tab-info]').addClass('valid');
      $('[data-tab-info].active', tab).addClass('valid');
      $('[data-tab-info=' + id + ']', tab).addClass('valid');
      //$(this).closest('.hidden_content',parent).find('.js_profile_btn_save').fadeIn();

    }
    else {
      $('.btn_next', tab).fadeOut();
      $(this).closest('.hidden_content', tab).removeClass('valid');
      //$('.js_tabs').find('.js_profile_btn_save',parent).css('display','none');
      $('[data-tab-info=' + id + ']', tab).removeClass('valid');
    }
  }

  /*fill payers block lk page*/
  function FillPayers() {
    $('.payers_block_holder').each(function () {
      var parent = $(this);
      $('.tab_block_holder .hidden_content.active input[data-validation]', parent).change(function () {
        ValidatePayerTab(parent);
      });
    })
  }

  function InitPayersInfoTabs() {
    var isAnimating = false;
    $('body').on('click', '[data-tab-info]', function (e) {
      e.preventDefault();
      if ($(this).hasClass('valid')) {
        if (!isAnimating) {
          var parent = $(this).closest('.js_tabs');
          var cls = $(this).attr('data-tab-info');
          isAnimating = true;
          $('[data-tab-info]', parent).removeClass('active');
          $('[data-tab-info=' + cls + ']', parent).addClass('active');


          if ($('.hidden_content', parent).hasClass('active')) {
            $('.hidden_content.active', parent).fadeOut(300, function () {
              $('.hidden_content.active', parent).removeClass('active');
              $('.hidden_content' + '#' + cls, parent).fadeIn(300, function () {
                isAnimating = false;
                $(this).find('[disabled="disabled"]:visible').removeAttr('disabled').trigger('refresh');
              });
              $('.hidden_content' + '#' + cls, parent).addClass('active');
              ValidatePayerTab($('.hidden_content' + '#' + cls, parent).closest('.payers_block_holder'));

              $('.js_select select:visible').styler({
                selectSearch: false
              });
              FillPayers();

            })
          }
          else {
            $('.hidden_content' + '#' + cls, parent).fadeIn(300, function () {
              isAnimating = false;
            });
            $('.hidden_content' + '#' + cls, parent).addClass('active');
            ValidatePayerTab($('.hidden_content' + '#' + cls, parent).closest('.payers_block_holder'));
          }
        }
      }
    });
    $('.payers_block_holder .tab_block_holder .hidden_content').each(function () {
      var parent = $(this);
      var $emptyFields = $('input[data-validation]:enabled', parent).filter(function () {
        return $.trim(this.value) === '';
      });
      if (!$emptyFields.length) {
        parent.find('.btn_next').fadeIn();
        parent.addClass('valid');
        var id = $(this).find('.btn_next').attr('data-tab-info');
        parent.closest('.js_tabs').find('[data-tab-info].active').addClass('valid');
        parent.closest('.js_tabs').find('[data-tab-info=' + id + ']').addClass('valid');
        $('[data-tab-info]', parent).addClass('valid');
      }
      else {
        $('.btn_next', parent).fadeOut();
        $('.hidden_content', parent).removeClass('valid');

        $('[data-tab-info]', parent).removeClass('valid');
      }
    });
  }


  FillPayers();
  InitPayersInfoTabs();
  /*fill payers block lk page*/


  $('.js_add_to_list, .js_delete_from_list').click(function (e) {
    e.preventDefault();
    $(this).closest('.js_tooltip_item_property').click();
    $().click();
  })
  $('.js_tooltip_item_property .tooltip_content .inner').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
  })
  $('.js_go_to_list').click(function (e) {
    e.preventDefault();
    var href = $(this).attr('data-href');
    window.location.href = href;
  })

  $('.js_show_tooltip').click(function () {
    $(this).parent().find('.hidden_tooltip').fadeIn(100);
    $(this).parent().find('.hidden_tooltip').addClass('active');
    return false;
  });

  $('body').click(function (e) {
    e.stopPropagation();
    $('.hidden_tooltip.active').fadeOut(100).removeClass('active');

  });


  $('.js_clean_range_slider').click(function (e) {
    e.preventDefault();
    var slider_range = $(this).closest('.range_slider_block').find('.range_slider_inner');
    var options = slider_range.slider('option');
    slider_range.slider('values', [options.min, options.max]);
    $(this).closest('.range_slider_block').find('.sliderValue[data-index=0]').val(options.min);
    $(this).closest('.range_slider_block').find('.sliderValue[data-index=1]').val(options.max);
  });


  $('.js_filter_view_list').click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).parent().find('.js_filter_view_tile').removeClass('active');
    $(this).addClass('active');
    $('.js_catalog_list_view_block').addClass('active');
    $('.js_catalog_tile_view_block').removeClass('active');
  })
  $('.js_filter_view_tile').click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).parent().find('.js_filter_view_list').removeClass('active');
    $(this).addClass('active');
    $('.js_catalog_tile_view_block').addClass('active');
    $('.js_catalog_list_view_block').removeClass('active');
  })
  if ($('.js_filter_view_list').hasClass('active')) {
    $(this).parent().find('.js_filter_view_tile').removeClass('active');
    $(this).addClass('active');
    $('.js_catalog_list_view_block').addClass('active');
    $('.js_catalog_tile_view_block').removeClass('active');
  }
  if ($('.js_filter_view_tile').hasClass('active')) {
    $(this).parent().find('.js_filter_view_list').removeClass('active');
    $(this).addClass('active');
    $('.js_catalog_tile_view_block').addClass('active');
    $('.js_catalog_list_view_block').removeClass('active');
  }


  $('.js_catalog_block_card').click(function (e) {
    e.preventDefault();
    var card_id = $(this).attr('data-card-id');
    var parent = $(this).closest('.catalog_block_row');
    $('.js_catalog_block_card').not(this).removeClass('active');
    $(this).addClass('active');

    var block = parent.find('.js_catalog_block_content_block[data-content-id=' + card_id + ']');
    $('.js_catalog_block_content_block').not(block).hide();
    block.show();

  })

  $('.toggle-mnu').click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    if ($('.toggle-mnu').hasClass('on')) closeMenu();
    else openMenu();
  })

  $('.main_menu_block a').click(function () {
    closeMenu();
  })

  $('.main_page_top_menu_block a').click(function () {
    closeMenu();
  })

});

function openMenu() {
  $('.toggle-mnu').addClass('on');
  $('.main_menu_block').addClass('visible');
  $('.main_page_top_menu_block').addClass('visible');
  $('.LK_top_left_block').addClass('full');
}

function closeMenu() {
  $('.toggle-mnu').removeClass('on');
  $('.main_menu_block').removeClass('visible');
  $('.main_page_top_menu_block').removeClass('visible');
  $('.LK_top_left_block').removeClass('full');
}
