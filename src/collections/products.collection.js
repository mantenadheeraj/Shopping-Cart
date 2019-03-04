import ProductModel from "../models/product.model";
const ProductCollection = Backbone.Collection.extend({
   model: ProductModel,
   url: "http://localhost:3000/products",
   comparatorFunctions: {
      low_to_high: function(model) {
         return model.get("price");
      },
      high_to_low: function(model) {
         return -model.get("price");
      }
   },
   selectedcomparator: "low_to_high",
   comparator: function(model) {
      return this.comparatorFunctions[this.selectedcomparator](model);
   }
});

export default ProductCollection;
