// server.js
const jsonServer = require("json-server");
const fs = require("fs");
const server = jsonServer.create();
const router = jsonServer.router("./server/db.json");
const middlewares = jsonServer.defaults();
const db = JSON.parse(fs.readFileSync("./server/db.json", "UTF-8"));
server.use(middlewares);
server.use(
   jsonServer.rewriter({
      "/api/*": "/$1",
      "/cart/:id": "/cart?id=:id"
   })
);

server.get("/cart", (req, res) => {
   return res.jsonp(db.cart);
});

server.use(jsonServer.bodyParser);
server.post("/cart", (req, res) => {
   try {
      let new_item = req.body.item;
      let index = db.cart.items.findIndex(item => item.id === new_item.id);
      if (index < 0) {
         db.cart.items.push({
            id: new_item.id,
            image: new_item.image,
            price: new_item.price,
            quantity: 1
         });
         db.cart.quantity += 1;
         db.cart.total_price += new_item.price;
      } else {
         db.cart.items[index].quantity += 1;
         db.cart.quantity += 1;
         db.cart.total_price += new_item.price;
      }

      fs.writeFileSync("./server/db.json", JSON.stringify(db));
   } catch (e) {
      console.log(e);
   }
   res.jsonp(db.cart);
});

server.put("/cart", (req, res) => {
   let remove = req.body.remove;
   let new_item = req.body.item;
   let index = db.cart.items.findIndex(item => item.id === new_item.id);
   try {
      if (remove) {
         if (db.cart.items[index].quantity > 1) {
            db.cart.items[index].quantity -= 1;
            db.cart.quantity -= 1;
            db.cart.total_price -= new_item.price;
         } else {
            db.cart.items.splice(index, 1);
            db.cart.total_price -= new_item.price;
            db.cart.quantity -= 1;
         }
      } else {
         if (index === -1) {
            db.cart.items.push({
               id: new_item.id,
               image: new_item.image,
               price: new_item.price,
               quantity: 1
            });
            db.cart.quantity += 1;
            db.cart.total_price += new_item.price;
         } else {
            db.cart.items[index].quantity += 1;
            db.cart.quantity += 1;
            db.cart.total_price += new_item.price;
         }
      }
      fs.writeFileSync("./server/db.json", JSON.stringify(db));
   } catch (e) {
      console.log(e);
   }
   return res.jsonp(db.cart);
});

server.delete("/cart", (req, res) => {
   db.cart = {
      items: [],
      quantity: 0,
      total_price: 0,
      checkout: false
   };
   fs.writeFileSync("./server/db.json", JSON.stringify(db));
   return res.jsonp(db.cart);
});

server.use(router);
server.listen(3000, () => {
   console.log("JSON Server is running");
});
