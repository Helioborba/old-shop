// Imports

const db = require('../connections/demo_db_connection'); // Conexao com a DB
// file working
const fs = require('fs');
const rootDir = require('../util/rootDir')
const path = require('path');
//cart
const cart = require('./cart')

// place where JSON will be stored
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
        return db.execute('insert into (title,price,content,imageUrl) value (?,?,?,?)', 
        [this.title, this.price, this.content, this.imageUrl]
        );
    }

    // file working
    static fetchAll() { 
        return db.execute('select * from shop');
    };
    
    static findById(id) { 
        return db.execute('select * from shop where shop.id=?', 
        [id]);
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
