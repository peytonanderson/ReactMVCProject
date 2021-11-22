const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let DomoModel = {};

// convert string id to mongo id
const convertId = mongoose.Types.ObjectId;

const DomoSchema = new mongoose.Schema({
  age: {
    type: Number,
    min: 0,
    required: true,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },

  color: {
    type: String,
    trim: true,
  },

  x: {
    type: Number,
  },

  y: {
    type: Number,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return DomoModel.find(search).select('name age').lean().exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
