'use strict';

const server = require('../../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const agent= supergoose(server.apiServer);
const categories = require('../models/categories/categories-collection.js');
const products = require('../models/products/products-collection.js');

describe('API Test for categoty', () => {

  // beforeEach(() => {

  // })

  describe('Category Model', () => {
    it('can create() a record', () => {
      let obj = { name: 'Appliances' };
      return category.create(obj)
        .then(record => {
          Object.keys(obj).forEach(key => {
            expect(record[key]).toEqual(obj[key])
          });
        })
    });
    it('can get() records', () => {
      let obj = { name: 'Appliances'};
      return category.create(obj)
        .then(() => category.get())
        .then(data => {
          expect(data.length >= 1).toBeTruthy();
        })
        .catch(console.error);
    })
  })
 
  it('can post a category', () =>{

    let item = {name: 'Electronics'};
    return agent.post('/api/v1/category')
       .send(item)
       .then(response => {
         expect(response.statusCode).toBe(200);
         expect(response.body.id).toBeDefined();
         expect(response.body.name).toEqual(item.name);
  
       })
       .catch(error =>{
         console.log(error);
         expect(error).not.toBeDefined();
       })
       .catch(error => expect(error).not.toBeDefined());
  });

  it('can get all records',()=>{
    return agent.get('/api/v1/category')
       .then(response => {
         expect(response.statusCode).toBe(200)
         expect(response.body.count).toBeTruthy();
       })
       .catch(error => expect(error).not.toBeDefined())
});

it('can get a record',()=>{
  return agent.get('/api/v1/category/1')
     .then(response => {
       expect(response.statusCode).toBe(200)
     })
     .catch(error => expect(error).not.toBeDefined())
});

it('can update a record',()=>{
  return agent.put('/api/v1/category/1')
     .then(response => {
       expect(response.statusCode).toBe(200)
     })
     .catch(error => expect(error).not.toBeDefined())
});

it('can delete a record',()=>{
  return agent.delete('/api/v1/category/1')
     .then(response => {
       expect(response.statusCode).toBe(200)
     })
     .catch(error => expect(error).not.toBeDefined())
});
});


describe('Product Model', () => {
  it('can create() a record', () => {
    let obj = { id:'12345',category_id: 'Electronics', price: 70, weight: 50, quantity: 2 };
    return product.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key])
        });
      })
  });
  it('can get() records', () => {
    let obj = { id:'12345',category_id: 'Electronics', price: 70, weight: 50, quantity: 2 };
    return product.create(obj)
      .then(() => product.get())
      .then(data => {
        expect(data.length >= 1).toBeTruthy();
      })
      .catch(console.error);
  })
})

describe('API Test for Product', () => {

  beforeEach(() => {

  })
  let item = {
    category_id: "Electronics",
    price: 50,
    weight: 100,
    quantity:2
  };
  
  it('can post a product', () => {

    return agent.post('/api/v1/product')
       .send(item)
       .then(response => {
         expect(response.statusCode).toBe(200);
         expect(response.body.id).toBeDefined();
         expect(response.body.category_id).toEqual(item.category_id);
         expect(response.body.price).toEqual(item.price);
         expect(response.body.weight).toEqual(item.weight);
         expect(response.body.quantity).toEqual(item.quantity);
        
  
  
       })
       .catch(error =>{
         console.log(error);
         expect(error).not.toBeDefined();
       })
  })

  it('can get all records',()=>{
    return agent.get('/api/v1/product')
       .then(response => {
         expect(response.statusCode).toBe(200)
         expect(response.body.count).toBeTruthy();
       })
       .catch(error => expect(error).not.toBeDefined())
});

it('can get a record',()=>{
  return agent.get('/api/v1/product/1')
     .then(response => {
       expect(response.statusCode).toBe(200)
     })
     .catch(error => expect(error).not.toBeDefined())
});

it('can update a record',()=>{
  return agent.put('/api/v1/product/1')
     .then(response => {
       expect(response.statusCode).toBe(200)
     })
     .catch(error => expect(error).not.toBeDefined())
});

it('can delete a record',()=>{
  return agent.delete('/api/v1/product/1')
     .then(response => {
       expect(response.statusCode).toBe(200)
     })
     .catch(error => expect(error).not.toBeDefined())
});
});
