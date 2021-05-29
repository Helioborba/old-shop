// Imports
const fs = require('fs');
const rootDir = require('../util/rootDir')
const path = require('path');

const p = path.join(
  rootDir,
  'data',
  'cart.json'
);

// const getProductsFromFile = cb => {
//     fs.readFile(p, (err, fileContent) => {
//         if (err) {
//             cb([]);
//         } else {
//          cb(JSON.parse(fileContent));
//         }
//     });
// };

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
                        // check if json works
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // start operations
            const existProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existProduct = cart.products[existProductIndex];
            let updatedProduct;
            if (existProduct) {
                updatedProduct = {...existProduct};
                updatedProduct.qty = updatedProduct.qty + 1; 
                cart.products = [...cart.products];
                cart.products[existProductIndex] = updatedProduct;
            } else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        })
    }
}

// module.exports = class Cart {
//     static addProduct(id, productPrice) {
//       // Fetch the previous cart
//       fs.readFile(p, (err, fileContent) => {
//         let cart = { products: [], totalPrice: 0 };
//         if (!err) {
//           cart = JSON.parse(fileContent);
//         }
//         // Analyze the cart => Find existing product
//         const existingProductIndex = cart.products.findIndex(
//           prod => prod.id === id
//         );
//         const existingProduct = cart.products[existingProductIndex];
//         let updatedProduct;
//         // Add new product/ increase quantity
//         if (existingProduct) {
//           updatedProduct = { ...existingProduct };
//           updatedProduct.qty = updatedProduct.qty + 1;
//           cart.products = [...cart.products];
//           cart.products[existingProductIndex] = updatedProduct;
//         } else {
//           updatedProduct = { id: id, qty: 1 };
//           cart.products = [...cart.products, updatedProduct];
//         }
//         cart.totalPrice = cart.totalPrice + +productPrice;
//         fs.writeFile(p, JSON.stringify(cart), err => {
//           console.log(err);
//         });
//       });
//     }
//   };