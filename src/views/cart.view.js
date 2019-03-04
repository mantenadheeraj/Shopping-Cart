import CartTemplate from "../templates/cart.template.hbs";
import * as $ from "jquery";
import Handlebars from "handlebars";
import multiply from "../helpers/multiply.helper";
import toFixed from "../helpers/toFixed.helper";
import checkout from "./checkout.veiw";

let cart = Backbone.View.extend({
   el: "#cart-block",
   tagName: "div",
   template: Handlebars.compile(CartTemplate),
   initialize: function() {
      this.model.on("change", this.render, this);
   },
   events: {
      "click #open-cart": "openCart",
      "click #close-cart": "closeCart",
      "click #minus": "deleteItem",
      "click #plus": "addValue",
      "click #clear-cart": "clearCart",
      "click #checkout-cart": "checkoutCart"
   },
   checkoutCart: function() {
      $("#checkout_display").toggleClass("show_checkout");

      //   $("#cardnumber").payment("formatCardNumber");
      //   $("#cardexpiration").payment("formatCardExpiry");
      //   $("#cardcvc").payment("formatCardCVC");

      $("#cardnumber").keyup(function(event) {
         $("#label-cardnumber")
            .empty()
            .append($(this).val());
      });

      $("#cardexpiration").keyup(function(event) {
         var data = $(this).val() + "<span>" + $("#cardcvc").val() + "</span>";
         $("#label-cardexpiration")
            .empty()
            .append(data);
      });

      $("#cardcvc").keyup(function(event) {
         var data =
            $("#cardexpiration").val() + "<span>" + $(this).val() + "</span>";
         $("#label-cardexpiration")
            .empty()
            .append(data);
      });

      $(".button-cta").on("click", function() {
         var proceed = true;
         $(".field input").each(function() {
            $(this)
               .parent()
               .find("path")
               .each(function() {
                  $(this).attr("fill", "#dddfe6");
               });

            if (!$.trim($(this).val())) {
               $(this)
                  .parent()
                  .find("path")
                  .each(function() {
                     $(this).attr("fill", "#f1404b");
                     proceed = false;
                  });

               if (!proceed) {
                  $(this)
                     .parent()
                     .find("svg")
                     .animate({ opacity: "0.1" }, "slow");
                  $(this)
                     .parent()
                     .find("svg")
                     .animate({ opacity: "1" }, "slow");
                  $(this)
                     .parent()
                     .find("svg")
                     .animate({ opacity: "0.1" }, "slow");
                  $(this)
                     .parent()
                     .find("svg")
                     .animate({ opacity: "1" }, "slow");
               }
            }
         });

         if (proceed) {
            //everything looks good! proceed purchase...
            $(".field")
               .find("path")
               .each(function() {
                  $(this).attr("fill", "#3ac569");
               });
            $(".payment").fadeToggle("slow", function() {
               $(".paid").fadeToggle("slow", "linear");
            });
         }
      });
   },

   clearCart: function() {
      this.model.destroy().then(() => {
         this.onDel();
      });
   },
   onDel: function() {
      this.model.fetch();
      this.render();
   },

   editCartQuantity: function() {
      let prev_items = this.model.previous("items");
      let curr_items = this.model.get("items");
      if (prev_items.length > 0) {
         let array = curr_items.filter((item, idx) => {
            Object.keys(item).forEach(key => {
               let prev_item = prev_items[idx];
               console.log(prev_item);
               return item[key] === prev_item[key];
            });
         });
      }
   },
   deleteItem: function(e) {
      let id = parseInt(e.target.dataset.id);
      let items = this.model.get("items");
      let index = items.findIndex(item => item.id === parseInt(id));
      this.model.save({ id: id, item: items[index], remove: true });
   },

   addValue: function(e) {
      let id = parseInt(e.target.dataset.id);
      let items = this.model.get("items");
      let index = items.findIndex(item => item.id === parseInt(id));
      this.model.save({ id: id, item: items[index], remove: false });
   },
   openCart: function(e) {
      $("#cart").width(300);
   },
   closeCart: function(e) {
      $("#cart").width(0);
   },
   render: function() {
      this.$el.html(this.template({ cart: this.model.toJSON() }));
      return this;
   }
});

export default cart;
