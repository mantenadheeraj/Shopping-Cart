import Handlebars from "handlebars";
export default Handlebars.registerHelper("multiply", function(a, b) {
   var grandTotal = a * b;
   return Math.abs(grandTotal);
});
