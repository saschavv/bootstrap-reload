(function( $, window, document, undefined ) {
   var Reload = function(elem, options) {
      this.$elem = $(elem);
      this.options = options;
   };

   Reload.prototype.defaults = {
      time: 3000,
      autoReload: false,
      beforeReload: function(){},
      afterReload: function(){}
   };

   Reload.prototype.init = function() {
      var self = this;

      // Set the configuration parameters
      self.config = $.extend({}, self.defaults, self.options);

      // Set the container for refresh animation
      self.config.refreshContainer = $(self.$elem.find('.refresh-container'));

      // Set the container to update the data with
      self.config.dataContainer = self.$elem.find('.refresh-data');

      self.config.refreshButton = self.$elem.find('.fa-refresh');

      self.config.refreshButton.click(function () {
          self.reload()
          return false
      });

      if (self.config.autoReload) {
          setInterval(function () { self.reload() }, self.config.time);
          self.reload();
      }

      return self;
   };

   Reload.prototype.reload = function(){
       var _self = this;

      _self.config.refreshButton.addClass('fa-spin');

      //console.log("Get " + _self.$elem.data('url'));

      $.ajax({
         url: _self.$elem.data('url'),
         async: true,
         beforeSend: _self.config.beforeReload,
         success: function (data) {
             _self.config.dataContainer.html(data);
            _self.config.afterReload();
            _self.config.refreshButton.removeClass('fa-spin');
         }
      });
   };

   // Register the plugin to JQuery
   $.fn.reload = function(options) {
      this.each(function() {
         var $this, reload;
         $this = $(this);
         reload = new Reload(this, options);
         return reload.init();

      });
   };

})( window.jQuery, window, document );
