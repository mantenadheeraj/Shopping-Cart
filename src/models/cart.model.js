let Cart = Backbone.Model.extend({
   defaults: {
      items: [],
      quantity: 0,
      total_price: 0,
      shipping: 9.5,
      checkout: false,
      id: 1
   },
   urlRoot: "http://localhost:3000/cart"
});

export default Cart;
