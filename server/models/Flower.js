const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let FlowerModel = {};

// convert string id to mongo id
const convertId = mongoose.Types.ObjectId;

const FlowerSchema = new mongoose.Schema({
  age: {
    type: Number,
    min: 0.0,
    required: true,
  },

  createdDate: {
    type: Date,
    default: new Date(),
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

FlowerSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
});

FlowerSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return FlowerModel.find(search).select('name age color x y').lean().exec(callback);
};

FlowerModel = mongoose.model('Flower', FlowerSchema);

module.exports.FlowerModel = FlowerModel;
module.exports.FlowerSchema = FlowerSchema;
