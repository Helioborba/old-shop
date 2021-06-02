// Imports
// const db = require('../connections/demo_db_connection');

const fs = require('fs');
const rootDir = require('../util/rootDir')
const path = require('path');
const cart = require('./cart')
const p = path.join(
  rootDir,
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
};

module.exports = class Products {
     constructor(id, title, imageUrl, price, content) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.price = parseFloat(price); // For some reason, the price is not a number, hes a free man!
    }
    // file working
    save() {
        getProductsFromFile( products => {
            if( this.id ) {
                const existProductIndex = products.findIndex( prod => prod.id === this.id ); // procurar indice do objeto
                const updatedProduct = [...products]; // atribuir todos os valores do arquivo JSON
                updatedProduct[existProductIndex] = this; // atribuir NOVOS valores ao novo indice 
                fs.writeFile(p, JSON.stringify(updatedProduct), err => {
                    console.log(err)
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                });
            };
        });
    }

     // file working
    static fetchAll(cb) { 
        getProductsFromFile(cb);
    };

    static findById(id, cb) { 
        getProductsFromFile((products) => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    };

    static delete(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id); // used for the price

            const updatedProduct = products.filter( prod => prod.id !== id ); // procurar indice do objeto
            console.log(id);
            
            fs.writeFile(p, JSON.stringify(updatedProduct), err => {
                if(!err) {
                    cart.deleteProduct(id, product.price); // price
                }
            });
        });
    }

    // save() {
    //     return db.execute(
    //         'INSERT INTO tester (title, content) VALUES (?, ?)', [this.title, this.content]
    //     );
    // }
    // static fetchAll() { 
    //     return db.execute('SELECT title, content FROM `heroku_3f91cda5aaca95a`.`tester`')
    // };
}
