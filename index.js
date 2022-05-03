const http = require('http');
const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Productos = require('./Productos.js');

const Producto = new Productos('productos.json');

let messagesArr = [];
const arrayProd = require('./productos.json');

app.use(express.json());
app.use(express.urlencoded());

const routes_back = require('./routes_back.js');
app.use("/api/productos", routes_back);

const routes_front = require('./routes_front.js');
app.use('', routes_front)


io.on('connection', function(socket) {
   // console.log(messagesArr)
   socket.emit('listProducts', arrayProd);
   socket.emit('listMessages', messagesArr);

   socket.on('messages', data => {
      messagesArr.push(data);
      io.sockets.emit('listMessages', messagesArr);
   });

   //Guardar productos
   socket.on('newProduct', data => {
      Producto.save(data).then(result => {
         // console.log(result)
         if (result !== undefined) {
            io.sockets.emit('listProducts', arrayProd);
         } else {
            io.sockets.emit('listProducts', arrayProd);
         }
     });
   });


});



server.listen(port, () => {
   console.log(`Aplicación ejecutandose en el puerto: ${port}`);
});
