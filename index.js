const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);
// const io = require('socket.io').listen(server);
/* conexion */
io.removeAllListeners("Chofer");
io.on("connection", socket => {
	var historial = [];

	console.log("conexion con cliente socket");

	/* oyente del coordinate */
	socket.on("Chofer", data => {
		io.emit("Chofer", {latitude:data.latitude,longitude:data.longitude});
		console.log( data + " Chofer");
	});

	socket.on("isActive", data => {
		io.emit("isActive", data);
		console.log(" isActive ", data);
	});
});

/* estableciendo conexion al servidor */
app.set("port", process.env.PORT || 3000);
/* tama���o de solicitudes  */
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "150mb" }));
app.use(
	bodyParser.urlencoded({
		limit: "150mb",
		extended: true,
		parameterLimit: 150000,
	})
);
/* inicio servidor */
server.listen(app.get("port"), (req, res) => {
	console.log("servidor activado");
});
