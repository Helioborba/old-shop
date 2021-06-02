// Imports
const Product = require('../models/products');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render('shop/product-detail', {
      product : product,
      pageTitle : 'Product-detail',
      path: '/products'
    });
  });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.fetchCart(cart => {
    Product.fetchAll(
      products => {
        const filteredProds = [];
        for (product of products) {
          const cartProductFind = cart.products.find(prod => prod.id === product.id); 
          if (cartProductFind) {
            filteredProds.push({ productData : product, qty : cartProductFind.qty});
          }
        }
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          prods : filteredProds
        });
      }
    )
  }); 
};

exports.postCart = (req, res, next) => {
  const id = req.body.productId;
  Product.findById(id, (product) => {
    Cart.addProduct(id, product.price);
  })
  res.redirect('/cart');
}

exports.postCartRemoveItem = (req, res, next) => {
  const id = req.body.productId;
  Product.findById(id, (product) => {
    Cart.deleteProduct(id, product.price);
    res.redirect('/cart');
  })
  
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};





// TEMP is a TEST type of page, DON'T use it for other purposes else code bugs will arise
exports.getTemp = (req, res, next) => {
  Product.findById('0.4801459024351582', product => {
    const numero = '10';
    res.render('shop/temp', {
      path: '/temp',
      pageTitle: 'Test page',
      test: numero
    });
  })
};
