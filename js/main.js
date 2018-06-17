/* ---------------------------------------------------------------------
Main.js
Target Browsers: All
------------------------------------------------------------------------ */

var NG = (function(NG, $) {

    /* ---------------------------------------------------------------------
    Global
    Small scripts
    ------------------------------------------------------------------------ */

    NG.Global = {
      init: function()
      {
        var self = this;
        self.globalSetup();
      },

		  globalSetup: function() {			

    	}

    }; // NG. Global End

    /* ---------------------------------------------------------------------
    BracketSelector
    Handles Bracket Selection Functionality
    ------------------------------------------------------------------------ */
    NG.BracketSelector = { 

      init: function() {

        if ( $('#bracket-selector').length < 1 )
          return;

        this.bind();

      },

      bind: function() { 

        $('.logo').click( NG.BracketSelector.selectTeam );

      },

      selectTeam: function() { 

        game = $(this).parents('.game').data('game');
        team = $(this).attr('class').replace("logo", "").replace("faded", '').replace('top', '').replace('bottom', '').replace('tbd', '').replace(/ /g, '');
        seed = $(this).parent().find('.seed').html().replace('(', '').replace(')', '');

        console.log( 'game: ' + game );
        console.log( 'team: ' + team );
        console.log( 'seed: ' + seed );

        $(this).removeClass('faded');

        NG.BracketSelector.fadeLoser( game, team );
        NG.BracketSelector.updateGames( game, team, seed );

      },

      fadeLoser: function( game, team ) {

        loser = $( '.game[data-game="' + game +'"] .logo').not( "."+team ); 

        if ( !loser.hasClass('faded') )
          loser.addClass('faded');

      },

      updateGames: function( game, team, seed) {

        // get game to update
        if ( game == 'afc1_1' )
        {
          afc1_2_selected = $('#afc1_2').data('seed');
          if ( seed == '4' && afc1_2_selected == '3' )
            newGame = 'afc2_1';
          else if ( seed == '4' && afc1_2_selected == '6' )
            newGame = 'afc2_2';
          else if ( seed == '5' && afc1_2_selected == '6' )
            newGame = 'afc2_2';
          else if ( seed == '5' && afc1_2_selected == '3' )
            newGame = 'afc2_1';
          else
            newGame = 'afc2_2';
        }
        else if (game == 'afc1_2')
        {
          if ( seed == '3' )
            newGame = 'afc2_2';
          else if ( seed == '6' )
            newGame = 'afc2_1';
        }
        else if ( game == 'afc2_1' || game == 'afc2_2' )
        {
          newGame = 'afc3';
        }
        else if ( game == 'afc3' ) 
        {
          newGame = 'superbowl';
        }
        else if ( game == 'nfc1_1' )
        {
          if ( seed == '3' )
            newGame = 'nfc2_1';
          else if ( seed == '6' )
            newGame = 'nfc2_2';
        }
        else if ( game == 'nfc1_2')
        {
          nfc1_1_selected = $('#nfc1_1').data('seed');
          if ( seed == '4' && nfc1_1_selected == '3' )
            newGame = 'nfc2_2';
          else if ( seed == '4' && nfc1_1_selected == '6' )
            newGame = 'nfc2_1';
          else if ( seed == '5' && nfc1_1_selected == '6' )
            newGame = 'nfc2_1';
          else if ( seed == '5' && nfc1_1_selected == '3' )
            newGame = 'nfc2_2';
          else
            newGame = 'nfc2_2';

        }
        else if ( game == 'nfc2_1' || game == 'nfc2_2' ) 
        {
          newGame = 'nfc3';
        }
        else if ( game == 'nfc3' )
        {
          newGame = 'superbowl';
        }
        else if ( game == 'superbowl' )
        {
          newGame = 'superbowl-winnner';
        }

        selectedValue    = $('.'+team).attr('src');
        presentValue     = $('#'+game).val();
        presentValueSeed = $('#'+game).data('seed');

        defaultValue = 'https://cdn2.vox-cdn.com/uploads/chorus_asset/file/7717629/question-mark-button__2_.0.png';

        $('#'+game).val( selectedValue );
        $('#'+game).data( 'seed', seed );

        if ( game == 'afc1_1' || game == 'nfc1_1' || game == 'afc2_1' || game == 'nfc2_1' || game == 'nfc1_2' || game == 'afc1_2' || game == 'afc3' ) {
          $('.game[data-game="' + newGame +'"] .logo.top').attr( 'src', selectedValue );
          $('.game[data-game="' + newGame +'"] .logo.top').attr( 'class', 'logo top selected ' + team );
        }
        else if ( game == 'afc2_2' || game == 'nfc2_2' || game == 'nfc3' ) {
          $('.game[data-game="' + newGame +'"] .logo.bottom').attr( 'src', selectedValue );
          $('.game[data-game="' + newGame +'"] .logo.bottom').attr( 'class', 'logo bottom ' + team );
        }

        if ( presentValue != selectedValue )
        {
          console.log( newGame );
          console.log( presentValueSeed );

          // update grandchildren nodes to default
          if ( game == 'afc1_2' ) 
          {
            
            $('#afc3').val( defaultValue );
            $('.game[data-game="afc3"] .logo.top').attr( 'src', defaultValue );
            $('.game[data-game="afc3"] .logo.top').attr( 'class', 'logo tbd top' );
            $('.game[data-game="afc3"] .logo.faded').removeClass( 'faded' );
            $('.game[data-game="afc3"] .logo.bottom').attr( 'src', defaultValue );
            $('.game[data-game="afc3"] .logo.bottom').attr( 'class', 'logo tbd bottom' );
            $('.game[data-game="afc3"] .logo.faded').removeClass( 'faded' );
            $('#afc2_1').val( defaultValue );
            $('.game[data-game="afc2_1"] .logo.faded').removeClass( 'faded' );
            $('#afc2_2').val( defaultValue );
            $('.game[data-game="afc2_2"] .logo.faded').removeClass( 'faded' );

            if ( newGame == 'afc2_1' && presentValueSeed != '6' ) {

              if ( $('#afc1_1').data('seed') != 0 )
              {
                $('#afc2_2').val( $('#afc1_1').val() );
                teamClass = $('.game[data-game="afc1_1"] .logo').not('.faded').attr('class').replace("logo", "").replace("faded", '').replace('top', '').replace('bottom', '').replace('tbd', '').replace(/ /g, '');
                $('.game[data-game="afc2_2"] .logo.top').attr( 'src', $('#afc1_1').val() );
                $('.game[data-game="afc2_2"] .logo.top').attr( 'class', 'logo top '+teamClass );
                $('.game[data-game="afc2_2"] .logo.faded').removeClass( 'faded' );
              }
              else
              {
                $('#afc2_2').val( defaultValue );
                $('.game[data-game="afc2_2"] .logo.top').attr( 'src', defaultValue );
                $('.game[data-game="afc2_2"] .logo.top').attr( 'class', 'logo tbd top' );
                $('.game[data-game="afc2_2"] .logo.faded').removeClass( 'faded' );
              }
            }
            else if ( newGame == 'afc2_2' && presentValueSeed != '3') {

              if ( $('#afc1_1').data('seed') != 0 )
              {
                $('#afc2_1').val( $('#afc1_1').val() );
                teamClass = $('.game[data-game="afc1_1"] .logo').not('.faded').attr('class').replace("logo", "").replace("faded", '').replace('top', '').replace('bottom', '').replace('tbd', '').replace(/ /g, '');
                $('.game[data-game="afc2_1"] .logo.top').attr( 'src', $('#afc1_1').val() );
                $('.game[data-game="afc2_1"] .logo.top').attr( 'class', 'logo top '+teamClass );
                $('.game[data-game="afc2_1"] .logo.faded').removeClass( 'faded' );
              }
              else
              {
                $('#afc2_1').val( defaultValue );
                $('.game[data-game="afc2_1"] .logo.top').attr( 'src', defaultValue );
                $('.game[data-game="afc2_1"] .logo.top').attr( 'class', 'logo tbd top' );
                $('.game[data-game="afc2_1"] .logo.faded').removeClass( 'faded' );
              }

            }

          } 
          else if ( game == 'afc1_2' ) {
            $('#afc3').val( defaultValue );
            $('.game[data-game="afc3"] .logo.top').attr( 'src', defaultValue );
            $('.game[data-game="afc3"] .logo.top').attr( 'class', 'logo tbd top' );
            $('.game[data-game="afc3"] .logo.faded').removeClass( 'faded' );
            $('.game[data-game="afc3"] .logo.bottom').attr( 'src', defaultValue );
            $('.game[data-game="afc3"] .logo.bottom').attr( 'class', 'logo tbd bottom' );
            $('.game[data-game="afc3"] .logo.faded').removeClass( 'faded' );
            $('#afc2_1').val( defaultValue );
            $('.game[data-game="afc2_1"] .logo.faded').removeClass( 'faded' );
            $('#afc2_2').val( defaultValue );
            $('.game[data-game="afc2_2"] .logo.faded').removeClass( 'faded' );
          }

          if ( game == 'nfc1_1' ) 
          {
            $('#nfc3').val( defaultValue );
            $('.game[data-game="nfc3"] .logo.top').attr( 'src', defaultValue );
            $('.game[data-game="nfc3"] .logo.top').attr( 'class', 'logo tbd top' );
            $('.game[data-game="nfc3"] .logo.faded').removeClass( 'faded' );
            $('#nfc3').val( defaultValue );
            $('.game[data-game="nfc3"] .logo.bottom').attr( 'src', defaultValue );
            $('.game[data-game="nfc3"] .logo.bottom').attr( 'class', 'logo tbd bottom' );
            $('.game[data-game="nfc3"] .logo.bottom').removeClass( 'faded' );
            $('#nfc2_1').val( defaultValue );
            $('.game[data-game="nfc2_1"] .logo.faded').removeClass( 'faded' );
            $('#nfc2_2').val( defaultValue );
            $('.game[data-game="nfc2_2"] .logo.faded').removeClass( 'faded' );

            if ( newGame == 'nfc2_2' && presentValueSeed == '3') {

              if ( $('#nfc1_2').data('seed') != 0 )
              {
                $('#nfc2_1').val( $('#nfc1_2').val() );
                teamClass = $('.game[data-game="nfc1_2"] .logo').not('.faded').attr('class').replace("logo", "").replace("faded", '').replace('top', '').replace('bottom', '').replace('tbd', '').replace(/ /g, '');
                $('.game[data-game="nfc2_1"] .logo.top').attr( 'src', $('#nfc1_2').val() );
                $('.game[data-game="nfc2_1"] .logo.top').attr( 'class', 'logo top '+teamClass );
                $('.game[data-game="nfc2_1"] .logo.faded').removeClass( 'faded' );
              }
              else
              {
                $('#nfc2_1').val( defaultValue );
                $('.game[data-game="nfc2_1"] .logo.top').attr( 'src', defaultValue );
                $('.game[data-game="nfc2_1"] .logo.top').attr( 'class', 'logo tbd top' );
                $('.game[data-game="nfc2_1"] .logo.faded').removeClass( 'faded' );
              }
            }
            else if ( newGame == 'nfc2_1' && presentValueSeed == '6') {

              if ( $('#nfc1_2').data('seed') != 0 )
              {
                $('#nfc2_2').val( $('#nfc1_2').val() );
                teamClass = $('.game[data-game="nfc1_2"] .logo').not('.faded').attr('class').replace("logo", "").replace("faded", '').replace('top', '').replace('bottom', '').replace('tbd', '').replace(/ /g, '');
                $('.game[data-game="nfc2_2"] .logo.top').attr( 'src', $('#nfc1_2').val() );
                $('.game[data-game="nfc2_2"] .logo.top').attr( 'class', 'logo top '+teamClass );
                $('.game[data-game="nfc2_2"] .logo.faded').removeClass( 'faded' );
              }
              else
              {
                $('#nfc2_2').val( defaultValue );
                $('.game[data-game="nfc2_2"] .logo.top').attr( 'src', defaultValue );
                $('.game[data-game="nfc2_2"] .logo.top').attr( 'class', 'logo tbd top' );
                $('.game[data-game="nfc2_2"] .logo.faded').removeClass( 'faded' );
              }

            }
          } 
          else if ( game == 'nfc1_2' ) {
            $('#nfc3').val( defaultValue );
            $('.game[data-game="nfc3"] .logo.bottom').attr( 'src', defaultValue );
            $('.game[data-game="nfc3"] .logo.bottom').attr( 'class', 'logo tbd bottom' );
            $('.game[data-game="nfc3"] .logo.faded').removeClass( 'faded' );
            $('.game[data-game="nfc3"] .logo.top').attr( 'src', defaultValue );
            $('.game[data-game="nfc3"] .logo.top').attr( 'class', 'logo tbd top' );
            $('.game[data-game="nfc3"] .logo.bottom').removeClass( 'faded' );
            $('#nfc2_1').val( defaultValue );
            $('.game[data-game="nfc2_1"] .logo.faded').removeClass( 'faded' );
            $('#nfc2_2').val( defaultValue );
            $('.game[data-game="nfc2_2"] .logo.faded').removeClass( 'faded' );
          }

          if ( game == 'afc1_1' || game == 'afc1_2' || game == 'afc2_1' || game == 'afc2_2' ) {
            $('#superbowl').val( defaultValue );
            $('.game[data-game="superbowl"] .logo.top').attr( 'src', defaultValue );
            $('.game[data-game="superbowl"] .logo.top').attr( 'class', 'logo tbd top' );
            $('.game[data-game="superbowl"] .logo.faded').removeClass( 'faded' );
          }
          else if ( game == 'nfc1_1' || game == 'nfc1_2' || game == 'nfc2_1' || game == 'nfc2_2' ) {
            $('#superbowl').val( defaultValue );
            $('.game[data-game="superbowl"] .logo.bottom').attr( 'src', defaultValue );
            $('.game[data-game="superbowl"] .logo.bottom').attr( 'class', 'logo tbd bottom' );
            $('.game[data-game="superbowl"] .logo.faded').removeClass( 'faded' );
          }
        
        }

      }

    };

    /* ---------------------------------------------------------------------
    Validate
    Validates entry before submitting
    ------------------------------------------------------------------------ */
    NG.Validate = { 

      init: function() {

        if ( $('#bracket-selector').length < 1 )
          return;

        this.bind();

      },

      bind: function() { 
        // on submit
        $('#bracket-selector').on( 'submit', function() { 
          
          console.log( NG.Validate.validateText() );
          console.log( NG.Validate.validateSelections() );

          if( NG.Validate.validateText() != false && NG.Validate.validateSelections() != false )
            return true;
          else
            return false;
        });
      },

      validateText: function() {

        // make sure text fields are not empty
        valid = true
        $('#bracket-selector input[type="text"]').each( function() { 

          if ( $(this).val() == '' )
          {
            valid = false;
            $(this).parent().addClass('has-error');
          }
          else
            $(this).parent().removeClass('has-error');

        });
        return valid; 
        // if they are, highlight in red

      },

      validateSelections: function() {

        // make sure all games have a winner selected.
        // if not, highlight border in red. 
        valid = true
        $('#bracket-selector input[type="hidden"]').each( function() { 
          
          console.log( $(this).val() );
          if ( $(this).val() == '' || $(this).val() == 'https://cdn2.vox-cdn.com/uploads/chorus_asset/file/5874119/tbd.0.png' )
          {
            valid = false;
            $(this).parent().addClass('game-error');
          }
          else
            $(this).parent().removeClass('game-error');

          console.log( 'valid: ' + valid );

        });
        return valid;

      }

    };


    /**
     * Doc Ready
     */
    $(function() {

      NG.Global.init();
      NG.BracketSelector.init();
      NG.Validate.init();

    });

    return NG;
}(NG || {}, jQuery));


/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 0.6.11
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */
function FastClick(t){"use strict";var e,i=this;if(this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=10,this.layer=t,!t||!t.nodeType)throw new TypeError("Layer must be a document node");this.onClick=function(){return FastClick.prototype.onClick.apply(i,arguments)},this.onMouse=function(){return FastClick.prototype.onMouse.apply(i,arguments)},this.onTouchStart=function(){return FastClick.prototype.onTouchStart.apply(i,arguments)},this.onTouchMove=function(){return FastClick.prototype.onTouchMove.apply(i,arguments)},this.onTouchEnd=function(){return FastClick.prototype.onTouchEnd.apply(i,arguments)},this.onTouchCancel=function(){return FastClick.prototype.onTouchCancel.apply(i,arguments)},FastClick.notNeeded(t)||(this.deviceIsAndroid&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,i,n){var s=Node.prototype.removeEventListener;"click"===e?s.call(t,e,i.hijacked||i,n):s.call(t,e,i,n)},t.addEventListener=function(e,i,n){var s=Node.prototype.addEventListener;"click"===e?s.call(t,e,i.hijacked||(i.hijacked=function(t){t.propagationStopped||i(t)}),n):s.call(t,e,i,n)}),"function"==typeof t.onclick&&(e=t.onclick,t.addEventListener("click",function(t){e(t)},!1),t.onclick=null))}FastClick.prototype.deviceIsAndroid=navigator.userAgent.indexOf("Android")>0,FastClick.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent),FastClick.prototype.deviceIsIOS4=FastClick.prototype.deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),FastClick.prototype.deviceIsIOSWithBadTarget=FastClick.prototype.deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),FastClick.prototype.needsClick=function(t){"use strict";switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(this.deviceIsIOS&&"file"===t.type||t.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(t.className)},FastClick.prototype.needsFocus=function(t){"use strict";switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!this.deviceIsAndroid;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},FastClick.prototype.sendClick=function(t,e){"use strict";var i,n;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),n=e.changedTouches[0],i=document.createEvent("MouseEvents"),i.initMouseEvent(this.determineEventType(t),!0,!0,window,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),i.forwardedTouchEvent=!0,t.dispatchEvent(i)},FastClick.prototype.determineEventType=function(t){"use strict";return this.deviceIsAndroid&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},FastClick.prototype.focus=function(t){"use strict";var e;this.deviceIsIOS&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},FastClick.prototype.updateScrollParent=function(t){"use strict";var e,i;if(e=t.fastClickScrollParent,!e||!e.contains(t)){i=t;do{if(i.scrollHeight>i.offsetHeight){e=i,t.fastClickScrollParent=i;break}i=i.parentElement}while(i)}e&&(e.fastClickLastScrollTop=e.scrollTop)},FastClick.prototype.getTargetElementFromEventTarget=function(t){"use strict";return t.nodeType===Node.TEXT_NODE?t.parentNode:t},FastClick.prototype.onTouchStart=function(t){"use strict";var e,i,n;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),i=t.targetTouches[0],this.deviceIsIOS){if(n=window.getSelection(),n.rangeCount&&!n.isCollapsed)return!0;if(!this.deviceIsIOS4){if(i.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=i.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=i.pageX,this.touchStartY=i.pageY,t.timeStamp-this.lastClickTime<200&&t.preventDefault(),!0},FastClick.prototype.touchHasMoved=function(t){"use strict";var e=t.changedTouches[0],i=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>i||Math.abs(e.pageY-this.touchStartY)>i?!0:!1},FastClick.prototype.onTouchMove=function(t){"use strict";return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},FastClick.prototype.findControl=function(t){"use strict";return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},FastClick.prototype.onTouchEnd=function(t){"use strict";var e,i,n,s,a,o=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<200)return this.cancelNextClick=!0,!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,i=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,this.deviceIsIOSWithBadTarget&&(a=t.changedTouches[0],o=document.elementFromPoint(a.pageX-window.pageXOffset,a.pageY-window.pageYOffset)||o,o.fastClickScrollParent=this.targetElement.fastClickScrollParent),n=o.tagName.toLowerCase(),"label"===n){if(e=this.findControl(o)){if(this.focus(o),this.deviceIsAndroid)return!1;o=e}}else if(this.needsFocus(o))return t.timeStamp-i>100||this.deviceIsIOS&&window.top!==window&&"input"===n?(this.targetElement=null,!1):(this.focus(o),this.deviceIsIOS4&&"select"===n||(this.targetElement=null,t.preventDefault()),!1);return this.deviceIsIOS&&!this.deviceIsIOS4&&(s=o.fastClickScrollParent,s&&s.fastClickLastScrollTop!==s.scrollTop)?!0:(this.needsClick(o)||(t.preventDefault(),this.sendClick(o,t)),!1)},FastClick.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},FastClick.prototype.onMouse=function(t){"use strict";return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},FastClick.prototype.onClick=function(t){"use strict";var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},FastClick.prototype.destroy=function(){"use strict";var t=this.layer;this.deviceIsAndroid&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},FastClick.notNeeded=function(t){"use strict";var e,i;if("undefined"==typeof window.ontouchstart)return!0;if(i=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!FastClick.prototype.deviceIsAndroid)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(i>31&&window.innerWidth<=window.screen.width)return!0}}return"none"===t.style.msTouchAction?!0:!1},FastClick.attach=function(t){"use strict";return new FastClick(t)},"undefined"!=typeof define&&define.amd?define(function(){"use strict";return FastClick}):"undefined"!=typeof module&&module.exports?(module.exports=FastClick.attach,module.exports.FastClick=FastClick):window.FastClick=FastClick,/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.1
 *
 */
function(t,e,i,n){var s=t(e);t.fn.lazyload=function(a){function o(){var e=0;l.each(function(){var i=t(this);if(!c.skip_invisible||i.is(":visible"))if(t.abovethetop(this,c)||t.leftofbegin(this,c));else if(t.belowthefold(this,c)||t.rightoffold(this,c)){if(++e>c.failure_limit)return!1}else i.trigger("appear"),e=0})}var r,l=this,c={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:e,data_attribute:"original",data_attribute_queries:[],skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return a&&(n!==a.failurelimit&&(a.failure_limit=a.failurelimit,delete a.failurelimit),n!==a.effectspeed&&(a.effect_speed=a.effectspeed,delete a.effectspeed),t.extend(c,a)),r=c.container===n||c.container===e?s:t(c.container),0===c.event.indexOf("scroll")&&r.bind(c.event,function(){return o()}),this.each(function(){var i=this,s=t(i);i.loaded=!1,(s.attr("src")===n||s.attr("src")===!1)&&(s.is("img")||s.is("iframe"))&&s.attr("src",c.placeholder),s.one("appear",function(){if(!this.loaded){if(c.appear){var n=l.length;c.appear.call(i,n,c)}for(var a=c.data_attribute,o=0;o<c.data_attribute_queries.length;o++){var r=c.data_attribute_queries[o];e.matchMedia(r.media).matches&&"undefined"!=typeof s.attr("data-"+r.data_name)&&(a=r.data_name)}if(s.is("iframe"))return void s.attr("src",s.attr("data-"+a));t("<img />").bind("load",function(){var e=s.attr("data-"+a);if("fade"==c.effect||"fadeIn"==c.effect){var n;n="fast"==c.effect_speed?200:"slow"==c.effect_speed?600:"undefined"==typeof c.effect_speed?400:Number(c.effect_speed);var o="opacity "+n/1e3+"s ease-in-out";s.css("opacity",0),s.css("opacity"),s.css({"-moz-transition":o,"-o-transition":o,"-webkit-transition":o,transition:o})}else s.hide();s.is("img")?s.attr("src",e):s.css("background-image","url('"+e+"')"),"fade"==c.effect||"fadeIn"==c.effect?s.css("opacity",1):s[c.effect](c.effect_speed),i.loaded=!0;var r=t.grep(l,function(t){return!t.loaded});if(l=t(r),c.load){var d=l.length;c.load.call(i,d,c)}}).attr("src",s.attr("data-"+a))}}),0!==c.event.indexOf("scroll")&&s.bind(c.event,function(){i.loaded||s.trigger("appear")})}),s.bind("resize",function(){o()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&s.bind("pageshow",function(e){e.originalEvent&&e.originalEvent.persisted&&l.each(function(){t(this).trigger("appear")})}),t(i).ready(function(){o()}),this},t.belowthefold=function(i,a){var o;return o=a.container===n||a.container===e?(e.innerHeight?e.innerHeight:s.height())+s.scrollTop():t(a.container).offset().top+t(a.container).height(),o<=t(i).offset().top-a.threshold},t.rightoffold=function(i,a){var o;return o=a.container===n||a.container===e?s.width()+s.scrollLeft():t(a.container).offset().left+t(a.container).width(),o<=t(i).offset().left-a.threshold},t.abovethetop=function(i,a){var o;o=a.container===n||a.container===e?s.scrollTop():t(a.container).offset().top;var r=t(i).offset().top+a.threshold+t(i).height();return 0!==r&&o>=r},t.leftofbegin=function(i,a){var o;return o=a.container===n||a.container===e?s.scrollLeft():t(a.container).offset().left,o>=t(i).offset().left+a.threshold+t(i).width()},t.inviewport=function(e,i){return!(t.rightoffold(e,i)||t.leftofbegin(e,i)||t.belowthefold(e,i)||t.abovethetop(e,i))},t.extend(t.expr[":"],{"below-the-fold":function(e){return t.belowthefold(e,{threshold:0})},"above-the-top":function(e){return!t.belowthefold(e,{threshold:0})},"right-of-screen":function(e){return t.rightoffold(e,{threshold:0})},"left-of-screen":function(e){return!t.rightoffold(e,{threshold:0})},"in-viewport":function(e){return t.inviewport(e,{threshold:0})},"above-the-fold":function(e){return!t.belowthefold(e,{threshold:0})},"right-of-fold":function(e){return t.rightoffold(e,{threshold:0})},"left-of-fold":function(e){return!t.rightoffold(e,{threshold:0})}})}(jQuery,window,document),/*! matchMedia() polyfill - Test a CSS media type/query in JS. https://github.com/paulirish/matchMedia.js/ Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia||(window.matchMedia=function(){"use strict";var t=window.styleMedia||window.media;if(!t){var e=document.createElement("style"),i=document.getElementsByTagName("script")[0],n=null;e.type="text/css",e.id="matchmediajs-test",i.parentNode.insertBefore(e,i),n="getComputedStyle"in window&&window.getComputedStyle(e,null)||e.currentStyle,t={matchMedium:function(t){var i="@media "+t+"{ #matchmediajs-test { width: 1px; } }";return e.styleSheet?e.styleSheet.cssText=i:e.textContent=i,"1px"===n.width}}}return function(e){return{matches:t.matchMedium(e||"all"),media:e||"all"}}}()),window.Modernizr=function(t,e,i){function n(t){_.cssText=t}function s(t,e){return typeof t===e}function a(t,e){return!!~(""+t).indexOf(e)}function o(t,e){for(var n in t){var s=t[n];if(!a(s,"-")&&_[s]!==i)return"pfx"==e?s:!0}return!1}function r(t,e,n){for(var a in t){var o=e[t[a]];if(o!==i)return n===!1?t[a]:s(o,"function")?o.bind(n||e):o}return!1}function l(t,e,i){var n=t.charAt(0).toUpperCase()+t.slice(1),a=(t+" "+x.join(n+" ")+n).split(" ");return s(e,"string")||s(e,"undefined")?o(a,e):(a=(t+" "+w.join(n+" ")+n).split(" "),r(a,e,i))}var c,d,h,u="2.8.3",f={},p=!0,g=e.documentElement,m="modernizr",v=e.createElement(m),_=v.style,b=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),y="Webkit Moz O ms",x=y.split(" "),w=y.toLowerCase().split(" "),k={},C=[],S=C.slice,$=function(t,i,n,s){var a,o,r,l,c=e.createElement("div"),d=e.body,h=d||e.createElement("body");if(parseInt(n,10))for(;n--;)r=e.createElement("div"),r.id=s?s[n]:m+(n+1),c.appendChild(r);return a=["&#173;",'<style id="s',m,'">',t,"</style>"].join(""),c.id=m,(d?c:h).innerHTML+=a,h.appendChild(c),d||(h.style.background="",h.style.overflow="hidden",l=g.style.overflow,g.style.overflow="hidden",g.appendChild(h)),o=i(c,t),d?c.parentNode.removeChild(c):(h.parentNode.removeChild(h),g.style.overflow=l),!!o},A=function(e){var i=t.matchMedia||t.msMatchMedia;if(i)return i(e)&&i(e).matches||!1;var n;return $("@media "+e+" { #"+m+" { position: absolute; } }",function(e){n="absolute"==(t.getComputedStyle?getComputedStyle(e,null):e.currentStyle).position}),n},T={}.hasOwnProperty;h=s(T,"undefined")||s(T.call,"undefined")?function(t,e){return e in t&&s(t.constructor.prototype[e],"undefined")}:function(t,e){return T.call(t,e)},Function.prototype.bind||(Function.prototype.bind=function(t){var e=this;if("function"!=typeof e)throw new TypeError;var i=S.call(arguments,1),n=function(){if(this instanceof n){var s=function(){};s.prototype=e.prototype;var a=new s,o=e.apply(a,i.concat(S.call(arguments)));return Object(o)===o?o:a}return e.apply(t,i.concat(S.call(arguments)))};return n}),k.flexbox=function(){return l("flexWrap")},k.touch=function(){var i;return"ontouchstart"in t||t.DocumentTouch&&e instanceof DocumentTouch?i=!0:$(["@media (",b.join("touch-enabled),("),m,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(t){i=9===t.offsetTop}),i},k.history=function(){return!(!t.history||!history.pushState)},k.cssanimations=function(){return l("animationName")},k.csstransforms=function(){return!!l("transform")},k.csstransforms3d=function(){var t=!!l("perspective");return t&&"webkitPerspective"in g.style&&$("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(e,i){t=9===e.offsetLeft&&3===e.offsetHeight}),t},k.csstransitions=function(){return l("transition")},k.video=function(){var t=e.createElement("video"),i=!1;try{(i=!!t.canPlayType)&&(i=new Boolean(i),i.ogg=t.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),i.h264=t.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),i.webm=t.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(n){}return i};for(var F in k)h(k,F)&&(d=F.toLowerCase(),f[d]=k[F](),C.push((f[d]?"":"no-")+d));return f.addTest=function(t,e){if("object"==typeof t)for(var n in t)h(t,n)&&f.addTest(n,t[n]);else{if(t=t.toLowerCase(),f[t]!==i)return f;e="function"==typeof e?e():e,"undefined"!=typeof p&&p&&(g.className+=" "+(e?"":"no-")+t),f[t]=e}return f},n(""),v=c=null,f._version=u,f._prefixes=b,f._domPrefixes=w,f._cssomPrefixes=x,f.mq=A,f.testProp=function(t){return o([t])},f.testAllProps=l,f.testStyles=$,f.prefixed=function(t,e,i){return e?l(t,e,i):l(t,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(p?" js "+C.join(" "):""),f}(this,this.document),function(t,e){function i(t,e){var i=t.createElement("p"),n=t.getElementsByTagName("head")[0]||t.documentElement;return i.innerHTML="x<style>"+e+"</style>",n.insertBefore(i.lastChild,n.firstChild)}function n(){var t=k.elements;return"string"==typeof t?t.split(" "):t}function s(t){var e=w[t[y]];return e||(e={},x++,t[y]=x,w[x]=e),e}function a(t,i,n){if(i||(i=e),g)return i.createElement(t);n||(n=s(i));var a;return a=n.cache[t]?n.cache[t].cloneNode():b.test(t)?(n.cache[t]=n.createElem(t)).cloneNode():n.createElem(t),!a.canHaveChildren||_.test(t)||a.tagUrn?a:n.frag.appendChild(a)}function o(t,i){if(t||(t=e),g)return t.createDocumentFragment();i=i||s(t);for(var a=i.frag.cloneNode(),o=0,r=n(),l=r.length;l>o;o++)a.createElement(r[o]);return a}function r(t,e){e.cache||(e.cache={},e.createElem=t.createElement,e.createFrag=t.createDocumentFragment,e.frag=e.createFrag()),t.createElement=function(i){return k.shivMethods?a(i,t,e):e.createElem(i)},t.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+n().join().replace(/\w+/g,function(t){return e.createElem(t),e.frag.createElement(t),'c("'+t+'")'})+");return n}")(k,e.frag)}function l(t){t||(t=e);var n=s(t);return!k.shivCSS||p||n.hasCSS||(n.hasCSS=!!i(t,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),g||r(t,n),t}function c(t){for(var e,i=t.getElementsByTagName("*"),s=i.length,a=RegExp("^(?:"+n().join("|")+")$","i"),o=[];s--;)e=i[s],a.test(e.nodeName)&&o.push(e.applyElement(d(e)));return o}function d(t){for(var e,i=t.attributes,n=i.length,s=t.ownerDocument.createElement(S+":"+t.nodeName);n--;)e=i[n],e.specified&&s.setAttribute(e.nodeName,e.nodeValue);return s.style.cssText=t.style.cssText,s}function h(t){for(var e,i=t.split("{"),s=i.length,a=RegExp("(^|[\\s,>+~])("+n().join("|")+")(?=[[\\s,>+~#.:]|$)","gi"),o="$1"+S+"\\:$2";s--;)e=i[s]=i[s].split("}"),e[e.length-1]=e[e.length-1].replace(a,o),i[s]=e.join("}");return i.join("{")}function u(t){for(var e=t.length;e--;)t[e].removeNode()}function f(t){function e(){clearTimeout(o._removeSheetTimer),n&&n.removeNode(!0),n=null}var n,a,o=s(t),r=t.namespaces,l=t.parentWindow;return!$||t.printShived?t:("undefined"==typeof r[S]&&r.add(S),l.attachEvent("onbeforeprint",function(){e();for(var s,o,r,l=t.styleSheets,d=[],u=l.length,f=Array(u);u--;)f[u]=l[u];for(;r=f.pop();)if(!r.disabled&&C.test(r.media)){try{s=r.imports,o=s.length}catch(p){o=0}for(u=0;o>u;u++)f.push(s[u]);try{d.push(r.cssText)}catch(p){}}d=h(d.reverse().join("")),a=c(t),n=i(t,d)}),l.attachEvent("onafterprint",function(){u(a),clearTimeout(o._removeSheetTimer),o._removeSheetTimer=setTimeout(e,500)}),t.printShived=!0,t)}var p,g,m="3.7.0",v=t.html5||{},_=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,b=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,y="_html5shiv",x=0,w={};!function(){try{var t=e.createElement("a");t.innerHTML="<xyz></xyz>",p="hidden"in t,g=1==t.childNodes.length||function(){e.createElement("a");var t=e.createDocumentFragment();return"undefined"==typeof t.cloneNode||"undefined"==typeof t.createDocumentFragment||"undefined"==typeof t.createElement}()}catch(i){p=!0,g=!0}}();var k={elements:v.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:m,shivCSS:v.shivCSS!==!1,supportsUnknownElements:g,shivMethods:v.shivMethods!==!1,type:"default",shivDocument:l,createElement:a,createDocumentFragment:o};t.html5=k,l(e);var C=/^$|\b(?:all|print)\b/,S="html5shiv",$=!g&&function(){var i=e.documentElement;return!("undefined"==typeof e.namespaces||"undefined"==typeof e.parentWindow||"undefined"==typeof i.applyElement||"undefined"==typeof i.removeNode||"undefined"==typeof t.attachEvent)}();k.type+=" print",k.shivPrint=f,f(e)}(this,document),function(t,e,i){function n(t){return"[object Function]"==m.call(t)}function s(t){return"string"==typeof t}function a(){}function o(t){return!t||"loaded"==t||"complete"==t||"uninitialized"==t}function r(){var t=v.shift();_=1,t?t.t?p(function(){("c"==t.t?u.injectCss:u.injectJs)(t.s,0,t.a,t.x,t.e,1)},0):(t(),r()):_=0}function l(t,i,n,s,a,l,c){function d(e){if(!f&&o(h.readyState)&&(b.r=f=1,!_&&r(),h.onload=h.onreadystatechange=null,e)){"img"!=t&&p(function(){x.removeChild(h)},50);for(var n in $[i])$[i].hasOwnProperty(n)&&$[i][n].onload()}}var c=c||u.errorTimeout,h=e.createElement(t),f=0,m=0,b={t:n,s:i,e:a,a:l,x:c};1===$[i]&&(m=1,$[i]=[]),"object"==t?h.data=i:(h.src=i,h.type=t),h.width=h.height="0",h.onerror=h.onload=h.onreadystatechange=function(){d.call(this,m)},v.splice(s,0,b),"img"!=t&&(m||2===$[i]?(x.insertBefore(h,y?null:g),p(d,c)):$[i].push(h))}function c(t,e,i,n,a){return _=0,e=e||"j",s(t)?l("c"==e?k:w,t,e,this.i++,i,n,a):(v.splice(this.i++,0,t),1==v.length&&r()),this}function d(){var t=u;return t.loader={load:c,i:0},t}var h,u,f=e.documentElement,p=t.setTimeout,g=e.getElementsByTagName("script")[0],m={}.toString,v=[],_=0,b="MozAppearance"in f.style,y=b&&!!e.createRange().compareNode,x=y?f:g.parentNode,f=t.opera&&"[object Opera]"==m.call(t.opera),f=!!e.attachEvent&&!f,w=b?"object":f?"script":"img",k=f?"script":w,C=Array.isArray||function(t){return"[object Array]"==m.call(t)},S=[],$={},A={timeout:function(t,e){return e.length&&(t.timeout=e[0]),t}};u=function(t){function e(t){var e,i,n,t=t.split("!"),s=S.length,a=t.pop(),o=t.length,a={url:a,origUrl:a,prefixes:t};for(i=0;o>i;i++)n=t[i].split("="),(e=A[n.shift()])&&(a=e(a,n));for(i=0;s>i;i++)a=S[i](a);return a}function o(t,s,a,o,r){var l=e(t),c=l.autoCallback;l.url.split(".").pop().split("?").shift(),l.bypass||(s&&(s=n(s)?s:s[t]||s[o]||s[t.split("/").pop().split("?")[0]]),l.instead?l.instead(t,s,a,o,r):($[l.url]?l.noexec=!0:$[l.url]=1,a.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":i,l.noexec,l.attrs,l.timeout),(n(s)||n(c))&&a.load(function(){d(),s&&s(l.origUrl,r,o),c&&c(l.origUrl,r,o),$[l.url]=2})))}function r(t,e){function i(t,i){if(t){if(s(t))i||(h=function(){var t=[].slice.call(arguments);u.apply(this,t),f()}),o(t,h,e,0,c);else if(Object(t)===t)for(l in r=function(){var e,i=0;for(e in t)t.hasOwnProperty(e)&&i++;return i}(),t)t.hasOwnProperty(l)&&(!i&&!--r&&(n(h)?h=function(){var t=[].slice.call(arguments);u.apply(this,t),f()}:h[l]=function(t){return function(){var e=[].slice.call(arguments);t&&t.apply(this,e),f()}}(u[l])),o(t[l],h,e,l,c))}else!i&&f()}var r,l,c=!!t.test,d=t.load||t.both,h=t.callback||a,u=h,f=t.complete||a;i(c?t.yep:t.nope,!!d),d&&i(d)}var l,c,h=this.yepnope.loader;if(s(t))o(t,0,h,0);else if(C(t))for(l=0;l<t.length;l++)c=t[l],s(c)?o(c,0,h,0):C(c)?u(c):Object(c)===c&&r(c,h);else Object(t)===t&&r(t,h)},u.addPrefix=function(t,e){A[t]=e},u.addFilter=function(t){S.push(t)},u.errorTimeout=1e4,null==e.readyState&&e.addEventListener&&(e.readyState="loading",e.addEventListener("DOMContentLoaded",h=function(){e.removeEventListener("DOMContentLoaded",h,0),e.readyState="complete"},0)),t.yepnope=d(),t.yepnope.executeStack=r,t.yepnope.injectJs=function(t,i,n,s,l,c){var d,h,f=e.createElement("script"),s=s||u.errorTimeout;f.src=t;for(h in n)f.setAttribute(h,n[h]);i=c?r:i||a,f.onreadystatechange=f.onload=function(){!d&&o(f.readyState)&&(d=1,i(),f.onload=f.onreadystatechange=null)},p(function(){d||(d=1,i(1))},s),l?f.onload():g.parentNode.insertBefore(f,g)},t.yepnope.injectCss=function(t,i,n,s,o,l){var c,s=e.createElement("link"),i=l?r:i||a;s.href=t,s.rel="stylesheet",s.type="text/css";for(c in n)s.setAttribute(c,n[c]);o||(g.parentNode.insertBefore(s,g),p(i,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},function(t){var e=!1,i=!1,n=!1,s=!1,a=0,o=function(i){var n="/account/auth_status";t.getJSON(n,function(t){e=!!t.logged_in,i&&i(t)})},r=function(){h(),t("#comments-overlay").hide()},l=function(t){return e&&i?void(n&&d()):void(e?(i=!0,c(t)):e||t.html('<p>Please <a target="_blank" id="plz-login" href="/account/login">login to Polygon first</a>.</p>'))},c=function(e){var i="/polygon_entries/iframed_comments"+SBN.Context.comments_slug,s=t('<iframe id="comments-iframe" scrolling="no" src="'+i+'"></iframe>');e.empty().append(s),t("#comments-iframe").load(function(){n=!0,u(),d()})},d=function(){s=setInterval(u,500),u()},h=function(){s&&clearInterval(s)},u=function(){var e=t("#comments-iframe"),i=e[0],n=i.contentWindow?i.contentWindow:i.contentDocument.defaultView,s=n.$("body").height();s!=a&&(a=s,e.css({height:a}))},f=function(t){t.html("<p class='m-loader'></p>")};t(function(){var i=t(".comments-content");t(document).on("click","#plz-login",function(t){r()}),t(".review-comments").click(function(n){n.preventDefault(),e||f(i),o(function(t){l(i)}),t("#comments-overlay").show()}),t("#comments-overlay").click(function(e){t(e.target).is(t("#comments-overlay"))&&(e.preventDefault(),r())})})}(jQuery);var EdProd=EdProd||{};EdProd.Social=function(t){var e,i=t("a[data-analytics-social]"),n=function(e){var i=t(this),n=500,s=300,a=window.innerWidth/2-n/2,o=window.innerHeight/2-s/2;1!==e.which||e.metaKey||e.ctrlKey||(e.preventDefault(),window.open(i.attr("href"),"","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width="+n+",height="+s+",top="+o+",left="+a))},s=function(){var n={url:"undefined"!=typeof e?e:document.URL.slice(0,document.URL.indexOf("?")),text:t("meta[property='og:description']").attr("content"),shareImg:t("meta[property='og:image']").attr("content"),title:t("meta[property='og:title']").attr("content"),via:t("meta[name='twitter:site']").attr("content").substring(1)};i.each(function(){switch(t(this).attr("data-analytics-social")){case"twitter":url="https://twitter.com/share?url="+encodeURIComponent(n.url.concat("?utm_medium=social&utm_source=twitter"))+"&text="+encodeURIComponent(n.text)+"&via="+encodeURIComponent(n.via);break;case"facebook":url="https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(n.url);break;case"pinterest":url="http://www.pinterest.com/pin/create/button/?url="+encodeURIComponent(n.url)+"&media="+encodeURIComponent(n.shareImg)+"&description="+encodeURIComponent(n.text);break;default:url="http://product.voxmedia.com/404"}t(this).attr("href",url)})};t(document).ready(function(){i.on("click",n),setTimeout(function(){"undefined"!=typeof pymChild&&(pymChild.sendMessage("childLoaded","ready"),pymChild.sendHeight(),pymChild.onMessage("setShareUrl",function(t){t=JSON.parse(t);t.slug;e=t.url.replace("#"+t.slug,""),s()})),s()},1e3)})}(jQuery),$(function(){FastClick.attach(document.body)});

/**
 * SmoothScroll
 * This helper script created by DWUser.com.  Copyright 2012 DWUser.com.  
 * Dual-licensed under the GPL and MIT licenses.  
 * All individual scripts remain property of their copyrighters.
 * Date: 10-Sep-2012
 * Version: 1.0.1
 */
if (!window['jQuery']) alert('The jQuery library must be included before the smoothscroll.js file.  The plugin will not work propery.');

/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map

/**
 * jQuery.LocalScroll
 * Copyright (c) 2007-2010 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 05/31/2010
 * @author Ariel Flesler
 * @version 1.2.8b
 **/
;(function(b){function g(a,e,d){var h=e.hash.slice(1),f=document.getElementById(h)||document.getElementsByName(h)[0];if(f){a&&a.preventDefault();var c=b(d.target);if(!(d.lock&&c.is(":animated")||d.onBefore&&!1===d.onBefore(a,f,c))){d.stop&&c._scrollable().stop(!0);if(d.hash){var a=f.id==h?"id":"name",g=b("<a> </a>").attr(a,h).css({position:"absolute",top:b(window).scrollTop(),left:b(window).scrollLeft()});f[a]="";b("body").prepend(g);location=e.hash;g.remove();f[a]=h}c.scrollTo(f,d).trigger("notify.serialScroll",
[f])}}}var i=location.href.replace(/#.*/,""),c=b.localScroll=function(a){b("body").localScroll(a)};c.defaults={duration:1E3,axis:"y",event:"click",stop:!0,target:window,reset:!0};c.hash=function(a){if(location.hash){a=b.extend({},c.defaults,a);a.hash=!1;if(a.reset){var e=a.duration;delete a.duration;b(a.target).scrollTo(0,a);a.duration=e}g(0,location,a)}};b.fn.localScroll=function(a){function e(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,"")==i&&(!a.filter||b(this).is(a.filter))}
a=b.extend({},c.defaults,a);return a.lazy?this.bind(a.event,function(d){var c=b([d.target,d.target.parentNode]).filter(e)[0];c&&g(d,c,a)}):this.find("a,area").filter(e).bind(a.event,function(b){g(b,this,a)}).end().end()}})(jQuery);

// Initialize all .smoothScroll links
jQuery(function($){ $.localScroll({filter:'.smoothScroll'}); });

// Generated by CoffeeScript 1.6.2
/*!
jQuery Waypoints - v2.0.5
Copyright (c) 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/


(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice;

  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define('waypoints', ['jquery'], function($) {
        return factory($, root);
      });
    } else {
      return factory(root.jQuery, root);
    }
  })(window, function($, window) {
    var $w, Context, Waypoint, allWaypoints, contextCounter, contextKey, contexts, isTouch, jQMethods, methods, resizeEvent, scrollEvent, waypointCounter, waypointKey, wp, wps;

    $w = $(window);
    isTouch = __indexOf.call(window, 'ontouchstart') >= 0;
    allWaypoints = {
      horizontal: {},
      vertical: {}
    };
    contextCounter = 1;
    contexts = {};
    contextKey = 'waypoints-context-id';
    resizeEvent = 'resize.waypoints';
    scrollEvent = 'scroll.waypoints';
    waypointCounter = 1;
    waypointKey = 'waypoints-waypoint-ids';
    wp = 'waypoint';
    wps = 'waypoints';
    Context = (function() {
      function Context($element) {
        var _this = this;

        this.$element = $element;
        this.element = $element[0];
        this.didResize = false;
        this.didScroll = false;
        this.id = 'context' + contextCounter++;
        this.oldScroll = {
          x: $element.scrollLeft(),
          y: $element.scrollTop()
        };
        this.waypoints = {
          horizontal: {},
          vertical: {}
        };
        this.element[contextKey] = this.id;
        contexts[this.id] = this;
        $element.bind(scrollEvent, function() {
          var scrollHandler;

          if (!(_this.didScroll || isTouch)) {
            _this.didScroll = true;
            scrollHandler = function() {
              _this.doScroll();
              return _this.didScroll = false;
            };
            return window.setTimeout(scrollHandler, $[wps].settings.scrollThrottle);
          }
        });
        $element.bind(resizeEvent, function() {
          var resizeHandler;

          if (!_this.didResize) {
            _this.didResize = true;
            resizeHandler = function() {
              $[wps]('refresh');
              return _this.didResize = false;
            };
            return window.setTimeout(resizeHandler, $[wps].settings.resizeThrottle);
          }
        });
      }

      Context.prototype.doScroll = function() {
        var axes,
          _this = this;

        axes = {
          horizontal: {
            newScroll: this.$element.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: 'right',
            backward: 'left'
          },
          vertical: {
            newScroll: this.$element.scrollTop(),
            oldScroll: this.oldScroll.y,
            forward: 'down',
            backward: 'up'
          }
        };
        if (isTouch && (!axes.vertical.oldScroll || !axes.vertical.newScroll)) {
          $[wps]('refresh');
        }
        $.each(axes, function(aKey, axis) {
          var direction, isForward, triggered;

          triggered = [];
          isForward = axis.newScroll > axis.oldScroll;
          direction = isForward ? axis.forward : axis.backward;
          $.each(_this.waypoints[aKey], function(wKey, waypoint) {
            var _ref, _ref1;

            if ((axis.oldScroll < (_ref = waypoint.offset) && _ref <= axis.newScroll)) {
              return triggered.push(waypoint);
            } else if ((axis.newScroll < (_ref1 = waypoint.offset) && _ref1 <= axis.oldScroll)) {
              return triggered.push(waypoint);
            }
          });
          triggered.sort(function(a, b) {
            return a.offset - b.offset;
          });
          if (!isForward) {
            triggered.reverse();
          }
          return $.each(triggered, function(i, waypoint) {
            if (waypoint.options.continuous || i === triggered.length - 1) {
              return waypoint.trigger([direction]);
            }
          });
        });
        return this.oldScroll = {
          x: axes.horizontal.newScroll,
          y: axes.vertical.newScroll
        };
      };

      Context.prototype.refresh = function() {
        var axes, cOffset, isWin,
          _this = this;

        isWin = $.isWindow(this.element);
        cOffset = this.$element.offset();
        this.doScroll();
        axes = {
          horizontal: {
            contextOffset: isWin ? 0 : cOffset.left,
            contextScroll: isWin ? 0 : this.oldScroll.x,
            contextDimension: this.$element.width(),
            oldScroll: this.oldScroll.x,
            forward: 'right',
            backward: 'left',
            offsetProp: 'left'
          },
          vertical: {
            contextOffset: isWin ? 0 : cOffset.top,
            contextScroll: isWin ? 0 : this.oldScroll.y,
            contextDimension: isWin ? $[wps]('viewportHeight') : this.$element.height(),
            oldScroll: this.oldScroll.y,
            forward: 'down',
            backward: 'up',
            offsetProp: 'top'
          }
        };
        return $.each(axes, function(aKey, axis) {
          return $.each(_this.waypoints[aKey], function(i, waypoint) {
            var adjustment, elementOffset, oldOffset, _ref, _ref1;

            adjustment = waypoint.options.offset;
            oldOffset = waypoint.offset;
            elementOffset = $.isWindow(waypoint.element) ? 0 : waypoint.$element.offset()[axis.offsetProp];
            if ($.isFunction(adjustment)) {
              adjustment = adjustment.apply(waypoint.element);
            } else if (typeof adjustment === 'string') {
              adjustment = parseFloat(adjustment);
              if (waypoint.options.offset.indexOf('%') > -1) {
                adjustment = Math.ceil(axis.contextDimension * adjustment / 100);
              }
            }
            waypoint.offset = elementOffset - axis.contextOffset + axis.contextScroll - adjustment;
            if ((waypoint.options.onlyOnScroll && (oldOffset != null)) || !waypoint.enabled) {
              return;
            }
            if (oldOffset !== null && (oldOffset < (_ref = axis.oldScroll) && _ref <= waypoint.offset)) {
              return waypoint.trigger([axis.backward]);
            } else if (oldOffset !== null && (oldOffset > (_ref1 = axis.oldScroll) && _ref1 >= waypoint.offset)) {
              return waypoint.trigger([axis.forward]);
            } else if (oldOffset === null && axis.oldScroll >= waypoint.offset) {
              return waypoint.trigger([axis.forward]);
            }
          });
        });
      };

      Context.prototype.checkEmpty = function() {
        if ($.isEmptyObject(this.waypoints.horizontal) && $.isEmptyObject(this.waypoints.vertical)) {
          this.$element.unbind([resizeEvent, scrollEvent].join(' '));
          return delete contexts[this.id];
        }
      };

      return Context;

    })();
    Waypoint = (function() {
      function Waypoint($element, context, options) {
        var idList, _ref;

        if (options.offset === 'bottom-in-view') {
          options.offset = function() {
            var contextHeight;

            contextHeight = $[wps]('viewportHeight');
            if (!$.isWindow(context.element)) {
              contextHeight = context.$element.height();
            }
            return contextHeight - $(this).outerHeight();
          };
        }
        this.$element = $element;
        this.element = $element[0];
        this.axis = options.horizontal ? 'horizontal' : 'vertical';
        this.callback = options.handler;
        this.context = context;
        this.enabled = options.enabled;
        this.id = 'waypoints' + waypointCounter++;
        this.offset = null;
        this.options = options;
        context.waypoints[this.axis][this.id] = this;
        allWaypoints[this.axis][this.id] = this;
        idList = (_ref = this.element[waypointKey]) != null ? _ref : [];
        idList.push(this.id);
        this.element[waypointKey] = idList;
      }

      Waypoint.prototype.trigger = function(args) {
        if (!this.enabled) {
          return;
        }
        if (this.callback != null) {
          this.callback.apply(this.element, args);
        }
        if (this.options.triggerOnce) {
          return this.destroy();
        }
      };

      Waypoint.prototype.disable = function() {
        return this.enabled = false;
      };

      Waypoint.prototype.enable = function() {
        this.context.refresh();
        return this.enabled = true;
      };

      Waypoint.prototype.destroy = function() {
        delete allWaypoints[this.axis][this.id];
        delete this.context.waypoints[this.axis][this.id];
        return this.context.checkEmpty();
      };

      Waypoint.getWaypointsByElement = function(element) {
        var all, ids;

        ids = element[waypointKey];
        if (!ids) {
          return [];
        }
        all = $.extend({}, allWaypoints.horizontal, allWaypoints.vertical);
        return $.map(ids, function(id) {
          return all[id];
        });
      };

      return Waypoint;

    })();
    methods = {
      init: function(f, options) {
        var _ref;

        options = $.extend({}, $.fn[wp].defaults, options);
        if ((_ref = options.handler) == null) {
          options.handler = f;
        }
        this.each(function() {
          var $this, context, contextElement, _ref1;

          $this = $(this);
          contextElement = (_ref1 = options.context) != null ? _ref1 : $.fn[wp].defaults.context;
          if (!$.isWindow(contextElement)) {
            contextElement = $this.closest(contextElement);
          }
          contextElement = $(contextElement);
          context = contexts[contextElement[0][contextKey]];
          if (!context) {
            context = new Context(contextElement);
          }
          return new Waypoint($this, context, options);
        });
        $[wps]('refresh');
        return this;
      },
      disable: function() {
        return methods._invoke.call(this, 'disable');
      },
      enable: function() {
        return methods._invoke.call(this, 'enable');
      },
      destroy: function() {
        return methods._invoke.call(this, 'destroy');
      },
      prev: function(axis, selector) {
        return methods._traverse.call(this, axis, selector, function(stack, index, waypoints) {
          if (index > 0) {
            return stack.push(waypoints[index - 1]);
          }
        });
      },
      next: function(axis, selector) {
        return methods._traverse.call(this, axis, selector, function(stack, index, waypoints) {
          if (index < waypoints.length - 1) {
            return stack.push(waypoints[index + 1]);
          }
        });
      },
      _traverse: function(axis, selector, push) {
        var stack, waypoints;

        if (axis == null) {
          axis = 'vertical';
        }
        if (selector == null) {
          selector = window;
        }
        waypoints = jQMethods.aggregate(selector);
        stack = [];
        this.each(function() {
          var index;

          index = $.inArray(this, waypoints[axis]);
          return push(stack, index, waypoints[axis]);
        });
        return this.pushStack(stack);
      },
      _invoke: function(method) {
        this.each(function() {
          var waypoints;

          waypoints = Waypoint.getWaypointsByElement(this);
          return $.each(waypoints, function(i, waypoint) {
            waypoint[method]();
            return true;
          });
        });
        return this;
      }
    };
    $.fn[wp] = function() {
      var args, method;

      method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (methods[method]) {
        return methods[method].apply(this, args);
      } else if ($.isFunction(method)) {
        return methods.init.apply(this, arguments);
      } else if ($.isPlainObject(method)) {
        return methods.init.apply(this, [null, method]);
      } else if (!method) {
        return $.error("jQuery Waypoints needs a callback function or handler option.");
      } else {
        return $.error("The " + method + " method does not exist in jQuery Waypoints.");
      }
    };
    $.fn[wp].defaults = {
      context: window,
      continuous: true,
      enabled: true,
      horizontal: false,
      offset: 0,
      triggerOnce: false
    };
    jQMethods = {
      refresh: function() {
        return $.each(contexts, function(i, context) {
          return context.refresh();
        });
      },
      viewportHeight: function() {
        var _ref;

        return (_ref = window.innerHeight) != null ? _ref : $w.height();
      },
      aggregate: function(contextSelector) {
        var collection, waypoints, _ref;

        collection = allWaypoints;
        if (contextSelector) {
          collection = (_ref = contexts[$(contextSelector)[0][contextKey]]) != null ? _ref.waypoints : void 0;
        }
        if (!collection) {
          return [];
        }
        waypoints = {
          horizontal: [],
          vertical: []
        };
        $.each(waypoints, function(axis, arr) {
          $.each(collection[axis], function(key, waypoint) {
            return arr.push(waypoint);
          });
          arr.sort(function(a, b) {
            return a.offset - b.offset;
          });
          waypoints[axis] = $.map(arr, function(waypoint) {
            return waypoint.element;
          });
          return waypoints[axis] = $.unique(waypoints[axis]);
        });
        return waypoints;
      },
      above: function(contextSelector) {
        if (contextSelector == null) {
          contextSelector = window;
        }
        return jQMethods._filter(contextSelector, 'vertical', function(context, waypoint) {
          return waypoint.offset <= context.oldScroll.y;
        });
      },
      below: function(contextSelector) {
        if (contextSelector == null) {
          contextSelector = window;
        }
        return jQMethods._filter(contextSelector, 'vertical', function(context, waypoint) {
          return waypoint.offset > context.oldScroll.y;
        });
      },
      left: function(contextSelector) {
        if (contextSelector == null) {
          contextSelector = window;
        }
        return jQMethods._filter(contextSelector, 'horizontal', function(context, waypoint) {
          return waypoint.offset <= context.oldScroll.x;
        });
      },
      right: function(contextSelector) {
        if (contextSelector == null) {
          contextSelector = window;
        }
        return jQMethods._filter(contextSelector, 'horizontal', function(context, waypoint) {
          return waypoint.offset > context.oldScroll.x;
        });
      },
      enable: function() {
        return jQMethods._invoke('enable');
      },
      disable: function() {
        return jQMethods._invoke('disable');
      },
      destroy: function() {
        return jQMethods._invoke('destroy');
      },
      extendFn: function(methodName, f) {
        return methods[methodName] = f;
      },
      _invoke: function(method) {
        var waypoints;

        waypoints = $.extend({}, allWaypoints.vertical, allWaypoints.horizontal);
        return $.each(waypoints, function(key, waypoint) {
          waypoint[method]();
          return true;
        });
      },
      _filter: function(selector, axis, test) {
        var context, waypoints;

        context = contexts[$(selector)[0][contextKey]];
        if (!context) {
          return [];
        }
        waypoints = [];
        $.each(context.waypoints[axis], function(i, waypoint) {
          if (test(context, waypoint)) {
            return waypoints.push(waypoint);
          }
        });
        waypoints.sort(function(a, b) {
          return a.offset - b.offset;
        });
        return $.map(waypoints, function(waypoint) {
          return waypoint.element;
        });
      }
    };
    $[wps] = function() {
      var args, method;

      method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (jQMethods[method]) {
        return jQMethods[method].apply(null, args);
      } else {
        return jQMethods.aggregate.call(null, method);
      }
    };
    $[wps].settings = {
      resizeThrottle: 100,
      scrollThrottle: 30
    };
    return $w.on('load.waypoints', function() {
      return $[wps]('refresh');
    });
  });

}).call(this);


/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2014, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
!function(t,e,i,n){"use strict";function s(t){return("string"==typeof t||t instanceof String)&&(t=t.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g,"")),t}var a=function(e){for(var i=e.length,n=t("head");i--;)0===n.has("."+e[i]).length&&n.append('<meta class="'+e[i]+'" />')};a(["foundation-mq-small","foundation-mq-small-only","foundation-mq-medium","foundation-mq-medium-only","foundation-mq-large","foundation-mq-large-only","foundation-mq-xlarge","foundation-mq-xlarge-only","foundation-mq-xxlarge","foundation-data-attribute-namespace"]),t(function(){"undefined"!=typeof FastClick&&"undefined"!=typeof i.body&&FastClick.attach(i.body)});var o=function(e,n){if("string"==typeof e){if(n){var s;if(n.jquery){if(s=n[0],!s)return n}else s=n;return t(s.querySelectorAll(e))}return t(i.querySelectorAll(e))}return t(e,n)},r=function(t){var e=[];return t||e.push("data"),this.namespace.length>0&&e.push(this.namespace),e.push(this.name),e.join("-")},l=function(t){for(var e=t.split("-"),i=e.length,n=[];i--;)0!==i?n.push(e[i]):this.namespace.length>0?n.push(this.namespace,e[i]):n.push(e[i]);return n.reverse().join("-")},d=function(e,i){var n=this,s=function(){var s=o(this),a=!s.data(n.attr_name(!0)+"-init");s.data(n.attr_name(!0)+"-init",t.extend({},n.settings,i||e,n.data_options(s))),a&&n.events(this)};return o(this.scope).is("["+this.attr_name()+"]")?s.call(this.scope):o("["+this.attr_name()+"]",this.scope).each(s),"string"==typeof e?this[e].call(this,i):void 0},c=function(t,e){function i(){e(t[0])}function n(){if(this.one("load",i),/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var t=this.attr("src"),e=t.match(/\?/)?"&":"?";e+="random="+(new Date).getTime(),this.attr("src",t+e)}}return t.attr("src")?void(t[0].complete||4===t[0].readyState?i():n.call(t)):void i()};/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
e.matchMedia||(e.matchMedia=function(){var t=e.styleMedia||e.media;if(!t){var n=i.createElement("style"),s=i.getElementsByTagName("script")[0],a=null;n.type="text/css",n.id="matchmediajs-test",s.parentNode.insertBefore(n,s),a="getComputedStyle"in e&&e.getComputedStyle(n,null)||n.currentStyle,t={matchMedium:function(t){var e="@media "+t+"{ #matchmediajs-test { width: 1px; } }";return n.styleSheet?n.styleSheet.cssText=e:n.textContent=e,"1px"===a.width}}}return function(e){return{matches:t.matchMedium(e||"all"),media:e||"all"}}}()),/*
   * jquery.requestAnimationFrame
   * https://github.com/gnarf37/jquery-requestAnimationFrame
   * Requires jQuery 1.8+
   *
   * Copyright (c) 2012 Corey Frang
   * Licensed under the MIT license.
   */
function(t){function i(){n&&(o(i),l&&t.fx.tick())}for(var n,s=0,a=["webkit","moz"],o=e.requestAnimationFrame,r=e.cancelAnimationFrame,l="undefined"!=typeof t.fx;s<a.length&&!o;s++)o=e[a[s]+"RequestAnimationFrame"],r=r||e[a[s]+"CancelAnimationFrame"]||e[a[s]+"CancelRequestAnimationFrame"];o?(e.requestAnimationFrame=o,e.cancelAnimationFrame=r,l&&(t.fx.timer=function(e){e()&&t.timers.push(e)&&!n&&(n=!0,i())},t.fx.stop=function(){n=!1})):(e.requestAnimationFrame=function(t){var i=(new Date).getTime(),n=Math.max(0,16-(i-s)),a=e.setTimeout(function(){t(i+n)},n);return s=i+n,a},e.cancelAnimationFrame=function(t){clearTimeout(t)})}(t),e.Foundation={name:"Foundation",version:"5.5.2",media_queries:{small:o(".foundation-mq-small").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),"small-only":o(".foundation-mq-small-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),medium:o(".foundation-mq-medium").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),"medium-only":o(".foundation-mq-medium-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),large:o(".foundation-mq-large").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),"large-only":o(".foundation-mq-large-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),xlarge:o(".foundation-mq-xlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),"xlarge-only":o(".foundation-mq-xlarge-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),xxlarge:o(".foundation-mq-xxlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,"")},stylesheet:t("<style></style>").appendTo("head")[0].sheet,global:{namespace:n},init:function(t,i,n,s,a){var r=[t,n,s,a],l=[];if(this.rtl=/rtl/i.test(o("html").attr("dir")),this.scope=t||this.scope,this.set_namespace(),i&&"string"==typeof i&&!/reflow/i.test(i))this.libs.hasOwnProperty(i)&&l.push(this.init_lib(i,r));else for(var d in this.libs)l.push(this.init_lib(d,i));return o(e).load(function(){o(e).trigger("resize.fndtn.clearing").trigger("resize.fndtn.dropdown").trigger("resize.fndtn.equalizer").trigger("resize.fndtn.interchange").trigger("resize.fndtn.joyride").trigger("resize.fndtn.magellan").trigger("resize.fndtn.topbar").trigger("resize.fndtn.slider")}),t},init_lib:function(e,i){return this.libs.hasOwnProperty(e)?(this.patch(this.libs[e]),i&&i.hasOwnProperty(e)?("undefined"!=typeof this.libs[e].settings?t.extend(!0,this.libs[e].settings,i[e]):"undefined"!=typeof this.libs[e].defaults&&t.extend(!0,this.libs[e].defaults,i[e]),this.libs[e].init.apply(this.libs[e],[this.scope,i[e]])):(i=i instanceof Array?i:new Array(i),this.libs[e].init.apply(this.libs[e],i))):function(){}},patch:function(t){t.scope=this.scope,t.namespace=this.global.namespace,t.rtl=this.rtl,t.data_options=this.utils.data_options,t.attr_name=r,t.add_namespace=l,t.bindings=d,t.S=this.utils.S},inherit:function(t,e){for(var i=e.split(" "),n=i.length;n--;)this.utils.hasOwnProperty(i[n])&&(t[i[n]]=this.utils[i[n]])},set_namespace:function(){var e=this.global.namespace===n?t(".foundation-data-attribute-namespace").css("font-family"):this.global.namespace;this.global.namespace=e===n||/false/i.test(e)?"":e},libs:{},utils:{S:o,throttle:function(t,e){var i=null;return function(){var n=this,s=arguments;null==i&&(i=setTimeout(function(){t.apply(n,s),i=null},e))}},debounce:function(t,e,i){var n,s;return function(){var a=this,o=arguments,r=function(){n=null,i||(s=t.apply(a,o))},l=i&&!n;return clearTimeout(n),n=setTimeout(r,e),l&&(s=t.apply(a,o)),s}},data_options:function(e,i){function n(t){return!isNaN(t-0)&&null!==t&&""!==t&&t!==!1&&t!==!0}function s(e){return"string"==typeof e?t.trim(e):e}i=i||"options";var a,o,r,l={},d=function(t){var e=Foundation.global.namespace;return e.length>0?t.data(e+"-"+i):t.data(i)},c=d(e);if("object"==typeof c)return c;for(r=(c||":").split(";"),a=r.length;a--;)o=r[a].split(":"),o=[o[0],o.slice(1).join(":")],/true/i.test(o[1])&&(o[1]=!0),/false/i.test(o[1])&&(o[1]=!1),n(o[1])&&(-1===o[1].indexOf(".")?o[1]=parseInt(o[1],10):o[1]=parseFloat(o[1])),2===o.length&&o[0].length>0&&(l[s(o[0])]=s(o[1]));return l},register_media:function(e,i){Foundation.media_queries[e]===n&&(t("head").append('<meta class="'+i+'"/>'),Foundation.media_queries[e]=s(t("."+i).css("font-family")))},add_custom_rule:function(t,e){if(e===n&&Foundation.stylesheet)Foundation.stylesheet.insertRule(t,Foundation.stylesheet.cssRules.length);else{var i=Foundation.media_queries[e];i!==n&&Foundation.stylesheet.insertRule("@media "+Foundation.media_queries[e]+"{ "+t+" }",Foundation.stylesheet.cssRules.length)}},image_loaded:function(t,e){function i(t){for(var e=t.length,i=e-1;i>=0;i--)if(t.attr("height")===n)return!1;return!0}var s=this,a=t.length;(0===a||i(t))&&e(t),t.each(function(){c(s.S(this),function(){a-=1,0===a&&e(t)})})},random_str:function(){return this.fidx||(this.fidx=0),this.prefix=this.prefix||[this.name||"F",(+new Date).toString(36)].join("-"),this.prefix+(this.fidx++).toString(36)},match:function(t){return e.matchMedia(t).matches},is_small_up:function(){return this.match(Foundation.media_queries.small)},is_medium_up:function(){return this.match(Foundation.media_queries.medium)},is_large_up:function(){return this.match(Foundation.media_queries.large)},is_xlarge_up:function(){return this.match(Foundation.media_queries.xlarge)},is_xxlarge_up:function(){return this.match(Foundation.media_queries.xxlarge)},is_small_only:function(){return!(this.is_medium_up()||this.is_large_up()||this.is_xlarge_up()||this.is_xxlarge_up())},is_medium_only:function(){return this.is_medium_up()&&!this.is_large_up()&&!this.is_xlarge_up()&&!this.is_xxlarge_up()},is_large_only:function(){return this.is_medium_up()&&this.is_large_up()&&!this.is_xlarge_up()&&!this.is_xxlarge_up()},is_xlarge_only:function(){return this.is_medium_up()&&this.is_large_up()&&this.is_xlarge_up()&&!this.is_xxlarge_up()},is_xxlarge_only:function(){return this.is_medium_up()&&this.is_large_up()&&this.is_xlarge_up()&&this.is_xxlarge_up()}}},t.fn.foundation=function(){var t=Array.prototype.slice.call(arguments,0);return this.each(function(){return Foundation.init.apply(Foundation,[this].concat(t)),this})}}(jQuery,window,window.document),function(t,e,i,n){"use strict";Foundation.libs.abide={name:"abide",version:"5.5.2",settings:{live_validate:!0,validate_on_blur:!0,focus_on_invalid:!0,error_labels:!0,error_class:"error",timeout:1e3,patterns:{alpha:/^[a-zA-Z]+$/,alpha_numeric:/^[a-zA-Z0-9]+$/,integer:/^[-+]?\d+$/,number:/^[-+]?\d*(?:[\.\,]\d+)?$/,card:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,cvv:/^([0-9]){3,4}$/,email:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,url:/^(https?|ftp|file|ssh):\/\/([-;:&=\+\$,\w]+@{1})?([-A-Za-z0-9\.]+)+:?(\d+)?((\/[-\+~%\/\.\w]+)?\??([-\+=&;%@\.\w]+)?#?([\w]+)?)?/,domain:/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,datetime:/^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,date:/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,time:/^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,dateISO:/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,month_day_year:/^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,day_month_year:/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,color:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/},validators:{equalTo:function(t,e,n){var s=i.getElementById(t.getAttribute(this.add_namespace("data-equalto"))).value,a=t.value,o=s===a;return o}}},timer:null,init:function(t,e,i){this.bindings(e,i)},events:function(e){function i(t,e){clearTimeout(n.timer),n.timer=setTimeout(function(){n.validate([t],e)}.bind(t),a.timeout)}var n=this,s=n.S(e).attr("novalidate","novalidate"),a=s.data(this.attr_name(!0)+"-init")||{};this.invalid_attr=this.add_namespace("data-invalid"),s.off(".abide").on("submit.fndtn.abide",function(t){var e=/ajax/i.test(n.S(this).attr(n.attr_name()));return n.validate(n.S(this).find("input, textarea, select").not(":hidden, [data-abide-ignore]").get(),t,e)}).on("validate.fndtn.abide",function(t){"manual"===a.validate_on&&n.validate([t.target],t)}).on("reset",function(e){return n.reset(t(this),e)}).find("input, textarea, select").not(":hidden, [data-abide-ignore]").off(".abide").on("blur.fndtn.abide change.fndtn.abide",function(t){a.validate_on_blur&&a.validate_on_blur===!0&&i(this,t),"change"===a.validate_on&&i(this,t)}).on("keydown.fndtn.abide",function(t){a.live_validate&&a.live_validate===!0&&9!=t.which&&i(this,t),"tab"===a.validate_on&&9===t.which?i(this,t):"change"===a.validate_on&&i(this,t)}).on("focus",function(e){navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|Windows Phone|webOS/i)&&t("html, body").animate({scrollTop:t(e.target).offset().top},100)})},reset:function(e,i){var n=this;e.removeAttr(n.invalid_attr),t("["+n.invalid_attr+"]",e).removeAttr(n.invalid_attr),t("."+n.settings.error_class,e).not("small").removeClass(n.settings.error_class),t(":input",e).not(":button, :submit, :reset, :hidden, [data-abide-ignore]").val("").removeAttr(n.invalid_attr)},validate:function(t,e,i){for(var n=this.parse_patterns(t),s=n.length,a=this.S(t[0]).closest("form"),o=/submit/.test(e.type),r=0;s>r;r++)if(!n[r]&&(o||i))return this.settings.focus_on_invalid&&t[r].focus(),a.trigger("invalid.fndtn.abide"),this.S(t[r]).closest("form").attr(this.invalid_attr,""),!1;return(o||i)&&a.trigger("valid.fndtn.abide"),a.removeAttr(this.invalid_attr),i?!1:!0},parse_patterns:function(t){for(var e=t.length,i=[];e--;)i.push(this.pattern(t[e]));return this.check_validation_and_apply_styles(i)},pattern:function(t){var e=t.getAttribute("type"),i="string"==typeof t.getAttribute("required"),n=t.getAttribute("pattern")||"";return this.settings.patterns.hasOwnProperty(n)&&n.length>0?[t,this.settings.patterns[n],i]:n.length>0?[t,new RegExp(n),i]:this.settings.patterns.hasOwnProperty(e)?[t,this.settings.patterns[e],i]:(n=/.*/,[t,n,i])},check_validation_and_apply_styles:function(e){var i=e.length,n=[],s=this.S(e[0][0]).closest("[data-"+this.attr_name(!0)+"]");for(s.data(this.attr_name(!0)+"-init")||{};i--;){var a,o,r=e[i][0],l=e[i][2],d=r.value.trim(),c=this.S(r).parent(),h=r.getAttribute(this.add_namespace("data-abide-validator")),u="radio"===r.type,f="checkbox"===r.type,p=this.S('label[for="'+r.getAttribute("id")+'"]'),g=l?r.value.length>0:!0,m=[];if(r.getAttribute(this.add_namespace("data-equalto"))&&(h="equalTo"),a=c.is("label")?c.parent():c,u&&l)m.push(this.valid_radio(r,l));else if(f&&l)m.push(this.valid_checkbox(r,l));else if(h){for(var _=h.split(" "),v=!0,b=!0,y=0;y<_.length;y++)o=this.settings.validators[_[y]].apply(this,[r,l,a]),m.push(o),b=o&&v,v=o;b?(this.S(r).removeAttr(this.invalid_attr),a.removeClass("error"),p.length>0&&this.settings.error_labels&&p.removeClass(this.settings.error_class).removeAttr("role"),t(r).triggerHandler("valid")):(this.S(r).attr(this.invalid_attr,""),a.addClass("error"),p.length>0&&this.settings.error_labels&&p.addClass(this.settings.error_class).attr("role","alert"),t(r).triggerHandler("invalid"))}else if(e[i][1].test(d)&&g||!l&&r.value.length<1||t(r).attr("disabled")?m.push(!0):m.push(!1),m=[m.every(function(t){return t})],m[0])this.S(r).removeAttr(this.invalid_attr),r.setAttribute("aria-invalid","false"),r.removeAttribute("aria-describedby"),a.removeClass(this.settings.error_class),p.length>0&&this.settings.error_labels&&p.removeClass(this.settings.error_class).removeAttr("role"),t(r).triggerHandler("valid");else{this.S(r).attr(this.invalid_attr,""),r.setAttribute("aria-invalid","true");var x=a.find("small."+this.settings.error_class,"span."+this.settings.error_class),w=x.length>0?x[0].id:"";w.length>0&&r.setAttribute("aria-describedby",w),a.addClass(this.settings.error_class),p.length>0&&this.settings.error_labels&&p.addClass(this.settings.error_class).attr("role","alert"),t(r).triggerHandler("invalid")}n=n.concat(m)}return n},valid_checkbox:function(e,i){var e=this.S(e),n=e.is(":checked")||!i||e.get(0).getAttribute("disabled");return n?(e.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class),t(e).triggerHandler("valid")):(e.attr(this.invalid_attr,"").parent().addClass(this.settings.error_class),t(e).triggerHandler("invalid")),n},valid_radio:function(e,i){for(var n=e.getAttribute("name"),s=this.S(e).closest("[data-"+this.attr_name(!0)+"]").find("[name='"+n+"']"),a=s.length,o=!1,r=!1,l=0;a>l;l++)s[l].getAttribute("disabled")?(r=!0,o=!0):s[l].checked?o=!0:r&&(o=!1);for(var l=0;a>l;l++)o?(this.S(s[l]).removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class),t(s[l]).triggerHandler("valid")):(this.S(s[l]).attr(this.invalid_attr,"").parent().addClass(this.settings.error_class),t(s[l]).triggerHandler("invalid"));return o},valid_equal:function(t,e,n){var s=i.getElementById(t.getAttribute(this.add_namespace("data-equalto"))).value,a=t.value,o=s===a;return o?(this.S(t).removeAttr(this.invalid_attr),n.removeClass(this.settings.error_class),label.length>0&&settings.error_labels&&label.removeClass(this.settings.error_class)):(this.S(t).attr(this.invalid_attr,""),n.addClass(this.settings.error_class),label.length>0&&settings.error_labels&&label.addClass(this.settings.error_class)),o},valid_oneof:function(t,e,i,n){var t=this.S(t),s=this.S("["+this.add_namespace("data-oneof")+"]"),a=s.filter(":checked").length>0;if(a?t.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class):t.attr(this.invalid_attr,"").parent().addClass(this.settings.error_class),!n){var o=this;s.each(function(){o.valid_oneof.call(o,this,null,null,!0)})}return a},reflow:function(t,e){var i=this,n=i.S("["+this.attr_name()+"]").attr("novalidate","novalidate");i.S(n).each(function(t,e){i.events(e)})}}}(jQuery,window,window.document),function(t,e,i,n){"use strict";Foundation.libs.accordion={name:"accordion",version:"5.5.2",settings:{content_class:"content",active_class:"active",multi_expand:!1,toggleable:!0,callback:function(){}},init:function(t,e,i){this.bindings(e,i)},events:function(e){var i=this,n=this.S;i.create(this.S(e)),n(this.scope).off(".fndtn.accordion").on("click.fndtn.accordion","["+this.attr_name()+"] > dd > a, ["+this.attr_name()+"] > li > a",function(e){var s=n(this).closest("["+i.attr_name()+"]"),a=i.attr_name()+"="+s.attr(i.attr_name()),o=s.data(i.attr_name(!0)+"-init")||i.settings,r=n("#"+this.href.split("#")[1]),l=t("> dd, > li",s),d=l.children("."+o.content_class),c=d.filter("."+o.active_class);return e.preventDefault(),s.attr(i.attr_name())&&(d=d.add("["+a+"] dd > ."+o.content_class+", ["+a+"] li > ."+o.content_class),l=l.add("["+a+"] dd, ["+a+"] li")),o.toggleable&&r.is(c)?(r.parent("dd, li").toggleClass(o.active_class,!1),r.toggleClass(o.active_class,!1),n(this).attr("aria-expanded",function(t,e){return"true"===e?"false":"true"}),o.callback(r),r.triggerHandler("toggled",[s]),void s.triggerHandler("toggled",[r])):(o.multi_expand||(d.removeClass(o.active_class),l.removeClass(o.active_class),l.children("a").attr("aria-expanded","false")),r.addClass(o.active_class).parent().addClass(o.active_class),o.callback(r),r.triggerHandler("toggled",[s]),s.triggerHandler("toggled",[r]),void n(this).attr("aria-expanded","true"))})},create:function(e){var i=this,n=e,s=t("> .accordion-navigation",n),a=n.data(i.attr_name(!0)+"-init")||i.settings;s.children("a").attr("aria-expanded","false"),s.has("."+a.content_class+"."+a.active_class).children("a").attr("aria-expanded","true"),a.multi_expand&&e.attr("aria-multiselectable","true")},off:function(){},reflow:function(){}}}(jQuery,window,window.document),function(t,e,i,n){"use strict";Foundation.libs.alert={name:"alert",version:"5.5.2",settings:{callback:function(){}},init:function(t,e,i){this.bindings(e,i)},events:function(){var e=this,i=this.S;t(this.scope).off(".alert").on("click.fndtn.alert","["+this.attr_name()+"] .close",function(t){var n=i(this).closest("["+e.attr_name()+"]"),s=n.data(e.attr_name(!0)+"-init")||e.settings;t.preventDefault(),Modernizr.csstransitions?(n.addClass("alert-close"),n.on("transitionend webkitTransitionEnd oTransitionEnd",function(t){i(this).trigger("close.fndtn.alert").remove(),s.callback()})):n.fadeOut(300,function(){i(this).trigger("close.fndtn.alert").remove(),s.callback()})})},reflow:function(){}}}(jQuery,window,window.document),function(t,e,i,n){"use strict";Foundation.libs.clearing={name:"clearing",version:"5.5.2",settings:{templates:{viewing:'<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" /><p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a><a href="#" class="clearing-main-next"><span></span></a></div><img class="clearing-preload-next" style="display: none" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" /><img class="clearing-preload-prev" style="display: none" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />'},close_selectors:".clearing-close, div.clearing-blackout",open_selectors:"",skip_selector:"",touch_label:"",init:!1,locked:!1},init:function(t,e,i){var n=this;Foundation.inherit(this,"throttle image_loaded"),this.bindings(e,i),n.S(this.scope).is("["+this.attr_name()+"]")?this.assemble(n.S("li",this.scope)):n.S("["+this.attr_name()+"]",this.scope).each(function(){n.assemble(n.S("li",this))})},events:function(n){var s=this,a=s.S,o=t(".scroll-container");o.length>0&&(this.scope=o),a(this.scope).off(".clearing").on("click.fndtn.clearing","ul["+this.attr_name()+"] li "+this.settings.open_selectors,function(t,e,i){var e=e||a(this),i=i||e,n=e.next("li"),o=e.closest("["+s.attr_name()+"]").data(s.attr_name(!0)+"-init"),r=a(t.target);t.preventDefault(),o||(s.init(),o=e.closest("["+s.attr_name()+"]").data(s.attr_name(!0)+"-init")),i.hasClass("visible")&&e[0]===i[0]&&n.length>0&&s.is_open(e)&&(i=n,r=a("img",i)),s.open(r,e,i),s.update_paddles(i)}).on("click.fndtn.clearing",".clearing-main-next",function(t){s.nav(t,"next")}).on("click.fndtn.clearing",".clearing-main-prev",function(t){s.nav(t,"prev")}).on("click.fndtn.clearing",this.settings.close_selectors,function(t){Foundation.libs.clearing.close(t,this)}),t(i).on("keydown.fndtn.clearing",function(t){s.keydown(t)}),a(e).off(".clearing").on("resize.fndtn.clearing",function(){s.resize()}),this.swipe_events(n)},swipe_events:function(t){var e=this,i=e.S;i(this.scope).on("touchstart.fndtn.clearing",".visible-img",function(t){t.touches||(t=t.originalEvent);var e={start_page_x:t.touches[0].pageX,start_page_y:t.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:n};i(this).data("swipe-transition",e),t.stopPropagation()}).on("touchmove.fndtn.clearing",".visible-img",function(t){if(t.touches||(t=t.originalEvent),!(t.touches.length>1||t.scale&&1!==t.scale)){var n=i(this).data("swipe-transition");if("undefined"==typeof n&&(n={}),n.delta_x=t.touches[0].pageX-n.start_page_x,Foundation.rtl&&(n.delta_x=-n.delta_x),"undefined"==typeof n.is_scrolling&&(n.is_scrolling=!!(n.is_scrolling||Math.abs(n.delta_x)<Math.abs(t.touches[0].pageY-n.start_page_y))),!n.is_scrolling&&!n.active){t.preventDefault();var s=n.delta_x<0?"next":"prev";n.active=!0,e.nav(t,s)}}}).on("touchend.fndtn.clearing",".visible-img",function(t){i(this).data("swipe-transition",{}),t.stopPropagation()})},assemble:function(e){var i=e.parent();if(!i.parent().hasClass("carousel")){i.after('<div id="foundationClearingHolder"></div>');var n=i.detach(),s="";if(null!=n[0]){s=n[0].outerHTML;var a=this.S("#foundationClearingHolder"),o=i.data(this.attr_name(!0)+"-init"),r={grid:'<div class="carousel">'+s+"</div>",viewing:o.templates.viewing},l='<div class="clearing-assembled"><div>'+r.viewing+r.grid+"</div></div>",d=this.settings.touch_label;Modernizr.touch&&(l=t(l).find(".clearing-touch-label").html(d).end()),a.after(l).remove()}}},open:function(e,n,s){function a(){setTimeout(function(){this.image_loaded(u,function(){1!==u.outerWidth()||p?o.call(this,u):a.call(this)}.bind(this))}.bind(this),100)}function o(e){var i=t(e);i.css("visibility","visible"),i.trigger("imageVisible"),l.css("overflow","hidden"),d.addClass("clearing-blackout"),c.addClass("clearing-container"),h.show(),this.fix_height(s).caption(r.S(".clearing-caption",h),r.S("img",s)).center_and_label(e,f).shift(n,s,function(){s.closest("li").siblings().removeClass("visible"),s.closest("li").addClass("visible")}),h.trigger("opened.fndtn.clearing")}var r=this,l=t(i.body),d=s.closest(".clearing-assembled"),c=r.S("div",d).first(),h=r.S(".visible-img",c),u=r.S("img",h).not(e),f=r.S(".clearing-touch-label",c),p=!1,g={};t("body").on("touchmove",function(t){t.preventDefault()}),u.error(function(){p=!0}),this.locked()||(h.trigger("open.fndtn.clearing"),g=this.load(e),g.interchange?u.attr("data-interchange",g.interchange).foundation("interchange","reflow"):u.attr("src",g.src).attr("data-interchange",""),u.css("visibility","hidden"),a.call(this))},close:function(e,n){e.preventDefault();var s,a,o=function(t){return/blackout/.test(t.selector)?t:t.closest(".clearing-blackout")}(t(n)),r=t(i.body);return n===e.target&&o&&(r.css("overflow",""),s=t("div",o).first(),a=t(".visible-img",s),a.trigger("close.fndtn.clearing"),this.settings.prev_index=0,t("ul["+this.attr_name()+"]",o).attr("style","").closest(".clearing-blackout").removeClass("clearing-blackout"),s.removeClass("clearing-container"),a.hide(),a.trigger("closed.fndtn.clearing")),t("body").off("touchmove"),!1},is_open:function(t){return t.parent().prop("style").length>0},keydown:function(e){var i=t(".clearing-blackout ul["+this.attr_name()+"]"),n=this.rtl?37:39,s=this.rtl?39:37,a=27;e.which===n&&this.go(i,"next"),e.which===s&&this.go(i,"prev"),e.which===a&&this.S("a.clearing-close").trigger("click.fndtn.clearing")},nav:function(e,i){var n=t("ul["+this.attr_name()+"]",".clearing-blackout");e.preventDefault(),this.go(n,i)},resize:function(){var e=t("img",".clearing-blackout .visible-img"),i=t(".clearing-touch-label",".clearing-blackout");e.length&&(this.center_and_label(e,i),e.trigger("resized.fndtn.clearing"))},fix_height:function(t){var e=t.parent().children(),i=this;return e.each(function(){var t=i.S(this),e=t.find("img");t.height()>e.outerHeight()&&t.addClass("fix-height")}).closest("ul").width(100*e.length+"%"),this},update_paddles:function(t){t=t.closest("li");var e=t.closest(".carousel").siblings(".visible-img");t.next().length>0?this.S(".clearing-main-next",e).removeClass("disabled"):this.S(".clearing-main-next",e).addClass("disabled"),t.prev().length>0?this.S(".clearing-main-prev",e).removeClass("disabled"):this.S(".clearing-main-prev",e).addClass("disabled")},center_and_label:function(t,e){return!this.rtl&&e.length>0?e.css({marginLeft:-(e.outerWidth()/2),marginTop:-(t.outerHeight()/2)-e.outerHeight()-10}):e.css({marginRight:-(e.outerWidth()/2),marginTop:-(t.outerHeight()/2)-e.outerHeight()-10,left:"auto",right:"50%"}),this},load:function(t){var e,i,n;return"A"===t[0].nodeName?(e=t.attr("href"),i=t.data("clearing-interchange")):(n=t.closest("a"),e=n.attr("href"),i=n.data("clearing-interchange")),this.preload(t),{src:e?e:t.attr("src"),interchange:e?i:t.data("clearing-interchange")}},preload:function(t){this.img(t.closest("li").next(),"next").img(t.closest("li").prev(),"prev")},img:function(e,i){if(e.length){var n,s,a,o=t(".clearing-preload-"+i),r=this.S("a",e);r.length?(n=r.attr("href"),s=r.data("clearing-interchange")):(a=this.S("img",e),n=a.attr("src"),s=a.data("clearing-interchange")),s?o.attr("data-interchange",s):(o.attr("src",n),o.attr("data-interchange",""))}return this},caption:function(t,e){var i=e.attr("data-caption");return i?t.html(i).show():t.text("").hide(),this},go:function(t,e){var i=this.S(".visible",t),n=i[e]();this.settings.skip_selector&&0!=n.find(this.settings.skip_selector).length&&(n=n[e]()),n.length&&this.S("img",n).trigger("click.fndtn.clearing",[i,n]).trigger("change.fndtn.clearing")},shift:function(t,e,i){var n,s=e.parent(),a=this.settings.prev_index||e.index(),o=this.direction(s,t,e),r=this.rtl?"right":"left",l=parseInt(s.css("left"),10),d=e.outerWidth(),c={};e.index()===a||/skip/.test(o)?/skip/.test(o)&&(n=e.index()-this.settings.up_count,this.lock(),n>0?(c[r]=-(n*d),s.animate(c,300,this.unlock())):(c[r]=0,s.animate(c,300,this.unlock()))):/left/.test(o)?(this.lock(),c[r]=l+d,s.animate(c,300,this.unlock())):/right/.test(o)&&(this.lock(),c[r]=l-d,s.animate(c,300,this.unlock())),i()},direction:function(t,e,i){var n,s=this.S("li",t),a=s.outerWidth()+s.outerWidth()/4,o=Math.floor(this.S(".clearing-container").outerWidth()/a)-1,r=s.index(i);return this.settings.up_count=o,n=this.adjacent(this.settings.prev_index,r)?r>o&&r>this.settings.prev_index?"right":r>o-1&&r<=this.settings.prev_index?"left":!1:"skip",this.settings.prev_index=r,n},adjacent:function(t,e){for(var i=e+1;i>=e-1;i--)if(i===t)return!0;return!1},lock:function(){this.settings.locked=!0},unlock:function(){this.settings.locked=!1},locked:function(){return this.settings.locked},off:function(){this.S(this.scope).off(".fndtn.clearing"),this.S(e).off(".fndtn.clearing")},reflow:function(){this.init()}}}(jQuery,window,window.document),function(t,e,i,n){"use strict";Foundation.libs.dropdown={name:"dropdown",version:"5.5.2",settings:{active_class:"open",disabled_class:"disabled",mega_class:"mega",align:"bottom",is_hover:!1,hover_timeout:150,opened:function(){},closed:function(){}},init:function(e,i,n){Foundation.inherit(this,"throttle"),t.extend(!0,this.settings,i,n),this.bindings(i,n)},events:function(n){var s=this,a=s.S;a(this.scope).off(".dropdown").on("click.fndtn.dropdown","["+this.attr_name()+"]",function(e){var i=a(this).data(s.attr_name(!0)+"-init")||s.settings;(!i.is_hover||Modernizr.touch)&&(e.preventDefault(),a(this).parent("[data-reveal-id]").length&&e.stopPropagation(),s.toggle(t(this)))}).on("mouseenter.fndtn.dropdown","["+this.attr_name()+"], ["+this.attr_name()+"-content]",function(t){var e,i,n=a(this);clearTimeout(s.timeout),n.data(s.data_attr())?(e=a("#"+n.data(s.data_attr())),i=n):(e=n,i=a("["+s.attr_name()+'="'+e.attr("id")+'"]'));var o=i.data(s.attr_name(!0)+"-init")||s.settings;a(t.currentTarget).data(s.data_attr())&&o.is_hover&&s.closeall.call(s),o.is_hover&&s.open.apply(s,[e,i])}).on("mouseleave.fndtn.dropdown","["+this.attr_name()+"], ["+this.attr_name()+"-content]",function(t){var e,i=a(this);if(i.data(s.data_attr()))e=i.data(s.data_attr(!0)+"-init")||s.settings;else var n=a("["+s.attr_name()+'="'+a(this).attr("id")+'"]'),e=n.data(s.attr_name(!0)+"-init")||s.settings;s.timeout=setTimeout(function(){i.data(s.data_attr())?e.is_hover&&s.close.call(s,a("#"+i.data(s.data_attr()))):e.is_hover&&s.close.call(s,i)}.bind(this),e.hover_timeout)}).on("click.fndtn.dropdown",function(e){var n=a(e.target).closest("["+s.attr_name()+"-content]"),o=n.find("a");return o.length>0&&"false"!==n.attr("aria-autoclose")&&s.close.call(s,a("["+s.attr_name()+"-content]")),e.target!==i&&!t.contains(i.documentElement,e.target)||a(e.target).closest("["+s.attr_name()+"]").length>0?void 0:!a(e.target).data("revealId")&&n.length>0&&(a(e.target).is("["+s.attr_name()+"-content]")||t.contains(n.first()[0],e.target))?void e.stopPropagation():void s.close.call(s,a("["+s.attr_name()+"-content]"))}).on("opened.fndtn.dropdown","["+s.attr_name()+"-content]",function(){s.settings.opened.call(this)}).on("closed.fndtn.dropdown","["+s.attr_name()+"-content]",function(){s.settings.closed.call(this)}),a(e).off(".dropdown").on("resize.fndtn.dropdown",s.throttle(function(){s.resize.call(s)},50)),this.resize()},close:function(e){var i=this;e.each(function(n){var s=t("["+i.attr_name()+"="+e[n].id+"]")||t("aria-controls="+e[n].id+"]");s.attr("aria-expanded","false"),i.S(this).hasClass(i.settings.active_class)&&(i.S(this).css(Foundation.rtl?"right":"left","-99999px").attr("aria-hidden","true").removeClass(i.settings.active_class).prev("["+i.attr_name()+"]").removeClass(i.settings.active_class).removeData("target"),i.S(this).trigger("closed.fndtn.dropdown",[e]))}),e.removeClass("f-open-"+this.attr_name(!0))},closeall:function(){var e=this;t.each(e.S(".f-open-"+this.attr_name(!0)),function(){e.close.call(e,e.S(this))})},open:function(t,e){this.css(t.addClass(this.settings.active_class),e),t.prev("["+this.attr_name()+"]").addClass(this.settings.active_class),t.data("target",e.get(0)).trigger("opened.fndtn.dropdown",[t,e]),t.attr("aria-hidden","false"),e.attr("aria-expanded","true"),t.focus(),t.addClass("f-open-"+this.attr_name(!0))},data_attr:function(){return this.namespace.length>0?this.namespace+"-"+this.name:this.name},toggle:function(t){if(!t.hasClass(this.settings.disabled_class)){var e=this.S("#"+t.data(this.data_attr()));0!==e.length&&(this.close.call(this,this.S("["+this.attr_name()+"-content]").not(e)),e.hasClass(this.settings.active_class)?(this.close.call(this,e),e.data("target")!==t.get(0)&&this.open.call(this,e,t)):this.open.call(this,e,t))}},resize:function(){var e=this.S("["+this.attr_name()+"-content].open"),i=t(e.data("target"));e.length&&i.length&&this.css(e,i)},css:function(t,e){var i=Math.max((e.width()-t.width())/2,8),n=e.data(this.attr_name(!0)+"-init")||this.settings,s=t.parent().css("overflow-y")||t.parent().css("overflow");if(this.clear_idx(),this.small()){var a=this.dirs.bottom.call(t,e,n);t.attr("style","").removeClass("drop-left drop-right drop-top").css({position:"absolute",width:"95%","max-width":"none",top:a.top}),t.css(Foundation.rtl?"right":"left",i)}else if("visible"!==s){var o=e[0].offsetTop+e[0].offsetHeight;t.attr("style","").css({position:"absolute",top:o}),t.css(Foundation.rtl?"right":"left",i)}else this.style(t,e,n);return t},style:function(e,i,n){var s=t.extend({position:"absolute"},this.dirs[n.align].call(e,i,n));e.attr("style","").css(s)},dirs:{_base:function(t){var n=this.offsetParent(),s=n.offset(),a=t.offset();a.top-=s.top,a.left-=s.left,a.missRight=!1,a.missTop=!1,a.missLeft=!1,a.leftRightFlag=!1;var o;o=i.getElementsByClassName("row")[0]?i.getElementsByClassName("row")[0].clientWidth:e.innerWidth;var r=(e.innerWidth-o)/2,l=o;return this.hasClass("mega")||(t.offset().top<=this.outerHeight()&&(a.missTop=!0,l=e.innerWidth-r,a.leftRightFlag=!0),t.offset().left+this.outerWidth()>t.offset().left+r&&t.offset().left-r>this.outerWidth()&&(a.missRight=!0,a.missLeft=!1),t.offset().left-this.outerWidth()<=0&&(a.missLeft=!0,a.missRight=!1)),a},top:function(t,e){var i=Foundation.libs.dropdown,n=i.dirs._base.call(this,t);return this.addClass("drop-top"),1==n.missTop&&(n.top=n.top+t.outerHeight()+this.outerHeight(),this.removeClass("drop-top")),1==n.missRight&&(n.left=n.left-this.outerWidth()+t.outerWidth()),(t.outerWidth()<this.outerWidth()||i.small()||this.hasClass(e.mega_menu))&&i.adjust_pip(this,t,e,n),Foundation.rtl?{left:n.left-this.outerWidth()+t.outerWidth(),top:n.top-this.outerHeight()}:{left:n.left,top:n.top-this.outerHeight()}},bottom:function(t,e){var i=Foundation.libs.dropdown,n=i.dirs._base.call(this,t);return 1==n.missRight&&(n.left=n.left-this.outerWidth()+t.outerWidth()),(t.outerWidth()<this.outerWidth()||i.small()||this.hasClass(e.mega_menu))&&i.adjust_pip(this,t,e,n),i.rtl?{left:n.left-this.outerWidth()+t.outerWidth(),top:n.top+t.outerHeight()}:{left:n.left,top:n.top+t.outerHeight()}},left:function(t,e){var i=Foundation.libs.dropdown.dirs._base.call(this,t);return this.addClass("drop-left"),1==i.missLeft&&(i.left=i.left+this.outerWidth(),i.top=i.top+t.outerHeight(),this.removeClass("drop-left")),{left:i.left-this.outerWidth(),top:i.top}},right:function(t,e){var i=Foundation.libs.dropdown.dirs._base.call(this,t);this.addClass("drop-right"),1==i.missRight?(i.left=i.left-this.outerWidth(),i.top=i.top+t.outerHeight(),this.removeClass("drop-right")):i.triggeredRight=!0;var n=Foundation.libs.dropdown;return(t.outerWidth()<this.outerWidth()||n.small()||this.hasClass(e.mega_menu))&&n.adjust_pip(this,t,e,i),{left:i.left+t.outerWidth(),top:i.top}}},adjust_pip:function(t,e,i,n){var s=Foundation.stylesheet,a=8;t.hasClass(i.mega_class)?a=n.left+e.outerWidth()/2-8:this.small()&&(a+=n.left-8),this.rule_idx=s.cssRules.length;var o=".f-dropdown.open:before",r=".f-dropdown.open:after",l="left: "+a+"px;",d="left: "+(a-1)+"px;";1==n.missRight&&(a=t.outerWidth()-23,o=".f-dropdown.open:before",r=".f-dropdown.open:after",l="left: "+a+"px;",d="left: "+(a-1)+"px;"),1==n.triggeredRight&&(o=".f-dropdown.open:before",r=".f-dropdown.open:after",l="left:-12px;",d="left:-14px;"),s.insertRule?(s.insertRule([o,"{",l,"}"].join(" "),this.rule_idx),
s.insertRule([r,"{",d,"}"].join(" "),this.rule_idx+1)):(s.addRule(o,l,this.rule_idx),s.addRule(r,d,this.rule_idx+1))},clear_idx:function(){var t=Foundation.stylesheet;"undefined"!=typeof this.rule_idx&&(t.deleteRule(this.rule_idx),t.deleteRule(this.rule_idx),delete this.rule_idx)},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},off:function(){this.S(this.scope).off(".fndtn.dropdown"),this.S("html, body").off(".fndtn.dropdown"),this.S(e).off(".fndtn.dropdown"),this.S("[data-dropdown-content]").off(".fndtn.dropdown")},reflow:function(){}}}(jQuery,window,window.document),function(t,e,i,n){"use strict";Foundation.libs.equalizer={name:"equalizer",version:"5.5.2",settings:{use_tallest:!0,before_height_change:t.noop,after_height_change:t.noop,equalize_on_stack:!1,act_on_hidden_el:!1},init:function(t,e,i){Foundation.inherit(this,"image_loaded"),this.bindings(e,i),this.reflow()},events:function(){this.S(e).off(".equalizer").on("resize.fndtn.equalizer",function(t){this.reflow()}.bind(this))},equalize:function(e){var i,n,s=!1,a=e.data("equalizer"),o=e.data(this.attr_name(!0)+"-init")||this.settings;if(i=o.act_on_hidden_el?a?e.find("["+this.attr_name()+'-watch="'+a+'"]'):e.find("["+this.attr_name()+"-watch]"):a?e.find("["+this.attr_name()+'-watch="'+a+'"]:visible'):e.find("["+this.attr_name()+"-watch]:visible"),0!==i.length&&(o.before_height_change(),e.trigger("before-height-change.fndth.equalizer"),i.height("inherit"),o.equalize_on_stack!==!1||(n=i.first().offset().top,i.each(function(){return t(this).offset().top!==n?(s=!0,!1):void 0}),!s))){var r=i.map(function(){return t(this).outerHeight(!1)}).get();if(o.use_tallest){var l=Math.max.apply(null,r);i.css("height",l)}else{var d=Math.min.apply(null,r);i.css("height",d)}o.after_height_change(),e.trigger("after-height-change.fndtn.equalizer")}},reflow:function(){var e=this;this.S("["+this.attr_name()+"]",this.scope).each(function(){var i=t(this),n=i.data("equalizer-mq"),s=!0;n&&(n="is_"+n.replace(/-/g,"_"),Foundation.utils.hasOwnProperty(n)&&(s=!1)),e.image_loaded(e.S("img",this),function(){if(s||Foundation.utils[n]())e.equalize(i);else{var t=i.find("["+e.attr_name()+"-watch]:visible");t.css("height","auto")}})})}}}(jQuery,window,window.document),function(t,e,i,n){"use strict";Foundation.libs.interchange={name:"interchange",version:"5.5.2",cache:{},images_loaded:!1,nodes_loaded:!1,settings:{load_attr:"interchange",named_queries:{"default":"only screen",small:Foundation.media_queries.small,"small-only":Foundation.media_queries["small-only"],medium:Foundation.media_queries.medium,"medium-only":Foundation.media_queries["medium-only"],large:Foundation.media_queries.large,"large-only":Foundation.media_queries["large-only"],xlarge:Foundation.media_queries.xlarge,"xlarge-only":Foundation.media_queries["xlarge-only"],xxlarge:Foundation.media_queries.xxlarge,landscape:"only screen and (orientation: landscape)",portrait:"only screen and (orientation: portrait)",retina:"only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (min--moz-device-pixel-ratio: 2),only screen and (-o-min-device-pixel-ratio: 2/1),only screen and (min-device-pixel-ratio: 2),only screen and (min-resolution: 192dpi),only screen and (min-resolution: 2dppx)"},directives:{replace:function(e,i,n){if(null!==e&&/IMG/.test(e[0].nodeName)){var s=e[0].src;if(new RegExp(i,"i").test(s))return;return e.attr("src",i),n(e[0].src)}var a=e.data(this.data_attr+"-last-path"),o=this;if(a!=i)return/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i.test(i)?(t(e).css("background-image","url("+i+")"),e.data("interchange-last-path",i),n(i)):t.get(i,function(t){e.html(t),e.data(o.data_attr+"-last-path",i),n()})}}},init:function(e,i,n){Foundation.inherit(this,"throttle random_str"),this.data_attr=this.set_data_attr(),t.extend(!0,this.settings,i,n),this.bindings(i,n),this.reflow()},get_media_hash:function(){var t="";for(var e in this.settings.named_queries)t+=matchMedia(this.settings.named_queries[e]).matches.toString();return t},events:function(){var i,n=this;return t(e).off(".interchange").on("resize.fndtn.interchange",n.throttle(function(){var t=n.get_media_hash();t!==i&&n.resize(),i=t},50)),this},resize:function(){var e=this.cache;if(!this.images_loaded||!this.nodes_loaded)return void setTimeout(t.proxy(this.resize,this),50);for(var i in e)if(e.hasOwnProperty(i)){var n=this.results(i,e[i]);n&&this.settings.directives[n.scenario[1]].call(this,n.el,n.scenario[0],function(t){if(arguments[0]instanceof Array)var e=arguments[0];else var e=Array.prototype.slice.call(arguments,0);return function(){t.el.trigger(t.scenario[1],e)}}(n))}},results:function(t,e){var i=e.length;if(i>0)for(var n=this.S("["+this.add_namespace("data-uuid")+'="'+t+'"]');i--;){var s,a=e[i][2];if(s=this.settings.named_queries.hasOwnProperty(a)?matchMedia(this.settings.named_queries[a]):matchMedia(a),s.matches)return{el:n,scenario:e[i]}}return!1},load:function(t,e){return("undefined"==typeof this["cached_"+t]||e)&&this["update_"+t](),this["cached_"+t]},update_images:function(){var t=this.S("img["+this.data_attr+"]"),e=t.length,i=e,n=0,s=this.data_attr;for(this.cache={},this.cached_images=[],this.images_loaded=0===e;i--;){if(n++,t[i]){var a=t[i].getAttribute(s)||"";a.length>0&&this.cached_images.push(t[i])}n===e&&(this.images_loaded=!0,this.enhance("images"))}return this},update_nodes:function(){var t=this.S("["+this.data_attr+"]").not("img"),e=t.length,i=e,n=0,s=this.data_attr;for(this.cached_nodes=[],this.nodes_loaded=0===e;i--;){n++;var a=t[i].getAttribute(s)||"";a.length>0&&this.cached_nodes.push(t[i]),n===e&&(this.nodes_loaded=!0,this.enhance("nodes"))}return this},enhance:function(i){for(var n=this["cached_"+i].length;n--;)this.object(t(this["cached_"+i][n]));return t(e).trigger("resize.fndtn.interchange")},convert_directive:function(t){var e=this.trim(t);return e.length>0?e:"replace"},parse_scenario:function(t){var e=t[0].match(/(.+),\s*(\w+)\s*$/),i=t[1].match(/(.*)\)/);if(e)var n=e[1],s=e[2];else var a=t[0].split(/,\s*$/),n=a[0],s="";return[this.trim(n),this.convert_directive(s),this.trim(i[1])]},object:function(t){var e=this.parse_data_attr(t),i=[],n=e.length;if(n>0)for(;n--;){var s=e[n].split(/,\s?\(/);if(s.length>1){var a=this.parse_scenario(s);i.push(a)}}return this.store(t,i)},store:function(t,e){var i=this.random_str(),n=t.data(this.add_namespace("uuid",!0));return this.cache[n]?this.cache[n]:(t.attr(this.add_namespace("data-uuid"),i),this.cache[i]=e)},trim:function(e){return"string"==typeof e?t.trim(e):e},set_data_attr:function(t){return t?this.namespace.length>0?this.namespace+"-"+this.settings.load_attr:this.settings.load_attr:this.namespace.length>0?"data-"+this.namespace+"-"+this.settings.load_attr:"data-"+this.settings.load_attr},parse_data_attr:function(t){for(var e=t.attr(this.attr_name()).split(/\[(.*?)\]/),i=e.length,n=[];i--;)e[i].replace(/[\W\d]+/,"").length>4&&n.push(e[i]);return n},reflow:function(){this.load("images",!0),this.load("nodes",!0)}}}(jQuery,window,window.document),function(t,e,i,n){"use strict";Foundation.libs.joyride={name:"joyride",version:"5.5.2",defaults:{expose:!1,modal:!0,keyboard:!0,tip_location:"bottom",nub_position:"auto",scroll_speed:1500,scroll_animation:"linear",timer:0,start_timer_on_click:!0,start_offset:0,next_button:!0,prev_button:!0,tip_animation:"fade",pause_after:[],exposed:[],tip_animation_fade_speed:300,cookie_monster:!1,cookie_name:"joyride",cookie_domain:!1,cookie_expires:365,tip_container:"body",abort_on_close:!0,tip_location_patterns:{top:["bottom"],bottom:[],left:["right","top","bottom"],right:["left","top","bottom"]},post_ride_callback:function(){},post_step_callback:function(){},pre_step_callback:function(){},pre_ride_callback:function(){},post_expose_callback:function(){},template:{link:'<a href="#close" class="joyride-close-tip">&times;</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>',prev_button:'<a href="#" class="small button joyride-prev-tip"></a>',modal:'<div class="joyride-modal-bg"></div>',expose:'<div class="joyride-expose-wrapper"></div>',expose_cover:'<div class="joyride-expose-cover"></div>'},expose_add_class:""},init:function(e,i,n){Foundation.inherit(this,"throttle random_str"),this.settings=this.settings||t.extend({},this.defaults,n||i),this.bindings(i,n)},go_next:function(){this.settings.$li.next().length<1?this.end():this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(),this.startTimer()):(this.hide(),this.show())},go_prev:function(){this.settings.$li.prev().length<1||(this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(null,!0),this.startTimer()):(this.hide(),this.show(null,!0)))},events:function(){var i=this;t(this.scope).off(".joyride").on("click.fndtn.joyride",".joyride-next-tip, .joyride-modal-bg",function(t){t.preventDefault(),this.go_next()}.bind(this)).on("click.fndtn.joyride",".joyride-prev-tip",function(t){t.preventDefault(),this.go_prev()}.bind(this)).on("click.fndtn.joyride",".joyride-close-tip",function(t){t.preventDefault(),this.end(this.settings.abort_on_close)}.bind(this)).on("keyup.fndtn.joyride",function(t){if(this.settings.keyboard&&this.settings.riding)switch(t.which){case 39:t.preventDefault(),this.go_next();break;case 37:t.preventDefault(),this.go_prev();break;case 27:t.preventDefault(),this.end(this.settings.abort_on_close)}}.bind(this)),t(e).off(".joyride").on("resize.fndtn.joyride",i.throttle(function(){if(t("["+i.attr_name()+"]").length>0&&i.settings.$next_tip&&i.settings.riding){if(i.settings.exposed.length>0){var e=t(i.settings.exposed);e.each(function(){var e=t(this);i.un_expose(e),i.expose(e)})}i.is_phone()?i.pos_phone():i.pos_default(!1)}},100))},start:function(){var e=this,i=t("["+this.attr_name()+"]",this.scope),n=["timer","scrollSpeed","startOffset","tipAnimationFadeSpeed","cookieExpires"],s=n.length;!i.length>0||(this.settings.init||this.events(),this.settings=i.data(this.attr_name(!0)+"-init"),this.settings.$content_el=i,this.settings.$body=t(this.settings.tip_container),this.settings.body_offset=t(this.settings.tip_container).position(),this.settings.$tip_content=this.settings.$content_el.find("> li"),this.settings.paused=!1,this.settings.attempts=0,this.settings.riding=!0,"function"!=typeof t.cookie&&(this.settings.cookie_monster=!1),(!this.settings.cookie_monster||this.settings.cookie_monster&&!t.cookie(this.settings.cookie_name))&&(this.settings.$tip_content.each(function(i){var a=t(this);this.settings=t.extend({},e.defaults,e.data_options(a));for(var o=s;o--;)e.settings[n[o]]=parseInt(e.settings[n[o]],10);e.create({$li:a,index:i})}),!this.settings.start_timer_on_click&&this.settings.timer>0?(this.show("init"),this.startTimer()):this.show("init")))},resume:function(){this.set_li(),this.show()},tip_template:function(e){var i,n;return e.tip_class=e.tip_class||"",i=t(this.settings.template.tip).addClass(e.tip_class),n=t.trim(t(e.li).html())+this.prev_button_text(e.prev_button_text,e.index)+this.button_text(e.button_text)+this.settings.template.link+this.timer_instance(e.index),i.append(t(this.settings.template.wrapper)),i.first().attr(this.add_namespace("data-index"),e.index),t(".joyride-content-wrapper",i).append(n),i[0]},timer_instance:function(e){var i;return i=0===e&&this.settings.start_timer_on_click&&this.settings.timer>0||0===this.settings.timer?"":t(this.settings.template.timer)[0].outerHTML},button_text:function(e){return this.settings.tip_settings.next_button?(e=t.trim(e)||"Next",e=t(this.settings.template.button).append(e)[0].outerHTML):e="",e},prev_button_text:function(e,i){return this.settings.tip_settings.prev_button?(e=t.trim(e)||"Previous",e=0==i?t(this.settings.template.prev_button).append(e).addClass("disabled")[0].outerHTML:t(this.settings.template.prev_button).append(e)[0].outerHTML):e="",e},create:function(e){this.settings.tip_settings=t.extend({},this.settings,this.data_options(e.$li));var i=e.$li.attr(this.add_namespace("data-button"))||e.$li.attr(this.add_namespace("data-text")),n=e.$li.attr(this.add_namespace("data-button-prev"))||e.$li.attr(this.add_namespace("data-prev-text")),s=e.$li.attr("class"),a=t(this.tip_template({tip_class:s,index:e.index,button_text:i,prev_button_text:n,li:e.$li}));t(this.settings.tip_container).append(a)},show:function(e,i){var s=null;if(this.settings.$li===n||-1===t.inArray(this.settings.$li.index(),this.settings.pause_after))if(this.settings.paused?this.settings.paused=!1:this.set_li(e,i),this.settings.attempts=0,this.settings.$li.length&&this.settings.$target.length>0){if(e&&(this.settings.pre_ride_callback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.show_modal()),this.settings.pre_step_callback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.settings.expose&&this.expose(),this.settings.tip_settings=t.extend({},this.settings,this.data_options(this.settings.$li)),this.settings.timer=parseInt(this.settings.timer,10),this.settings.tip_settings.tip_location_pattern=this.settings.tip_location_patterns[this.settings.tip_settings.tip_location],!/body/i.test(this.settings.$target.selector)){var a=t(".joyride-modal-bg");/pop/i.test(this.settings.tipAnimation)?a.hide():a.fadeOut(this.settings.tipAnimationFadeSpeed),this.scroll_to()}this.is_phone()?this.pos_phone(!0):this.pos_default(!0),s=this.settings.$next_tip.find(".joyride-timer-indicator"),/pop/i.test(this.settings.tip_animation)?(s.width(0),this.settings.timer>0?(this.settings.$next_tip.show(),setTimeout(function(){s.animate({width:s.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)):this.settings.$next_tip.show()):/fade/i.test(this.settings.tip_animation)&&(s.width(0),this.settings.timer>0?(this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed).show(),setTimeout(function(){s.animate({width:s.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)):this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed)),this.settings.$current_tip=this.settings.$next_tip}else this.settings.$li&&this.settings.$target.length<1?this.show(e,i):this.end();else this.settings.paused=!0},is_phone:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},hide:function(){this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.modal||t(".joyride-modal-bg").hide(),this.settings.$current_tip.css("visibility","hidden"),setTimeout(t.proxy(function(){this.hide(),this.css("visibility","visible")},this.settings.$current_tip),0),this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip)},set_li:function(t,e){t?(this.settings.$li=this.settings.$tip_content.eq(this.settings.start_offset),this.set_next_tip(),this.settings.$current_tip=this.settings.$next_tip):(e?this.settings.$li=this.settings.$li.prev():this.settings.$li=this.settings.$li.next(),this.set_next_tip()),this.set_target()},set_next_tip:function(){this.settings.$next_tip=t(".joyride-tip-guide").eq(this.settings.$li.index()),this.settings.$next_tip.data("closed","")},set_target:function(){var e=this.settings.$li.attr(this.add_namespace("data-class")),n=this.settings.$li.attr(this.add_namespace("data-id")),s=function(){return n?t(i.getElementById(n)):e?t("."+e).first():t("body")};this.settings.$target=s()},scroll_to:function(){var i,n;i=t(e).height()/2,n=Math.ceil(this.settings.$target.offset().top-i+this.settings.$next_tip.outerHeight()),0!=n&&t("html, body").stop().animate({scrollTop:n},this.settings.scroll_speed,"swing")},paused:function(){return-1===t.inArray(this.settings.$li.index()+1,this.settings.pause_after)},restart:function(){this.hide(),this.settings.$li=n,this.show("init")},pos_default:function(t){var e=this.settings.$next_tip.find(".joyride-nub"),i=Math.ceil(e.outerWidth()/2),n=Math.ceil(e.outerHeight()/2),s=t||!1;if(s&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector))this.settings.$li.length&&this.pos_modal(e);else{var a=this.settings.tip_settings.tipAdjustmentY?parseInt(this.settings.tip_settings.tipAdjustmentY):0,o=this.settings.tip_settings.tipAdjustmentX?parseInt(this.settings.tip_settings.tipAdjustmentX):0;this.bottom()?(this.rtl?this.settings.$next_tip.css({top:this.settings.$target.offset().top+n+this.settings.$target.outerHeight()+a,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()+o}):this.settings.$next_tip.css({top:this.settings.$target.offset().top+n+this.settings.$target.outerHeight()+a,left:this.settings.$target.offset().left+o}),this.nub_position(e,this.settings.tip_settings.nub_position,"top")):this.top()?(this.rtl?this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-n+a,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()}):this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-n+a,left:this.settings.$target.offset().left+o}),this.nub_position(e,this.settings.tip_settings.nub_position,"bottom")):this.right()?(this.settings.$next_tip.css({top:this.settings.$target.offset().top+a,left:this.settings.$target.outerWidth()+this.settings.$target.offset().left+i+o}),this.nub_position(e,this.settings.tip_settings.nub_position,"left")):this.left()&&(this.settings.$next_tip.css({top:this.settings.$target.offset().top+a,left:this.settings.$target.offset().left-this.settings.$next_tip.outerWidth()-i+o}),this.nub_position(e,this.settings.tip_settings.nub_position,"right")),!this.visible(this.corners(this.settings.$next_tip))&&this.settings.attempts<this.settings.tip_settings.tip_location_pattern.length&&(e.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),this.settings.tip_settings.tip_location=this.settings.tip_settings.tip_location_pattern[this.settings.attempts],this.settings.attempts++,this.pos_default())}s&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_phone:function(e){var i=this.settings.$next_tip.outerHeight(),n=(this.settings.$next_tip.offset(),this.settings.$target.outerHeight()),s=t(".joyride-nub",this.settings.$next_tip),a=Math.ceil(s.outerHeight()/2),o=e||!1;s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),o&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector)?this.settings.$li.length&&this.pos_modal(s):this.top()?(this.settings.$next_tip.offset({top:this.settings.$target.offset().top-i-a}),s.addClass("bottom")):(this.settings.$next_tip.offset({top:this.settings.$target.offset().top+n+a}),s.addClass("top")),o&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_modal:function(t){this.center(),t.hide(),this.show_modal()},show_modal:function(){if(!this.settings.$next_tip.data("closed")){var e=t(".joyride-modal-bg");if(e.length<1){var e=t(this.settings.template.modal);e.appendTo("body")}/pop/i.test(this.settings.tip_animation)?e.show():e.fadeIn(this.settings.tip_animation_fade_speed)}},expose:function(){var i,n,s,a,o,r="expose-"+this.random_str(6);if(arguments.length>0&&arguments[0]instanceof t)s=arguments[0];else{if(!this.settings.$target||/body/i.test(this.settings.$target.selector))return!1;s=this.settings.$target}return s.length<1?(e.console&&console.error("element not valid",s),!1):(i=t(this.settings.template.expose),this.settings.$body.append(i),i.css({top:s.offset().top,left:s.offset().left,width:s.outerWidth(!0),height:s.outerHeight(!0)}),n=t(this.settings.template.expose_cover),a={zIndex:s.css("z-index"),position:s.css("position")},o=null==s.attr("class")?"":s.attr("class"),s.css("z-index",parseInt(i.css("z-index"))+1),"static"==a.position&&s.css("position","relative"),s.data("expose-css",a),s.data("orig-class",o),s.attr("class",o+" "+this.settings.expose_add_class),n.css({top:s.offset().top,left:s.offset().left,width:s.outerWidth(!0),height:s.outerHeight(!0)}),this.settings.modal&&this.show_modal(),this.settings.$body.append(n),i.addClass(r),n.addClass(r),s.data("expose",r),this.settings.post_expose_callback(this.settings.$li.index(),this.settings.$next_tip,s),void this.add_exposed(s))},un_expose:function(){var i,n,s,a,o,r=!1;if(arguments.length>0&&arguments[0]instanceof t)n=arguments[0];else{if(!this.settings.$target||/body/i.test(this.settings.$target.selector))return!1;n=this.settings.$target}return n.length<1?(e.console&&console.error("element not valid",n),!1):(i=n.data("expose"),s=t("."+i),arguments.length>1&&(r=arguments[1]),r===!0?t(".joyride-expose-wrapper,.joyride-expose-cover").remove():s.remove(),a=n.data("expose-css"),"auto"==a.zIndex?n.css("z-index",""):n.css("z-index",a.zIndex),a.position!=n.css("position")&&("static"==a.position?n.css("position",""):n.css("position",a.position)),o=n.data("orig-class"),n.attr("class",o),n.removeData("orig-classes"),n.removeData("expose"),n.removeData("expose-z-index"),void this.remove_exposed(n))},add_exposed:function(e){this.settings.exposed=this.settings.exposed||[],e instanceof t||"object"==typeof e?this.settings.exposed.push(e[0]):"string"==typeof e&&this.settings.exposed.push(e)},remove_exposed:function(e){var i,n;for(e instanceof t?i=e[0]:"string"==typeof e&&(i=e),this.settings.exposed=this.settings.exposed||[],n=this.settings.exposed.length;n--;)if(this.settings.exposed[n]==i)return void this.settings.exposed.splice(n,1)},center:function(){var i=t(e);return this.settings.$next_tip.css({top:(i.height()-this.settings.$next_tip.outerHeight())/2+i.scrollTop(),left:(i.width()-this.settings.$next_tip.outerWidth())/2+i.scrollLeft()}),!0},bottom:function(){return/bottom/i.test(this.settings.tip_settings.tip_location)},top:function(){return/top/i.test(this.settings.tip_settings.tip_location)},right:function(){return/right/i.test(this.settings.tip_settings.tip_location)},left:function(){return/left/i.test(this.settings.tip_settings.tip_location)},corners:function(i){var n=t(e),s=n.height()/2,a=Math.ceil(this.settings.$target.offset().top-s+this.settings.$next_tip.outerHeight()),o=n.width()+n.scrollLeft(),r=n.height()+a,l=n.height()+n.scrollTop(),d=n.scrollTop();return d>a&&(d=0>a?0:a),r>l&&(l=r),[i.offset().top<d,o<i.offset().left+i.outerWidth(),l<i.offset().top+i.outerHeight(),n.scrollLeft()>i.offset().left]},visible:function(t){for(var e=t.length;e--;)if(t[e])return!1;return!0},nub_position:function(t,e,i){"auto"===e?t.addClass(i):t.addClass(e)},startTimer:function(){this.settings.$li.length?this.settings.automate=setTimeout(function(){this.hide(),this.show(),this.startTimer()}.bind(this),this.settings.timer):clearTimeout(this.settings.automate)},end:function(e){this.settings.cookie_monster&&t.cookie(this.settings.cookie_name,"ridden",{expires:this.settings.cookie_expires,domain:this.settings.cookie_domain}),this.settings.timer>0&&clearTimeout(this.settings.automate),this.settings.modal&&this.settings.expose&&this.un_expose(),t(this.scope).off("keyup.joyride"),this.settings.$next_tip.data("closed",!0),this.settings.riding=!1,t(".joyride-modal-bg").hide(),this.settings.$current_tip.hide(),("undefined"==typeof e||e===!1)&&(this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip),this.settings.post_ride_callback(this.settings.$li.index(),this.settings.$current_tip)),t(".joyride-tip-guide").remove()},off:function(){t(this.scope).off(".joyride"),t(e).off(".joyride"),t(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"),t(".joyride-tip-guide, .joyride-modal-bg").remove(),clearTimeout(this.settings.automate),this.settings={}},reflow:function(){}}}(jQuery,window,window.document),function(t,e,i,n){"use strict";Foundation.libs["magellan-expedition"]={name:"magellan-expedition",version:"5.5.2",settings:{active_class:"active",threshold:0,destination_threshold:20,throttle_delay:30,fixed_top:0,offset_by_height:!0,duration:700,easing:"swing"},init:function(t,e,i){Foundation.inherit(this,"throttle"),this.bindings(e,i)},events:function(){var e=this,i=e.S,n=e.settings;e.set_expedition_position(),i(e.scope).off(".magellan").on("click.fndtn.magellan","["+e.add_namespace("data-magellan-arrival")+"] a[href*=#]",function(i){var n=this.hostname===location.hostname||!this.hostname,s=e.filterPathname(location.pathname)===e.filterPathname(this.pathname),a=this.hash.replace(/(:|\.|\/)/g,"\\$1"),o=this;if(n&&s&&a){i.preventDefault();var r=t(this).closest("["+e.attr_name()+"]"),l=r.data("magellan-expedition-init"),d=this.hash.split("#").join(""),c=t('a[name="'+d+'"]');0===c.length&&(c=t("#"+d));var h=c.offset().top-l.destination_threshold+1;l.offset_by_height&&(h-=r.outerHeight()),t("html, body").stop().animate({scrollTop:h},l.duration,l.easing,function(){history.pushState?history.pushState(null,null,o.pathname+"#"+d):location.hash=o.pathname+"#"+d})}}).on("scroll.fndtn.magellan",e.throttle(this.check_for_arrivals.bind(this),n.throttle_delay))},check_for_arrivals:function(){var t=this;t.update_arrivals(),t.update_expedition_positions()},set_expedition_position:function(){var e=this;t("["+this.attr_name()+"=fixed]",e.scope).each(function(i,n){var s,a,o=t(this),r=o.data("magellan-expedition-init"),l=o.attr("styles");o.attr("style",""),s=o.offset().top+r.threshold,a=parseInt(o.data("magellan-fixed-top")),isNaN(a)||(e.settings.fixed_top=a),o.data(e.data_attr("magellan-top-offset"),s),o.attr("style",l)})},update_expedition_positions:function(){var i=this,n=t(e).scrollTop();t("["+this.attr_name()+"=fixed]",i.scope).each(function(){var e=t(this),s=e.data("magellan-expedition-init"),a=e.attr("style"),o=e.data("magellan-top-offset");if(n+i.settings.fixed_top>=o){var r=e.prev("["+i.add_namespace("data-magellan-expedition-clone")+"]");0===r.length&&(r=e.clone(),r.removeAttr(i.attr_name()),r.attr(i.add_namespace("data-magellan-expedition-clone"),""),e.before(r)),e.css({position:"fixed",top:s.fixed_top}).addClass("fixed")}else e.prev("["+i.add_namespace("data-magellan-expedition-clone")+"]").remove(),e.attr("style",a).css("position","").css("top","").removeClass("fixed")})},update_arrivals:function(){var i=this,n=t(e).scrollTop();t("["+this.attr_name()+"]",i.scope).each(function(){var e=t(this),s=e.data(i.attr_name(!0)+"-init"),a=i.offsets(e,n),o=e.find("["+i.add_namespace("data-magellan-arrival")+"]"),r=!1;a.each(function(t,n){if(n.viewport_offset>=n.top_offset){var a=e.find("["+i.add_namespace("data-magellan-arrival")+"]");return a.not(n.arrival).removeClass(s.active_class),n.arrival.addClass(s.active_class),r=!0,!0}}),r||o.removeClass(s.active_class)})},offsets:function(e,i){var n=this,s=e.data(n.attr_name(!0)+"-init"),a=i;return e.find("["+n.add_namespace("data-magellan-arrival")+"]").map(function(i,o){var r=t(this).data(n.data_attr("magellan-arrival")),l=t("["+n.add_namespace("data-magellan-destination")+"="+r+"]");if(l.length>0){var d=l.offset().top-s.destination_threshold;return s.offset_by_height&&(d-=e.outerHeight()),d=Math.floor(d),{destination:l,arrival:t(this),top_offset:d,viewport_offset:a}}}).sort(function(t,e){return t.top_offset<e.top_offset?-1:t.top_offset>e.top_offset?1:0})},data_attr:function(t){return this.namespace.length>0?this.namespace+"-"+t:t},off:function(){this.S(this.scope).off(".magellan"),this.S(e).off(".magellan")},filterPathname:function(t){return t=t||"",t.replace(/^\//,"").replace(/(?:index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},reflow:function(){var e=this;t("["+e.add_namespace("data-magellan-expedition-clone")+"]",e.scope).remove()}}}(jQuery,window,window.document),function(t,e,i,n){"use strict";Foundation.libs.offcanvas={name:"offcanvas",version:"5.5.2",settings:{open_method:"move",close_on_click:!1},init:function(t,e,i){this.bindings(e,i)},events:function(){var e=this,i=e.S,n="",s="",a="";"move"===this.settings.open_method?(n="move-",s="right",a="left"):"overlap_single"===this.settings.open_method?(n="offcanvas-overlap-",s="right",a="left"):"overlap"===this.settings.open_method&&(n="offcanvas-overlap"),i(this.scope).off(".offcanvas").on("click.fndtn.offcanvas",".left-off-canvas-toggle",function(a){e.click_toggle_class(a,n+s),"overlap"!==e.settings.open_method&&i(".left-submenu").removeClass(n+s),t(".left-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".left-off-canvas-menu a",function(a){var o=e.get_settings(a),r=i(this).parent();!o.close_on_click||r.hasClass("has-submenu")||r.hasClass("back")?i(this).parent().hasClass("has-submenu")?(a.preventDefault(),i(this).siblings(".left-submenu").toggleClass(n+s)):r.hasClass("back")&&(a.preventDefault(),r.parent().removeClass(n+s)):(e.hide.call(e,n+s,e.get_wrapper(a)),r.parent().removeClass(n+s)),t(".left-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".right-off-canvas-toggle",function(s){e.click_toggle_class(s,n+a),"overlap"!==e.settings.open_method&&i(".right-submenu").removeClass(n+a),t(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".right-off-canvas-menu a",function(s){var o=e.get_settings(s),r=i(this).parent();!o.close_on_click||r.hasClass("has-submenu")||r.hasClass("back")?i(this).parent().hasClass("has-submenu")?(s.preventDefault(),i(this).siblings(".right-submenu").toggleClass(n+a)):r.hasClass("back")&&(s.preventDefault(),r.parent().removeClass(n+a)):(e.hide.call(e,n+a,e.get_wrapper(s)),r.parent().removeClass(n+a)),t(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".exit-off-canvas",function(o){e.click_remove_class(o,n+a),i(".right-submenu").removeClass(n+a),s&&(e.click_remove_class(o,n+s),i(".left-submenu").removeClass(n+a)),t(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".exit-off-canvas",function(i){e.click_remove_class(i,n+a),t(".left-off-canvas-toggle").attr("aria-expanded","false"),s&&(e.click_remove_class(i,n+s),t(".right-off-canvas-toggle").attr("aria-expanded","false"))})},toggle:function(t,e){e=e||this.get_wrapper(),e.is("."+t)?this.hide(t,e):this.show(t,e)},show:function(t,e){e=e||this.get_wrapper(),e.trigger("open.fndtn.offcanvas"),e.addClass(t)},hide:function(t,e){e=e||this.get_wrapper(),e.trigger("close.fndtn.offcanvas"),e.removeClass(t)},click_toggle_class:function(t,e){t.preventDefault();var i=this.get_wrapper(t);this.toggle(e,i)},click_remove_class:function(t,e){t.preventDefault();var i=this.get_wrapper(t);this.hide(e,i)},get_settings:function(t){var e=this.S(t.target).closest("["+this.attr_name()+"]");return e.data(this.attr_name(!0)+"-init")||this.settings},get_wrapper:function(t){var e=this.S(t?t.target:this.scope).closest(".off-canvas-wrap");return 0===e.length&&(e=this.S(".off-canvas-wrap")),e},reflow:function(){}}}(jQuery,window,window.document),function(t,e,i,n){"use strict";var s=function(){},a=function(s,a){if(s.hasClass(a.slides_container_class))return this;var d,c,h,u,f,p,g=this,m=s,_=0,v=!1;g.slides=function(){return m.children(a.slide_selector)},g.slides().first().addClass(a.active_slide_class),g.update_slide_number=function(e){a.slide_number&&(c.find("span:first").text(parseInt(e)+1),c.find("span:last").text(g.slides().length)),a.bullets&&(h.children().removeClass(a.bullets_active_class),t(h.children().get(e)).addClass(a.bullets_active_class))},g.update_active_link=function(e){var i=t('[data-orbit-link="'+g.slides().eq(e).attr("data-orbit-slide")+'"]');i.siblings().removeClass(a.bullets_active_class),i.addClass(a.bullets_active_class)},g.build_markup=function(){m.wrap('<div class="'+a.container_class+'"></div>'),d=m.parent(),m.addClass(a.slides_container_class),a.stack_on_small&&d.addClass(a.stack_on_small_class),a.navigation_arrows&&(d.append(t('<a href="#"><span></span></a>').addClass(a.prev_class)),d.append(t('<a href="#"><span></span></a>').addClass(a.next_class))),a.timer&&(u=t("<div>").addClass(a.timer_container_class),u.append("<span>"),u.append(t("<div>").addClass(a.timer_progress_class)),u.addClass(a.timer_paused_class),d.append(u)),a.slide_number&&(c=t("<div>").addClass(a.slide_number_class),c.append("<span></span> "+a.slide_number_text+" <span></span>"),d.append(c)),a.bullets&&(h=t("<ol>").addClass(a.bullets_container_class),d.append(h),h.wrap('<div class="orbit-bullets-container"></div>'),g.slides().each(function(e,i){var n=t("<li>").attr("data-orbit-slide",e).on("click",g.link_bullet);
h.append(n)}))},g._goto=function(e,i){if(e===_)return!1;"object"==typeof p&&p.restart();var n=g.slides(),s="next";if(v=!0,_>e&&(s="prev"),e>=n.length){if(!a.circular)return!1;e=0}else if(0>e){if(!a.circular)return!1;e=n.length-1}var o=t(n.get(_)),r=t(n.get(e));o.css("zIndex",2),o.removeClass(a.active_slide_class),r.css("zIndex",4).addClass(a.active_slide_class),m.trigger("before-slide-change.fndtn.orbit"),a.before_slide_change(),g.update_active_link(e);var l=function(){var t=function(){_=e,v=!1,i===!0&&(p=g.create_timer(),p.start()),g.update_slide_number(_),m.trigger("after-slide-change.fndtn.orbit",[{slide_number:_,total_slides:n.length}]),a.after_slide_change(_,n.length)};m.outerHeight()!=r.outerHeight()&&a.variable_height?m.animate({height:r.outerHeight()},250,"linear",t):t()};if(1===n.length)return l(),!1;var d=function(){"next"===s&&f.next(o,r,l),"prev"===s&&f.prev(o,r,l)};r.outerHeight()>m.outerHeight()&&a.variable_height?m.animate({height:r.outerHeight()},250,"linear",d):d()},g.next=function(t){t.stopImmediatePropagation(),t.preventDefault(),g._goto(_+1)},g.prev=function(t){t.stopImmediatePropagation(),t.preventDefault(),g._goto(_-1)},g.link_custom=function(e){e.preventDefault();var i=t(this).attr("data-orbit-link");if("string"==typeof i&&""!=(i=t.trim(i))){var n=d.find("[data-orbit-slide="+i+"]");-1!=n.index()&&g._goto(n.index())}},g.link_bullet=function(e){var i=t(this).attr("data-orbit-slide");if("string"==typeof i&&""!=(i=t.trim(i)))if(isNaN(parseInt(i))){var n=d.find("[data-orbit-slide="+i+"]");-1!=n.index()&&g._goto(n.index()+1)}else g._goto(parseInt(i))},g.timer_callback=function(){g._goto(_+1,!0)},g.compute_dimensions=function(){var e=t(g.slides().get(_)),i=e.outerHeight();a.variable_height||g.slides().each(function(){t(this).outerHeight()>i&&(i=t(this).outerHeight())}),m.height(i)},g.create_timer=function(){var t=new o(d.find("."+a.timer_container_class),a,g.timer_callback);return t},g.stop_timer=function(){"object"==typeof p&&p.stop()},g.toggle_timer=function(){var t=d.find("."+a.timer_container_class);t.hasClass(a.timer_paused_class)?("undefined"==typeof p&&(p=g.create_timer()),p.start()):"object"==typeof p&&p.stop()},g.init=function(){g.build_markup(),a.timer&&(p=g.create_timer(),Foundation.utils.image_loaded(this.slides().children("img"),p.start)),f=new l(a,m),"slide"===a.animation&&(f=new r(a,m)),d.on("click","."+a.next_class,g.next),d.on("click","."+a.prev_class,g.prev),a.next_on_click&&d.on("click","."+a.slides_container_class+" [data-orbit-slide]",g.link_bullet),d.on("click",g.toggle_timer),a.swipe&&d.on("touchstart.fndtn.orbit",function(t){t.touches||(t=t.originalEvent);var e={start_page_x:t.touches[0].pageX,start_page_y:t.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:n};d.data("swipe-transition",e),t.stopPropagation()}).on("touchmove.fndtn.orbit",function(t){if(t.touches||(t=t.originalEvent),!(t.touches.length>1||t.scale&&1!==t.scale)){var e=d.data("swipe-transition");if("undefined"==typeof e&&(e={}),e.delta_x=t.touches[0].pageX-e.start_page_x,"undefined"==typeof e.is_scrolling&&(e.is_scrolling=!!(e.is_scrolling||Math.abs(e.delta_x)<Math.abs(t.touches[0].pageY-e.start_page_y))),!e.is_scrolling&&!e.active){t.preventDefault();var i=e.delta_x<0?_+1:_-1;e.active=!0,g._goto(i)}}}).on("touchend.fndtn.orbit",function(t){d.data("swipe-transition",{}),t.stopPropagation()}),d.on("mouseenter.fndtn.orbit",function(t){a.timer&&a.pause_on_hover&&g.stop_timer()}).on("mouseleave.fndtn.orbit",function(t){a.timer&&a.resume_on_mouseout&&p.start()}),t(i).on("click","[data-orbit-link]",g.link_custom),t(e).on("load resize",g.compute_dimensions),Foundation.utils.image_loaded(this.slides().children("img"),g.compute_dimensions),Foundation.utils.image_loaded(this.slides().children("img"),function(){d.prev("."+a.preloader_class).css("display","none"),g.update_slide_number(0),g.update_active_link(0),m.trigger("ready.fndtn.orbit")})},g.init()},o=function(t,e,i){var n,s,a=this,o=e.timer_speed,r=t.find("."+e.timer_progress_class),l=-1;this.update_progress=function(t){var e=r.clone();e.attr("style",""),e.css("width",t+"%"),r.replaceWith(e),r=e},this.restart=function(){clearTimeout(s),t.addClass(e.timer_paused_class),l=-1,a.update_progress(0)},this.start=function(){return t.hasClass(e.timer_paused_class)?(l=-1===l?o:l,t.removeClass(e.timer_paused_class),n=(new Date).getTime(),r.animate({width:"100%"},l,"linear"),s=setTimeout(function(){a.restart(),i()},l),void t.trigger("timer-started.fndtn.orbit")):!0},this.stop=function(){if(t.hasClass(e.timer_paused_class))return!0;clearTimeout(s),t.addClass(e.timer_paused_class);var i=(new Date).getTime();l-=i-n;var r=100-l/o*100;a.update_progress(r),t.trigger("timer-stopped.fndtn.orbit")}},r=function(e,i){var n=e.animation_speed,s=1===t("html[dir=rtl]").length,a=s?"marginRight":"marginLeft",o={};o[a]="0%",this.next=function(t,e,i){t.animate({marginLeft:"-100%"},n),e.animate(o,n,function(){t.css(a,"100%"),i()})},this.prev=function(t,e,i){t.animate({marginLeft:"100%"},n),e.css(a,"-100%"),e.animate(o,n,function(){t.css(a,"100%"),i()})}},l=function(e,i){var n=e.animation_speed;1===t("html[dir=rtl]").length;this.next=function(t,e,i){e.css({margin:"0%",opacity:"0.01"}),e.animate({opacity:"1"},n,"linear",function(){t.css("margin","100%"),i()})},this.prev=function(t,e,i){e.css({margin:"0%",opacity:"0.01"}),e.animate({opacity:"1"},n,"linear",function(){t.css("margin","100%"),i()})}};Foundation.libs=Foundation.libs||{},Foundation.libs.orbit={name:"orbit",version:"5.5.2",settings:{animation:"slide",timer_speed:1e4,pause_on_hover:!0,resume_on_mouseout:!1,next_on_click:!0,animation_speed:500,stack_on_small:!1,navigation_arrows:!0,slide_number:!0,slide_number_text:"of",container_class:"orbit-container",stack_on_small_class:"orbit-stack-on-small",next_class:"orbit-next",prev_class:"orbit-prev",timer_container_class:"orbit-timer",timer_paused_class:"paused",timer_progress_class:"orbit-progress",slides_container_class:"orbit-slides-container",preloader_class:"preloader",slide_selector:"*",bullets_container_class:"orbit-bullets",bullets_active_class:"active",slide_number_class:"orbit-slide-number",caption_class:"orbit-caption",active_slide_class:"active",orbit_transition_class:"orbit-transitioning",bullets:!0,circular:!0,timer:!0,variable_height:!1,swipe:!0,before_slide_change:s,after_slide_change:s},init:function(t,e,i){this.bindings(e,i)},events:function(t){var e=new a(this.S(t),this.S(t).data("orbit-init"));this.S(t).data(this.name+"-instance",e)},reflow:function(){var t=this;if(t.S(t.scope).is("[data-orbit]")){var e=t.S(t.scope),i=e.data(t.name+"-instance");i.compute_dimensions()}else t.S("[data-orbit]",t.scope).each(function(e,i){var n=t.S(i),s=(t.data_options(n),n.data(t.name+"-instance"));s.compute_dimensions()})}}}(jQuery,window,window.document),function(t,e,i,n){"use strict";function s(t){var e=/fade/i.test(t),i=/pop/i.test(t);return{animate:e||i,pop:i,fade:e}}Foundation.libs.reveal={name:"reveal",version:"5.5.2",locked:!1,settings:{animation:"fadeAndPop",animation_speed:250,close_on_background_click:!0,close_on_esc:!0,dismiss_modal_class:"close-reveal-modal",multiple_opened:!1,bg_class:"reveal-modal-bg",root_element:"body",open:function(){},opened:function(){},close:function(){},closed:function(){},on_ajax_error:t.noop,bg:t(".reveal-modal-bg"),css:{open:{opacity:0,visibility:"visible",display:"block"},close:{opacity:1,visibility:"hidden",display:"none"}}},init:function(e,i,n){t.extend(!0,this.settings,i,n),this.bindings(i,n)},events:function(t){var e=this,n=e.S;return n(this.scope).off(".reveal").on("click.fndtn.reveal","["+this.add_namespace("data-reveal-id")+"]:not([disabled])",function(t){if(t.preventDefault(),!e.locked){var i=n(this),s=i.data(e.data_attr("reveal-ajax")),a=i.data(e.data_attr("reveal-replace-content"));if(e.locked=!0,"undefined"==typeof s)e.open.call(e,i);else{var o=s===!0?i.attr("href"):s;e.open.call(e,i,{url:o},{replaceContentSel:a})}}}),n(i).on("click.fndtn.reveal",this.close_targets(),function(t){if(t.preventDefault(),!e.locked){var i=n("["+e.attr_name()+"].open").data(e.attr_name(!0)+"-init")||e.settings,s=n(t.target)[0]===n("."+i.bg_class)[0];if(s){if(!i.close_on_background_click)return;t.stopPropagation()}e.locked=!0,e.close.call(e,s?n("["+e.attr_name()+"].open:not(.toback)"):n(this).closest("["+e.attr_name()+"]"))}}),n("["+e.attr_name()+"]",this.scope).length>0?n(this.scope).on("open.fndtn.reveal",this.settings.open).on("opened.fndtn.reveal",this.settings.opened).on("opened.fndtn.reveal",this.open_video).on("close.fndtn.reveal",this.settings.close).on("closed.fndtn.reveal",this.settings.closed).on("closed.fndtn.reveal",this.close_video):n(this.scope).on("open.fndtn.reveal","["+e.attr_name()+"]",this.settings.open).on("opened.fndtn.reveal","["+e.attr_name()+"]",this.settings.opened).on("opened.fndtn.reveal","["+e.attr_name()+"]",this.open_video).on("close.fndtn.reveal","["+e.attr_name()+"]",this.settings.close).on("closed.fndtn.reveal","["+e.attr_name()+"]",this.settings.closed).on("closed.fndtn.reveal","["+e.attr_name()+"]",this.close_video),!0},key_up_on:function(t){var e=this;return e.S("body").off("keyup.fndtn.reveal").on("keyup.fndtn.reveal",function(t){var i=e.S("["+e.attr_name()+"].open"),n=i.data(e.attr_name(!0)+"-init")||e.settings;n&&27===t.which&&n.close_on_esc&&!e.locked&&e.close.call(e,i)}),!0},key_up_off:function(t){return this.S("body").off("keyup.fndtn.reveal"),!0},open:function(i,n){var s,a=this;i?"undefined"!=typeof i.selector?s=a.S("#"+i.data(a.data_attr("reveal-id"))).first():(s=a.S(this.scope),n=i):s=a.S(this.scope);var o=s.data(a.attr_name(!0)+"-init");if(o=o||this.settings,s.hasClass("open")&&i.attr("data-reveal-id")==s.attr("id"))return a.close(s);if(!s.hasClass("open")){var r=a.S("["+a.attr_name()+"].open");if("undefined"==typeof s.data("css-top")&&s.data("css-top",parseInt(s.css("top"),10)).data("offset",this.cache_offset(s)),s.attr("tabindex","0").attr("aria-hidden","false"),this.key_up_on(s),s.on("open.fndtn.reveal",function(t){"fndtn.reveal"!==t.namespace}),s.on("open.fndtn.reveal").trigger("open.fndtn.reveal"),r.length<1&&this.toggle_bg(s,!0),"string"==typeof n&&(n={url:n}),"undefined"!=typeof n&&n.url){var l="undefined"!=typeof n.success?n.success:null;t.extend(n,{success:function(e,i,n){if(t.isFunction(l)){var d=l(e,i,n);"string"==typeof d&&(e=d)}"undefined"!=typeof options&&"undefined"!=typeof options.replaceContentSel?s.find(options.replaceContentSel).html(e):s.html(e),a.S(s).foundation("section","reflow"),a.S(s).children().foundation(),r.length>0&&(o.multiple_opened?a.to_back(r):a.hide(r,o.css.close)),a.show(s,o.css.open)}}),o.on_ajax_error!==t.noop&&t.extend(n,{error:o.on_ajax_error}),t.ajax(n)}else r.length>0&&(o.multiple_opened?a.to_back(r):a.hide(r,o.css.close)),this.show(s,o.css.open)}a.S(e).trigger("resize")},close:function(e){var e=e&&e.length?e:this.S(this.scope),i=this.S("["+this.attr_name()+"].open"),n=e.data(this.attr_name(!0)+"-init")||this.settings,s=this;i.length>0&&(e.removeAttr("tabindex","0").attr("aria-hidden","true"),this.locked=!0,this.key_up_off(e),e.trigger("close.fndtn.reveal"),(n.multiple_opened&&1===i.length||!n.multiple_opened||e.length>1)&&(s.toggle_bg(e,!1),s.to_front(e)),n.multiple_opened?(s.hide(e,n.css.close,n),s.to_front(t(t.makeArray(i).reverse()[1]))):s.hide(i,n.css.close,n))},close_targets:function(){var t="."+this.settings.dismiss_modal_class;return this.settings.close_on_background_click?t+", ."+this.settings.bg_class:t},toggle_bg:function(e,i){0===this.S("."+this.settings.bg_class).length&&(this.settings.bg=t("<div />",{"class":this.settings.bg_class}).appendTo("body").hide());var s=this.settings.bg.filter(":visible").length>0;i!=s&&((i==n?s:!i)?this.hide(this.settings.bg):this.show(this.settings.bg))},show:function(i,n){if(n){var a=i.data(this.attr_name(!0)+"-init")||this.settings,o=a.root_element,r=this;if(0===i.parent(o).length){var l=i.wrap('<div style="display: none;" />').parent();i.on("closed.fndtn.reveal.wrapped",function(){i.detach().appendTo(l),i.unwrap().unbind("closed.fndtn.reveal.wrapped")}),i.detach().appendTo(o)}var d=s(a.animation);if(d.animate||(this.locked=!1),d.pop){n.top=t(e).scrollTop()-i.data("offset")+"px";var c={top:t(e).scrollTop()+i.data("css-top")+"px",opacity:1};return setTimeout(function(){return i.css(n).animate(c,a.animation_speed,"linear",function(){r.locked=!1,i.trigger("opened.fndtn.reveal")}).addClass("open")},a.animation_speed/2)}if(d.fade){n.top=t(e).scrollTop()+i.data("css-top")+"px";var c={opacity:1};return setTimeout(function(){return i.css(n).animate(c,a.animation_speed,"linear",function(){r.locked=!1,i.trigger("opened.fndtn.reveal")}).addClass("open")},a.animation_speed/2)}return i.css(n).show().css({opacity:1}).addClass("open").trigger("opened.fndtn.reveal")}var a=this.settings;return s(a.animation).fade?i.fadeIn(a.animation_speed/2):(this.locked=!1,i.show())},to_back:function(t){t.addClass("toback")},to_front:function(t){t.removeClass("toback")},hide:function(i,n){if(n){var a=i.data(this.attr_name(!0)+"-init"),o=this;a=a||this.settings;var r=s(a.animation);if(r.animate||(this.locked=!1),r.pop){var l={top:-t(e).scrollTop()-i.data("offset")+"px",opacity:0};return setTimeout(function(){return i.animate(l,a.animation_speed,"linear",function(){o.locked=!1,i.css(n).trigger("closed.fndtn.reveal")}).removeClass("open")},a.animation_speed/2)}if(r.fade){var l={opacity:0};return setTimeout(function(){return i.animate(l,a.animation_speed,"linear",function(){o.locked=!1,i.css(n).trigger("closed.fndtn.reveal")}).removeClass("open")},a.animation_speed/2)}return i.hide().css(n).removeClass("open").trigger("closed.fndtn.reveal")}var a=this.settings;return s(a.animation).fade?i.fadeOut(a.animation_speed/2):i.hide()},close_video:function(e){var i=t(".flex-video",e.target),n=t("iframe",i);n.length>0&&(n.attr("data-src",n[0].src),n.attr("src",n.attr("src")),i.hide())},open_video:function(e){var i=t(".flex-video",e.target),s=i.find("iframe");if(s.length>0){var a=s.attr("data-src");if("string"==typeof a)s[0].src=s.attr("data-src");else{var o=s[0].src;s[0].src=n,s[0].src=o}i.show()}},data_attr:function(t){return this.namespace.length>0?this.namespace+"-"+t:t},cache_offset:function(t){var e=t.show().height()+parseInt(t.css("top"),10)+t.scrollY;return t.hide(),e},off:function(){t(this.scope).off(".fndtn.reveal")},reflow:function(){}}}(jQuery,window,window.document),function(t,e,i,n){"use strict";Foundation.libs.slider={name:"slider",version:"5.5.2",settings:{start:0,end:100,step:1,precision:null,initial:null,display_selector:"",vertical:!1,trigger_input_change:!1,on_change:function(){}},cache:{},init:function(t,e,i){Foundation.inherit(this,"throttle"),this.bindings(e,i),this.reflow()},events:function(){var i=this;t(this.scope).off(".slider").on("mousedown.fndtn.slider touchstart.fndtn.slider pointerdown.fndtn.slider","["+i.attr_name()+"]:not(.disabled, [disabled]) .range-slider-handle",function(e){i.cache.active||(e.preventDefault(),i.set_active_slider(t(e.target)))}).on("mousemove.fndtn.slider touchmove.fndtn.slider pointermove.fndtn.slider",function(n){if(i.cache.active)if(n.preventDefault(),t.data(i.cache.active[0],"settings").vertical){var s=0;n.pageY||(s=e.scrollY),i.calculate_position(i.cache.active,i.get_cursor_position(n,"y")+s)}else i.calculate_position(i.cache.active,i.get_cursor_position(n,"x"))}).on("mouseup.fndtn.slider touchend.fndtn.slider pointerup.fndtn.slider",function(t){i.remove_active_slider()}).on("change.fndtn.slider",function(t){i.settings.on_change()}),i.S(e).on("resize.fndtn.slider",i.throttle(function(t){i.reflow()},300)),this.S("["+this.attr_name()+"]").each(function(){var e=t(this),n=e.children(".range-slider-handle")[0],s=i.initialize_settings(n);""!=s.display_selector&&t(s.display_selector).each(function(){this.hasOwnProperty("value")&&t(this).change(function(){e.foundation("slider","set_value",t(this).val())})})})},get_cursor_position:function(t,e){var i,n="page"+e.toUpperCase(),s="client"+e.toUpperCase();return"undefined"!=typeof t[n]?i=t[n]:"undefined"!=typeof t.originalEvent[s]?i=t.originalEvent[s]:t.originalEvent.touches&&t.originalEvent.touches[0]&&"undefined"!=typeof t.originalEvent.touches[0][s]?i=t.originalEvent.touches[0][s]:t.currentPoint&&"undefined"!=typeof t.currentPoint[e]&&(i=t.currentPoint[e]),i},set_active_slider:function(t){this.cache.active=t},remove_active_slider:function(){this.cache.active=null},calculate_position:function(e,i){var n=this,s=t.data(e[0],"settings"),a=(t.data(e[0],"handle_l"),t.data(e[0],"handle_o"),t.data(e[0],"bar_l")),o=t.data(e[0],"bar_o");requestAnimationFrame(function(){var t;t=Foundation.rtl&&!s.vertical?n.limit_to((o+a-i)/a,0,1):n.limit_to((i-o)/a,0,1),t=s.vertical?1-t:t;var r=n.normalized_value(t,s.start,s.end,s.step,s.precision);n.set_ui(e,r)})},set_ui:function(e,i){var n=t.data(e[0],"settings"),s=t.data(e[0],"handle_l"),a=t.data(e[0],"bar_l"),o=this.normalized_percentage(i,n.start,n.end),r=o*(a-s)-1,l=100*o,d=e.parent(),c=e.parent().children("input[type=hidden]");Foundation.rtl&&!n.vertical&&(r=-r),r=n.vertical?-r+a-s+1:r,this.set_translate(e,r,n.vertical),n.vertical?e.siblings(".range-slider-active-segment").css("height",l+"%"):e.siblings(".range-slider-active-segment").css("width",l+"%"),d.attr(this.attr_name(),i).trigger("change.fndtn.slider"),c.val(i),n.trigger_input_change&&c.trigger("change.fndtn.slider"),e[0].hasAttribute("aria-valuemin")||e.attr({"aria-valuemin":n.start,"aria-valuemax":n.end}),e.attr("aria-valuenow",i),""!=n.display_selector&&t(n.display_selector).each(function(){this.hasAttribute("value")?t(this).val(i):t(this).text(i)})},normalized_percentage:function(t,e,i){return Math.min(1,(t-e)/(i-e))},normalized_value:function(t,e,i,n,s){var a=i-e,o=t*a,r=(o-o%n)/n,l=o%n,d=l>=.5*n?n:0;return(r*n+d+e).toFixed(s)},set_translate:function(e,i,n){n?t(e).css("-webkit-transform","translateY("+i+"px)").css("-moz-transform","translateY("+i+"px)").css("-ms-transform","translateY("+i+"px)").css("-o-transform","translateY("+i+"px)").css("transform","translateY("+i+"px)"):t(e).css("-webkit-transform","translateX("+i+"px)").css("-moz-transform","translateX("+i+"px)").css("-ms-transform","translateX("+i+"px)").css("-o-transform","translateX("+i+"px)").css("transform","translateX("+i+"px)")},limit_to:function(t,e,i){return Math.min(Math.max(t,e),i)},initialize_settings:function(e){var i,n=t.extend({},this.settings,this.data_options(t(e).parent()));return null===n.precision&&(i=(""+n.step).match(/\.([\d]*)/),n.precision=i&&i[1]?i[1].length:0),n.vertical?(t.data(e,"bar_o",t(e).parent().offset().top),t.data(e,"bar_l",t(e).parent().outerHeight()),t.data(e,"handle_o",t(e).offset().top),t.data(e,"handle_l",t(e).outerHeight())):(t.data(e,"bar_o",t(e).parent().offset().left),t.data(e,"bar_l",t(e).parent().outerWidth()),t.data(e,"handle_o",t(e).offset().left),t.data(e,"handle_l",t(e).outerWidth())),t.data(e,"bar",t(e).parent()),t.data(e,"settings",n)},set_initial_position:function(e){var i=t.data(e.children(".range-slider-handle")[0],"settings"),n="number"!=typeof i.initial||isNaN(i.initial)?Math.floor(.5*(i.end-i.start)/i.step)*i.step+i.start:i.initial,s=e.children(".range-slider-handle");this.set_ui(s,n)},set_value:function(e){var i=this;t("["+i.attr_name()+"]",this.scope).each(function(){t(this).attr(i.attr_name(),e)}),t(this.scope).attr(i.attr_name())&&t(this.scope).attr(i.attr_name(),e),i.reflow()},reflow:function(){var e=this;e.S("["+this.attr_name()+"]").each(function(){var i=t(this).children(".range-slider-handle")[0],n=t(this).attr(e.attr_name());e.initialize_settings(i),n?e.set_ui(t(i),parseFloat(n)):e.set_initial_position(t(this))})}}}(jQuery,window,window.document),function(t,e,i,n){"use strict";Foundation.libs.tab={name:"tab",version:"5.5.2",settings:{active_class:"active",callback:function(){},deep_linking:!1,scroll_to_content:!0,is_hover:!1},default_tab_hashes:[],init:function(t,i,n){var s=this,a=this.S;a("["+this.attr_name()+"] > .active > a",this.scope).each(function(){s.default_tab_hashes.push(this.hash)}),s.entry_location=e.location.href,this.bindings(i,n),this.handle_location_hash_change()},events:function(){var t=this,i=this.S,n=function(e,n){var s=i(n).closest("["+t.attr_name()+"]").data(t.attr_name(!0)+"-init");(!s.is_hover||Modernizr.touch)&&(e.preventDefault(),e.stopPropagation(),t.toggle_active_tab(i(n).parent()))};i(this.scope).off(".tab").on("keydown.fndtn.tab","["+this.attr_name()+"] > * > a",function(t){var e=this,i=t.keyCode||t.which;9==i&&(t.preventDefault(),n(t,e))}).on("click.fndtn.tab","["+this.attr_name()+"] > * > a",function(t){var e=this;n(t,e)}).on("mouseenter.fndtn.tab","["+this.attr_name()+"] > * > a",function(e){var n=i(this).closest("["+t.attr_name()+"]").data(t.attr_name(!0)+"-init");n.is_hover&&t.toggle_active_tab(i(this).parent())}),i(e).on("hashchange.fndtn.tab",function(e){e.preventDefault(),t.handle_location_hash_change()})},handle_location_hash_change:function(){var e=this,i=this.S;i("["+this.attr_name()+"]",this.scope).each(function(){var s=i(this).data(e.attr_name(!0)+"-init");if(s.deep_linking){var a;if(a=s.scroll_to_content?e.scope.location.hash:e.scope.location.hash.replace("fndtn-",""),""!=a){var o=i(a);if(o.hasClass("content")&&o.parent().hasClass("tabs-content"))e.toggle_active_tab(t("["+e.attr_name()+"] > * > a[href="+a+"]").parent());else{var r=o.closest(".content").attr("id");r!=n&&e.toggle_active_tab(t("["+e.attr_name()+"] > * > a[href=#"+r+"]").parent(),a)}}else for(var l=0;l<e.default_tab_hashes.length;l++)e.toggle_active_tab(t("["+e.attr_name()+"] > * > a[href="+e.default_tab_hashes[l]+"]").parent())}})},toggle_active_tab:function(s,a){var o=this,r=o.S,l=s.closest("["+this.attr_name()+"]"),d=s.find("a"),c=s.children("a").first(),h="#"+c.attr("href").split("#")[1],u=r(h),f=s.siblings(),p=l.data(this.attr_name(!0)+"-init"),g=function(e){var n,s=t(this),a=t(this).parents("li").prev().children('[role="tab"]'),o=t(this).parents("li").next().children('[role="tab"]');switch(e.keyCode){case 37:n=a;break;case 39:n=o;break;default:n=!1}n.length&&(s.attr({tabindex:"-1","aria-selected":null}),n.attr({tabindex:"0","aria-selected":!0}).focus()),t('[role="tabpanel"]').attr("aria-hidden","true"),t("#"+t(i.activeElement).attr("href").substring(1)).attr("aria-hidden",null)},m=function(t){var i=e.location.href===o.entry_location,n=p.scroll_to_content?o.default_tab_hashes[0]:i?e.location.hash:"fndtn-"+o.default_tab_hashes[0].replace("#","");i&&t===n||(e.location.hash=t)};c.data("tab-content")&&(h="#"+c.data("tab-content").split("#")[1],u=r(h)),p.deep_linking&&(p.scroll_to_content?(m(a||h),a==n||a==h?s.parent()[0].scrollIntoView():r(h)[0].scrollIntoView()):m(a!=n?"fndtn-"+a.replace("#",""):"fndtn-"+h.replace("#",""))),s.addClass(p.active_class).triggerHandler("opened"),d.attr({"aria-selected":"true",tabindex:0}),f.removeClass(p.active_class),f.find("a").attr({"aria-selected":"false",tabindex:-1}),u.siblings().removeClass(p.active_class).attr({"aria-hidden":"true",tabindex:-1}),u.addClass(p.active_class).attr("aria-hidden","false").removeAttr("tabindex"),p.callback(s),u.triggerHandler("toggled",[u]),l.triggerHandler("toggled",[s]),d.off("keydown").on("keydown",g)},data_attr:function(t){return this.namespace.length>0?this.namespace+"-"+t:t},off:function(){},reflow:function(){}}}(jQuery,window,window.document),function(t,e,i,n){"use strict";Foundation.libs.tooltip={name:"tooltip",version:"5.5.2",settings:{additional_inheritable_classes:[],tooltip_class:".tooltip",append_to:"body",touch_close_text:"Tap To Close",disable_for_touch:!1,hover_delay:200,show_on:"all",tip_template:function(t,e){return'<span data-selector="'+t+'" id="'+t+'" class="'+Foundation.libs.tooltip.settings.tooltip_class.substring(1)+'" role="tooltip">'+e+'<span class="nub"></span></span>'}},cache:{},init:function(t,e,i){Foundation.inherit(this,"random_str"),this.bindings(e,i)},should_show:function(e,i){var n=t.extend({},this.settings,this.data_options(e));return"all"===n.show_on?!0:this.small()&&"small"===n.show_on?!0:this.medium()&&"medium"===n.show_on?!0:this.large()&&"large"===n.show_on?!0:!1},medium:function(){return matchMedia(Foundation.media_queries.medium).matches},large:function(){return matchMedia(Foundation.media_queries.large).matches},events:function(e){function i(t,e,i){t.timer||(i?(t.timer=null,s.showTip(e)):t.timer=setTimeout(function(){t.timer=null,s.showTip(e)}.bind(t),s.settings.hover_delay))}function n(t,e){t.timer&&(clearTimeout(t.timer),t.timer=null),s.hide(e)}var s=this,a=s.S;s.create(this.S(e)),t(this.scope).off(".tooltip").on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"]",function(e){var o=a(this),r=t.extend({},s.settings,s.data_options(o)),l=!1;if(Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type)&&a(e.target).is("a"))return!1;if(/mouse/i.test(e.type)&&s.ie_touch(e))return!1;if(o.hasClass("open"))Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type)&&e.preventDefault(),s.hide(o);else{if(r.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type))return;if(!r.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type)&&(e.preventDefault(),a(r.tooltip_class+".open").hide(),l=!0,t(".open["+s.attr_name()+"]").length>0)){var d=a(t(".open["+s.attr_name()+"]")[0]);s.hide(d)}/enter|over/i.test(e.type)?i(this,o):"mouseout"===e.type||"mouseleave"===e.type?n(this,o):i(this,o,!0)}}).on("mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"].open",function(e){return/mouse/i.test(e.type)&&s.ie_touch(e)?!1:void(("touch"!=t(this).data("tooltip-open-event-type")||"mouseleave"!=e.type)&&("mouse"==t(this).data("tooltip-open-event-type")&&/MSPointerDown|touchstart/i.test(e.type)?s.convert_to_touch(t(this)):n(this,t(this))))}).on("DOMNodeRemoved DOMAttrModified","["+this.attr_name()+"]:not(a)",function(t){n(this,a(this))})},ie_touch:function(t){return!1},showTip:function(t){var e=this.getTip(t);return this.should_show(t,e)?this.show(t):void 0},getTip:function(e){var i=this.selector(e),n=t.extend({},this.settings,this.data_options(e)),s=null;return i&&(s=this.S('span[data-selector="'+i+'"]'+n.tooltip_class)),"object"==typeof s?s:!1},selector:function(t){var e=t.attr(this.attr_name())||t.attr("data-selector");return"string"!=typeof e&&(e=this.random_str(6),t.attr("data-selector",e).attr("aria-describedby",e)),e},create:function(i){var n=this,s=t.extend({},this.settings,this.data_options(i)),a=this.settings.tip_template;"string"==typeof s.tip_template&&e.hasOwnProperty(s.tip_template)&&(a=e[s.tip_template]);var o=t(a(this.selector(i),t("<div></div>").html(i.attr("title")).html())),r=this.inheritable_classes(i);o.addClass(r).appendTo(s.append_to),Modernizr.touch&&(o.append('<span class="tap-to-close">'+s.touch_close_text+"</span>"),o.on("touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip",function(t){n.hide(i)})),i.removeAttr("title").attr("title","")},reposition:function(e,i,n){var s,a,o,r,l;if(i.css("visibility","hidden").show(),s=e.data("width"),a=i.children(".nub"),o=a.outerHeight(),r=a.outerHeight(),this.small()?i.css({width:"100%"}):i.css({width:s?s:"auto"}),l=function(t,e,i,n,s,a){return t.css({top:e?e:"auto",bottom:n?n:"auto",left:s?s:"auto",right:i?i:"auto"}).end()},l(i,e.offset().top+e.outerHeight()+10,"auto","auto",e.offset().left),this.small())l(i,e.offset().top+e.outerHeight()+10,"auto","auto",12.5,t(this.scope).width()),i.addClass("tip-override"),l(a,-o,"auto","auto",e.offset().left);else{var d=e.offset().left;Foundation.rtl&&(a.addClass("rtl"),d=e.offset().left+e.outerWidth()-i.outerWidth()),l(i,e.offset().top+e.outerHeight()+10,"auto","auto",d),a.attr("style")&&a.removeAttr("style"),i.removeClass("tip-override"),n&&n.indexOf("tip-top")>-1?(Foundation.rtl&&a.addClass("rtl"),l(i,e.offset().top-i.outerHeight(),"auto","auto",d).removeClass("tip-override")):n&&n.indexOf("tip-left")>-1?(l(i,e.offset().top+e.outerHeight()/2-i.outerHeight()/2,"auto","auto",e.offset().left-i.outerWidth()-o).removeClass("tip-override"),a.removeClass("rtl")):n&&n.indexOf("tip-right")>-1&&(l(i,e.offset().top+e.outerHeight()/2-i.outerHeight()/2,"auto","auto",e.offset().left+e.outerWidth()+o).removeClass("tip-override"),a.removeClass("rtl"))}i.css("visibility","visible").hide()},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},inheritable_classes:function(e){var i=t.extend({},this.settings,this.data_options(e)),n=["tip-top","tip-left","tip-bottom","tip-right","radius","round"].concat(i.additional_inheritable_classes),s=e.attr("class"),a=s?t.map(s.split(" "),function(e,i){return-1!==t.inArray(e,n)?e:void 0}).join(" "):"";return t.trim(a)},convert_to_touch:function(e){var i=this,n=i.getTip(e),s=t.extend({},i.settings,i.data_options(e));0===n.find(".tap-to-close").length&&(n.append('<span class="tap-to-close">'+s.touch_close_text+"</span>"),n.on("click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose",function(t){i.hide(e)})),e.data("tooltip-open-event-type","touch")},show:function(t){var e=this.getTip(t);"touch"==t.data("tooltip-open-event-type")&&this.convert_to_touch(t),this.reposition(t,e,t.attr("class")),t.addClass("open"),e.fadeIn(150)},hide:function(t){var e=this.getTip(t);e.fadeOut(150,function(){e.find(".tap-to-close").remove(),e.off("click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose"),t.removeClass("open")})},off:function(){var e=this;this.S(this.scope).off(".fndtn.tooltip"),this.S(this.settings.tooltip_class).each(function(i){t("["+e.attr_name()+"]").eq(i).attr("title",t(this).text())}).remove()},reflow:function(){}}}(jQuery,window,window.document),function(t,e,i,n){"use strict";Foundation.libs.topbar={name:"topbar",version:"5.5.2",settings:{index:0,start_offset:0,sticky_class:"sticky",custom_back_text:!0,back_text:"Back",mobile_show_parent_link:!0,is_hover:!0,scrolltop:!0,sticky_on:"all",dropdown_autoclose:!0},init:function(e,i,n){Foundation.inherit(this,"add_custom_rule register_media throttle");var s=this;s.register_media("topbar","foundation-mq-topbar"),this.bindings(i,n),s.S("["+this.attr_name()+"]",this.scope).each(function(){var e=t(this),i=e.data(s.attr_name(!0)+"-init");s.S("section, .top-bar-section",this);e.data("index",0);var n=e.parent();n.hasClass("fixed")||s.is_sticky(e,n,i)?(s.settings.sticky_class=i.sticky_class,s.settings.sticky_topbar=e,e.data("height",n.outerHeight()),e.data("stickyoffset",n.offset().top)):e.data("height",e.outerHeight()),i.assembled||s.assemble(e),i.is_hover?s.S(".has-dropdown",e).addClass("not-click"):s.S(".has-dropdown",e).removeClass("not-click"),s.add_custom_rule(".f-topbar-fixed { padding-top: "+e.data("height")+"px }"),n.hasClass("fixed")&&s.S("body").addClass("f-topbar-fixed")})},is_sticky:function(t,e,i){var n=e.hasClass(i.sticky_class),s=matchMedia(Foundation.media_queries.small).matches,a=matchMedia(Foundation.media_queries.medium).matches,o=matchMedia(Foundation.media_queries.large).matches;return n&&"all"===i.sticky_on?!0:n&&this.small()&&-1!==i.sticky_on.indexOf("small")&&s&&!a&&!o?!0:n&&this.medium()&&-1!==i.sticky_on.indexOf("medium")&&s&&a&&!o?!0:n&&this.large()&&-1!==i.sticky_on.indexOf("large")&&s&&a&&o?!0:!1},toggle:function(i){var n,s=this;n=i?s.S(i).closest("["+this.attr_name()+"]"):s.S("["+this.attr_name()+"]");var a=n.data(this.attr_name(!0)+"-init"),o=s.S("section, .top-bar-section",n);s.breakpoint()&&(s.rtl?(o.css({right:"0%"}),t(">.name",o).css({right:"100%"})):(o.css({left:"0%"}),t(">.name",o).css({left:"100%"})),s.S("li.moved",o).removeClass("moved"),n.data("index",0),n.toggleClass("expanded").css("height","")),a.scrolltop?n.hasClass("expanded")?n.parent().hasClass("fixed")&&(a.scrolltop?(n.parent().removeClass("fixed"),n.addClass("fixed"),s.S("body").removeClass("f-topbar-fixed"),e.scrollTo(0,0)):n.parent().removeClass("expanded")):n.hasClass("fixed")&&(n.parent().addClass("fixed"),n.removeClass("fixed"),s.S("body").addClass("f-topbar-fixed")):(s.is_sticky(n,n.parent(),a)&&n.parent().addClass("fixed"),n.parent().hasClass("fixed")&&(n.hasClass("expanded")?(n.addClass("fixed"),n.parent().addClass("expanded"),s.S("body").addClass("f-topbar-fixed")):(n.removeClass("fixed"),n.parent().removeClass("expanded"),s.update_sticky_positioning())))},timer:null,events:function(i){var n=this,s=this.S;s(this.scope).off(".topbar").on("click.fndtn.topbar","["+this.attr_name()+"] .toggle-topbar",function(t){t.preventDefault(),n.toggle(this)}).on("click.fndtn.topbar contextmenu.fndtn.topbar",'.top-bar .top-bar-section li a[href^="#"],['+this.attr_name()+'] .top-bar-section li a[href^="#"]',function(e){var i=t(this).closest("li"),s=i.closest("["+n.attr_name()+"]"),a=s.data(n.attr_name(!0)+"-init");
if(a.dropdown_autoclose&&a.is_hover){var o=t(this).closest(".hover");o.removeClass("hover")}!n.breakpoint()||i.hasClass("back")||i.hasClass("has-dropdown")||n.toggle()}).on("click.fndtn.topbar","["+this.attr_name()+"] li.has-dropdown",function(e){var i=s(this),a=s(e.target),o=i.closest("["+n.attr_name()+"]"),r=o.data(n.attr_name(!0)+"-init");return a.data("revealId")?void n.toggle():void(n.breakpoint()||(!r.is_hover||Modernizr.touch)&&(e.stopImmediatePropagation(),i.hasClass("hover")?(i.removeClass("hover").find("li").removeClass("hover"),i.parents("li.hover").removeClass("hover")):(i.addClass("hover"),t(i).siblings().removeClass("hover"),"A"===a[0].nodeName&&a.parent().hasClass("has-dropdown")&&e.preventDefault())))}).on("click.fndtn.topbar","["+this.attr_name()+"] .has-dropdown>a",function(t){if(n.breakpoint()){t.preventDefault();var e=s(this),i=e.closest("["+n.attr_name()+"]"),a=i.find("section, .top-bar-section"),o=(e.next(".dropdown").outerHeight(),e.closest("li"));i.data("index",i.data("index")+1),o.addClass("moved"),n.rtl?(a.css({right:-(100*i.data("index"))+"%"}),a.find(">.name").css({right:100*i.data("index")+"%"})):(a.css({left:-(100*i.data("index"))+"%"}),a.find(">.name").css({left:100*i.data("index")+"%"})),i.css("height",e.siblings("ul").outerHeight(!0)+i.data("height"))}}),s(e).off(".topbar").on("resize.fndtn.topbar",n.throttle(function(){n.resize.call(n)},50)).trigger("resize.fndtn.topbar").load(function(){s(this).trigger("resize.fndtn.topbar")}),s("body").off(".topbar").on("click.fndtn.topbar",function(t){var e=s(t.target).closest("li").closest("li.hover");e.length>0||s("["+n.attr_name()+"] li.hover").removeClass("hover")}),s(this.scope).on("click.fndtn.topbar","["+this.attr_name()+"] .has-dropdown .back",function(t){t.preventDefault();var e=s(this),i=e.closest("["+n.attr_name()+"]"),a=i.find("section, .top-bar-section"),o=(i.data(n.attr_name(!0)+"-init"),e.closest("li.moved")),r=o.parent();i.data("index",i.data("index")-1),n.rtl?(a.css({right:-(100*i.data("index"))+"%"}),a.find(">.name").css({right:100*i.data("index")+"%"})):(a.css({left:-(100*i.data("index"))+"%"}),a.find(">.name").css({left:100*i.data("index")+"%"})),0===i.data("index")?i.css("height",""):i.css("height",r.outerHeight(!0)+i.data("height")),setTimeout(function(){o.removeClass("moved")},300)}),s(this.scope).find(".dropdown a").focus(function(){t(this).parents(".has-dropdown").addClass("hover")}).blur(function(){t(this).parents(".has-dropdown").removeClass("hover")})},resize:function(){var t=this;t.S("["+this.attr_name()+"]").each(function(){var e,n=t.S(this),s=n.data(t.attr_name(!0)+"-init"),a=n.parent("."+t.settings.sticky_class);if(!t.breakpoint()){var o=n.hasClass("expanded");n.css("height","").removeClass("expanded").find("li").removeClass("hover"),o&&t.toggle(n)}t.is_sticky(n,a,s)&&(a.hasClass("fixed")?(a.removeClass("fixed"),e=a.offset().top,t.S(i.body).hasClass("f-topbar-fixed")&&(e-=n.data("height")),n.data("stickyoffset",e),a.addClass("fixed")):(e=a.offset().top,n.data("stickyoffset",e)))})},breakpoint:function(){return!matchMedia(Foundation.media_queries.topbar).matches},small:function(){return matchMedia(Foundation.media_queries.small).matches},medium:function(){return matchMedia(Foundation.media_queries.medium).matches},large:function(){return matchMedia(Foundation.media_queries.large).matches},assemble:function(e){var i=this,n=e.data(this.attr_name(!0)+"-init"),s=i.S("section, .top-bar-section",e);s.detach(),i.S(".has-dropdown>a",s).each(function(){var e,s=i.S(this),a=s.siblings(".dropdown"),o=s.attr("href");a.find(".title.back").length||(e=t(1==n.mobile_show_parent_link&&o?'<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li class="parent-link hide-for-medium-up"><a class="parent-link js-generated" href="'+o+'">'+s.html()+"</a></li>":'<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5>'),1==n.custom_back_text?t("h5>a",e).html(n.back_text):t("h5>a",e).html("&laquo; "+s.html()),a.prepend(e))}),s.appendTo(e),this.sticky(),this.assembled(e)},assembled:function(e){e.data(this.attr_name(!0),t.extend({},e.data(this.attr_name(!0)),{assembled:!0}))},height:function(e){var i=0,n=this;return t("> li",e).each(function(){i+=n.S(this).outerHeight(!0)}),i},sticky:function(){var t=this;this.S(e).on("scroll",function(){t.update_sticky_positioning()})},update_sticky_positioning:function(){var t="."+this.settings.sticky_class,i=this.S(e),n=this;if(n.settings.sticky_topbar&&n.is_sticky(this.settings.sticky_topbar,this.settings.sticky_topbar.parent(),this.settings)){var s=this.settings.sticky_topbar.data("stickyoffset")+this.settings.start_offset;n.S(t).hasClass("expanded")||(i.scrollTop()>s?n.S(t).hasClass("fixed")||(n.S(t).addClass("fixed"),n.S("body").addClass("f-topbar-fixed")):i.scrollTop()<=s&&n.S(t).hasClass("fixed")&&(n.S(t).removeClass("fixed"),n.S("body").removeClass("f-topbar-fixed")))}},off:function(){this.S(this.scope).off(".fndtn.topbar"),this.S(e).off(".fndtn.topbar")},reflow:function(){}}}(jQuery,window,window.document),$(document).foundation(),function(){function t(t){if($("#playerwrappermobile").length>0&&(videoPlayerMobile.destroy(),$("#playerwrappermobile").closest(".embed").html("")),t.hasClass("activated"))$(".further-info-mobile").removeClass("activated");else{$(".further-info-mobile").removeClass("activated");var e=t.find(".video").attr("data-video-source");t.addClass("activated"),e=t.find(".video").attr("data-video-source"),t.find(".embed").html("<div id='playerwrappermobile'></div>"),videoPlayerMobile=OO.Player.create("playerwrappermobile",e)}}function e(){if($("#playerwrappermobile").length>0){var e=$("#playerwrappermobile").closest(".game").find(".further-info-mobile");t(e)}}function i(t){$("#modal").html(t.find(".modal-populator").html());var e=t.find(".video-holder").attr("data-video-source");$("#modal").find(".embed").html("<div id='playerwrapper'></div>"),videoPlayer=OO.Player.create("playerwrapper",e)}function n(){$(".background").removeClass("modal-active"),$(".background").css("height",0),$("#modal").fadeOut(),$(".modal-container-inner").css("marginLeft",0),videoPlayer.destroy(),$("#modal").html("")}function s(){var t=new Date,e=t.getTimezoneOffset();return e}function a(t){var e="local",i=[300,360,420,480],n=["ET","CT","MT","PT"];i.indexOf(t)>-1&&(e=n[i.indexOf(t)]),$(".time-object").each(function(){var i,n=$(this).html();n.indexOf(":")>-1&&(n=n.split(" "),i=n[0].split(":"),"p.m."===n[1]&&(i[0]=parseInt(i[0])+12,24===i[0]&&(i[0]=12)),i[0]=60*i[0]+parseInt(i[1])-t+300,i[0]=i[0]/60,i[0]>=12?n[1]="p.m.":n[1]="a.m.",i[1]=Math.round(i[0]%1*60),i[0]=Math.floor(i[0]),console.log(i[1]),i[1]<10&&(i[1]="0"+i[1]),i[0]>12&&(i[0]=i[0]-12),$(this).html(i[0]+":"+i[1]+" "+n[1]+" "+e))})}var o=[{media:"(max-width: 1600px)",data_name:"x-large"},{media:"(max-width: 1200px)",data_name:"large"},{media:"(max-width: 900px)",data_name:"medium"},{media:"(max-width: 640px)",data_name:"small"},{media:"(max-width: 400px)",data_name:"x-small"}];$(document).ready(function(){$(".lazy").lazyload({threshold:"50%",failure_limit:999,effect:"fadeIn",data_attribute_queries:o});var r=s();r>299&&481>r&&a(r),$(".toggle").waypoint(function(t){"down"===t?$(".toggle-container").addClass("fixed"):$(".toggle-container").removeClass("fixed")}),$(".toggle-container .afc").click(function(){$(".toggle-container").removeClass("nfc-select"),$(".toggle-container").addClass("afc-select"),$(".conferences-inner").removeClass("nfc-select"),$(".conferences-inner").addClass("afc-select"),e()}),$(".toggle-container .nfc").click(function(){$(".toggle-container").removeClass("afc-select"),$(".toggle-container").addClass("nfc-select"),$(".conferences-inner").removeClass("afc-select"),$(".conferences-inner").addClass("nfc-select"),e()}),$(".more").click(function(){var e=$(this).closest(".game").find(".further-info-mobile");t(e)}),$(".game.selectable").click(function(){if($(window).width()>859){var t,e,n;$(".background").addClass("modal-active"),n=$(document).height(),$(".background").css("height",n),e=window.pageYOffset+window.innerHeight/2,e+="px",$("#modal").css({top:e}),$("#modal").fadeIn(),t=$(this),i(t)}}),$(".background").click(function(){$(this).hasClass("active")||n()}),$("#modal").on("click","li.available",function(){var t=-100*$(this).index();t+="%",$(".modal-container-inner").css("marginLeft",t),$("#modal li").removeClass("selected"),$(this).addClass("selected"),videoPlayer.pause()}),$("#modal").on("click",".modal-close",function(){n()}),$(document).keyup(function(t){27===t.keyCode&&n()})})}();