const express = require("express");

const ProductManager = require("./ProductManager");

const path = require("path");

console.clear();

const PORT = 3000;

const app = express();

let archivo = path.join(__dirname, "../../archivos", "archivo.json");
console.log(__dirname);

const productosArchivo = new ProductManager(archivo);
let productos = [];

const iniciarServer = async () => {
  try {
    productos = await productosArchivo.getProductsAsync();

    if (productos.length === 0) {
      console.log("Productos no encontrados");
      return;
    }

    app.get("/", (req, res) => {
      res.send("Hola!!! Soy un servidor Express");
    });

    app.get("/products", (req, res) => {
      let resultado = productos;

      if (req.query.limit) {
        resultado = resultado.slice(0, req.query.limit);
      }
      res.setHeader("Content-type", "application/json");
      res.status(200).json({ filtros: req.query, resultado });
    });

    app.get("/products", (req, res) => {
      let resultado = productos;

      if (req.query.limit) {
        const limit = parseInt(req.query.limit);
        if (isNaN(limit) || limit < 0) {
          return res.status(400).json({ filtros: req.query, resultado });
        }

        resultado = resultado.slice(0, limit);
      }

      res.setHeader("Content-type", "application/json");
      res.status(200).json({ filtros: req.query, resultado });
    });

    app.get("/products/:id", (req, res) => {
      let id = req.params.id;
      id = parseInt(id);

      if (isNaN(id)) {
        return res.status(400).json({ error: "Error, ingrese un id numérico" });
      }

      let resultado2 = productos.find((producto) => {
        return producto.id === id;
      });

      if (!resultado2) {
        return res.status(404).json({ error: "Error, producto no encontrado" });
      }

      res.setHeader("Content-type", "application/json");
      res.status(200).json(resultado2);
    });

    app.listen(PORT, () => {
      console.log(`Servidor en linea en puerto ${PORT}`);
    });
  } catch (error) {
    console.log("Se ha producido el siguiente error", error.message);
  }
};

iniciarServer();
