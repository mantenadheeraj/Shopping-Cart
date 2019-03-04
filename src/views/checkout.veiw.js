import CheckoutTemplate from "../templates/checkout.template.hbs";

import $ from "jquery";
import Handlebars from "handlebars";
import multiply from "../helpers/multiply.helper";
import toFixed from "../helpers/toFixed.helper";

let checkout = Backbone.View.extend({
   el: "#checkout-cart",
   tagName: "div",
   template: Handlebars.compile(CheckoutTemplate),
   initialize: function() {
      this.model.on("change", this.render, this);
   },
   events: {
      "click #close-cart": "closeCart",
      "click #removeCheckoutItem": "clearItem"
   },
   closeCart: function(e) {
      $("#checkout_display").toggleClass("show_checkout");
   },
   clearItem: function(e) {
      $("#removeCheckoutItem")
         .parent()
         .remove();

      let id = e.target.dataset.id;
      let items = this.model.get("total_price");

      if (id) {
         let finalItemPrice = items.toFixed(2);
         let finalTotalPrice = finalItemPrice - id;
         finalItemPrice = finalTotalPrice;
      }
   },

   render: function() {
      this.$el.html(this.template({ cart: this.model.toJSON() }));
      return this;
   }
});

export default checkout;
