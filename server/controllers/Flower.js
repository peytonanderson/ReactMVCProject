const models = require('../models');

const { Flower } = models;

const colors = {
  PINK: 'pink',
  BLUE: 'blue',
  YELLOW: 'yellow',
  ORANGE: 'orange',
};

const makerPage = (req, res) => {
  Flower.FlowerModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), flowers: docs });
  });
};

const makeFlower = (req, res) => {
  const flowerData = {
    age: 0,
    createdDate: Date.now(),
    color: colors[Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)]],
    x: req.body.x,
    y: req.body.y,
    owner: req.session.account._id,
  };

  const newFlower = new Flower.FlowerModel(flowerData);

  const flowerPromise = newFlower.save();

  flowerPromise.then(() => res.json({ redirect: '/maker' }));

  flowerPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Flower already exists' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return flowerPromise;
};

const getFlowers = (req, res) => Flower.FlowerModel.findByOwner(
  req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ flowers: docs });
  },
);

module.exports.makerPage = makerPage;
module.exports.make = makeFlower;
module.exports.getFlowers = getFlowers;
