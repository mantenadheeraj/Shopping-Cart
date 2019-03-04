import FooterTemplate from "../../templates/layout/footer.template.hbs";
import Handlebars from "handlebars";
var FooterView = Backbone.View.extend({
   el: "#footer",
   template: Handlebars.compile(FooterTemplate),
   initialize: function() {},
   render: function() {
      this.$el.html(this.template({}));
   }
});
export default FooterView;
