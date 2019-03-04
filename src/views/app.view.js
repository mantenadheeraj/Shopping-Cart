import AppTemplate from "../templates/app.template.hbs";
import Handlebars from "handlebars";
var AppView = Backbone.View.extend({
   el: "#app",
   template: Handlebars.compile(AppTemplate),
   initialize: function() {},
   render: function() {
      this.$el.html(this.template({}));
      import("./layout/header.view").then(module => {
         let header_view = new module.default();
         header_view.render();
      });
      import("./layout/footer.view").then(module => {
         let footer_view = new module.default();
         footer_view.render();
      });
      return this;
   }
});
export default AppView;
