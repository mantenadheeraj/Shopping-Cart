import Handlebars from "handlebars";
export default Handlebars.registerHelper("toFixed", function(a) {
   return a.toFixed(2);
});
