describe("cartModel", function() {
   it("url should be /cart", function() {
      var cart = new Cart();
      expect(cart.urlRoot).toEqual("http://localhost:8080/cart");
   });
});
