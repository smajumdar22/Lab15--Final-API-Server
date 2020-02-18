'use strict';

const mongoose = require('mongoose');

const product = mongoose.Schema({
          category_id: { type: 'string', required: true },
          price: { type: 'number', required: true },
          weight: { type: 'number' },
          quantity: { type: 'number', required: true },
  });
  
module.exports = mongoose.model('product', product);
