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
        } else { // Try catch por causa que se não existir o JSON, da bug
            try {
                cb(JSON.parse(fileContent));
            } catch (err) {
                console.log(err);
                cb([]);
            }
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
        getProductsFromFile(products => {
            if( this.id ) {
                const existProductIndex = products.findIndex( prod => prod.id === this.id ); // procurar indice do objeto
                const updatedProduct = [...products]; // atribuir todos os valores previamente setados
                updatedProduct[existProductIndex] = this; // atribuir NOVOS valores ao novo indice 
                console.log('heree')
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

    // save() {
    //     return db.execute(
    //         'INSERT INTO tester (title, content) VALUES (?, ?)', [this.title, this.content]
    //     );
    // }
    // static fetchAll() { 
    //     return db.execute('SELECT title, content FROM `heroku_3f91cda5aaca95a`.`tester`')
    // };
}
