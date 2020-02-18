'use strict';


class Collection {


  constructor(schema) {
    this.schema= schema;
  }

  get(id) {
  return id ? this.schema.findById(id) : this.schema.find({});
//   if (id){
//       return this.schema.findById(id);
//   }else{
//       return this.schema.find({};)
//   }
  }

  create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  update(id, record) {
    return this.schema.findByIdAndUpdate(id, record, { new: true });// new :true returns back a single record
  }

  delete(id) {
    return this.schema.findByIdAndDelete(id);
  }
}

module.exports = Collection;
