// Imports
// const db = require('../connections/demo_db_connection');

const fs = require('fs');
const rootDir = require('../util/rootDir')
const path = require('path');

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
     constructor(title, imageUrl, price, content) {
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.price = parseFloat(price); // For some reason, the price is not a number, hes a free man!
    }
    // file working
    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
             console.log(err);
            });
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

    // save() {
    //     return db.execute(
    //         'INSERT INTO tester (title, content) VALUES (?, ?)', [this.title, this.content]
    //     );
    // }
    // static fetchAll() { 
    //     return db.execute('SELECT title, content FROM `heroku_3f91cda5aaca95a`.`tester`')
    // };
}
