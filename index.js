const express = require("express");
require("dotenv").config();

// settings
const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});
// Cargar archivo de rutas
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);


// server listening
app.listen(port, () => console.log("Server listening to", port));