import IndexTemplate from "../templates/index.template.hbs";
import $ from "jquery";
import Handlebars from "handlebars";
var IndexView = Backbone.View.extend({
   template: Handlebars.compile(IndexTemplate),
   cart: null,
   checkout: null,
   initialize: function(options) {
      this.checkout = options.model1;
      this.cart = options.model1;

      this.model.on("add", this.render, this);
      this.model.on("change", this.render, this);
   },
   events: {
      "change .select": "sort",
      "click #add_to_cart": "additem"
   },
   filter: null,
   additem: function(e) {
      var id = e.target.dataset.id;
      let cart_item = this.model.get(id);
      this.cart.save({
         item: {
            id: parseInt(id),
            title: cart_item.get("title"),
            image: cart_item.get("image"),
            price: cart_item.get("price"),
            quantity: 0
         },
         remove: false
      });
   },
   sort: function(e) {
      let filter = e.target.value;
      this.filter = filter;
      if (filter) {
         this.model.selectedcomparator = filter;
      }
      this.model.sort();
      this.render();
   },
   render: function() {
      let $el = this.$el.find("[class~='show']");
      let class_els = "all";
      if (
         $el.hasClass("kids") &&
         $el.hasClass("Mens") &&
         $el.hasClass("womens")
      ) {
         class_els = "all";
      } else if ($el.hasClass("kids")) {
         class_els = "kids";
      } else if ($el.hasClass("Mens")) {
         class_els = "Mens";
      } else if ($el.hasClass("womens")) {
         class_els = "womens";
      }
      this.$el.html(this.template({ items: this.model.toJSON() }));
      if (class_els !== "all") {
         $("[class~='column']").removeClass("show");
         $("[class~='" + class_els + "']").addClass("show");
      }
      this.$el.find(".select").val(this.filter);
      return this;
   }
});
export default IndexView;
