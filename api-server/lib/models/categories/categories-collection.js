'use strict';

const schema = require('./categories-schema.js');

const MongoCollection =  require('../collection.js');


class CategoryCollection extends MongoCollection {}

module.exports = new CategoryCollection(schema);
