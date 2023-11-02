const fs = require("fs");

class ProductManager {
  constructor(rutaArchivo) {
    this.path = rutaArchivo;
  }

 async getProductsAsync() {
  if (fs.existsSync(this.path)) {
      return JSON.parse( await fs.promises.readFile(this.path, "utf-8"));
    } else {
      return []; 
    }
  }
 
   async addProductAsync(title, description, price, thumbnail, code, stock) {
    let productos = await this.getProductsAsync();

   
   
   
    let existeCodigo = productos.find((producto) => { 
      return producto.code === code;
    });  
    if (existeCodigo) {
      console.log(`El producto con code = ${code} ya existe en
      la base de datos`);
      return;
    }
    
    
    let id=1
    
    
    if(productos.length>0){
        id=productos[productos.length-1].id +1
    }

     

  

    
    let producto ={
      id: id,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };


// Valida si todos los campos están completos
if (Object.values(producto).includes(undefined)) {
  console.log("Todos los campos son obligatorios. El producto no se ha agregado.");
  return;
}

productos.push(producto);
 await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 5));

console.log("Producto agregado con éxito.");

  }

// BuscarPorId///////7//

   async getProductByIdAsync(id) {
    let productos = await this.getProductsAsync();
  
    let indice = productos.findIndex((producto) => {
      return producto.id === id;
    });
  
    if (indice === -1) {
      console.log(`No se encontró un producto con el ID ${id} Not Found`);
      return;
    }
  
    return productos [indice];
  }
  
  //Borrar//////

   async deleteProductAsync(id) {
    let productos = await  this.getProductsAsync();

   ////////////////////77//////

    let indice = productos.findIndex((producto) => {
      return producto.id === id;  
    } );
  
    if (indice === -1) {
      console.log(`No se encontró un producto con el ID ${id} para eliminar.`);
      return;
    }
  
    productos.splice(indice, 1);

     await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 5));
    console.log(`Producto con el ID ${id} eliminado exitosamente.`);
  }

  //Actualizo producto////

   async updateProductAsync(id, objeto) {
    let productos = await  this.getProductsAsync();
  
    ////////
    
    let indice = productos.findIndex((producto) => {
      return producto.id === id;
    });
  
    if (indice === -1) {
      console.log(`No se encontró un producto con el ID ${id} para actualizar.`);
      return;
    }


    



   
  
//validaciones////

const validarObjeto = (obj) => {
  return obj === Object(obj);
};

const objetoValidado = validarObjeto(objeto);

if (!objetoValidado) {
  console.log("El valor proporcionado no es un objeto válido.");
  return;
}

/////////////////


const verificarCamposLlenos = (obj) => {
  if (Object.values(obj).length === 0) {
    console.log("Debe ingresar al menos un campo con su respectivo valor.");
    return;
  }
};

verificarCamposLlenos(objeto);

////////////////

const objetoClaves = Object.keys(objeto);

const productosClaves = Object.keys(productos[0]);

try {
  objetoClaves.forEach((clave) => {
    let indiceClave = productosClaves.includes(clave)

    if (!indiceClave) {
        console.log(`El campo ${clave} no existe en la base de datos.`);
        throw `Error en el campo`;
    }
}) 
} catch (error) {
  console.log(error.message);
  
}


productos[indice]={
  ...productos[indice],
  ...objeto,
  id,
};

 await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 5))

}

}




//////////////////
  
  
  module.exports = ProductManager; 