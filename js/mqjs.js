/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
(function($) {
  Drupal.mqJs = {
    callbacks: {},
    addCallback: function(layout, callback) {
//      alert(layout);
      Drupal.mqJs.callbacks[layout] = Drupal.mqJs.callbacks[layout] || [];
//      alert(Drupal.mqJs.callbacks[layout].length);
      Drupal.mqJs.callbacks[layout][Drupal.mqJs.callbacks[layout].length] = callback;
    },
    getCurrentLayout: function() {
      return Drupal.settings.mqjs.current_layout;
    },
    isMobile: function() {
      return (Drupal.settings.mqjs.current_layout == 'mobile') ? true : false;
    }
  }



  Drupal.behaviors.mqJsBind = {
    attach: function(context, settings) {
      Drupal.mqJs.callbacks = Drupal.mqJs.callbacks || {};

      $('body').bind('responsivelayout',
        function(e,d) {
//          var layout = Drupal.omega.getCurrentLayout();
          Drupal.settings.mqjs.current_layout = d.to;
          $.cookie('mqjs_layout', d.to);

          if(d.to != 'mobile' && 'not-mobile' in Drupal.mqJs.callbacks) {
            for(var i in Drupal.mqJs.callbacks['not-mobile']) {
              Drupal.mqJs.callbacks['not-mobile'][i](context, settings);
            }
          }

          if(d.to in Drupal.mqJs.callbacks) {
            for(var i in Drupal.mqJs.callbacks[d.to]) {
              Drupal.mqJs.callbacks[d.to][i](context, settings);
            }
          }
        }
      );

    }
  };
})(jQuery);

