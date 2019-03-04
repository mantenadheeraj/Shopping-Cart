import HeaderTemplate from "../../templates/layout/header.template.hbs";
import $ from "jquery";
import Handlebars from "handlebars";
var HeaderView = Backbone.View.extend({
   el: "#header",
   template: Handlebars.compile(HeaderTemplate),
   initialize: function() {},
   events: {
      "click .all-filter-btn": "filterSelection",
      "click .kids-filter-btn": "filterSelection",
      "click .mens-filter-btn": "filterSelection",
      "click .womens-filter-btn": "filterSelection"
   },
   filterSelection: function(e) {
      $("[class*='-filter-btn']").removeClass("active");
      e.target.classList.add("active");

      if (e.target.dataset.filter === "all") {
         $("[class*='column']").addClass("show");
      } else {
         $("[class*='column']").removeClass("show");
         $("[class~='" + e.target.dataset.filter + "']").addClass("show");
      }
   },

   render: function() {
      this.$el.html(this.template({}));
   }
});
export default HeaderView;
