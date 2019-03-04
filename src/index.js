import $ from "jquery";
import _ from "underscore";
import Backbone from "backbone";
import AppView from "./views/app.view";
import ProductCollection from "./collections/products.collection";
import IndexView from "./views/index.view";
import "../assets/css/main.scss";
import CartView from "./views/cart.view";
import CheckoutView from "./views/checkout.veiw";
import Cart from "./models/cart.model";

var app_view = new AppView();
app_view.render();

var products = new ProductCollection();
products.fetch();

var cart = new Cart();
cart.fetch();

let cart_view = new CartView({ model: cart });

let checkout_view = new CheckoutView({ model: cart });

let index_view = new IndexView({ model: products, model1: cart });

$("#main").html(index_view.render().$el);
cart_view.render();
checkout_view.render();
