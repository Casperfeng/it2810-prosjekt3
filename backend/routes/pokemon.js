const express = require('express');
const router = express.Router();
const Pokemon = require('../models/Pokemon');

// Get a single pokemon by id
router.get('/:pokemonId', async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ id: req.params.pokemonId });
    res.json([pokemon]);
  } catch (err) {
    res.json({ message: err });
  }
});

// Increment views on a pokemon
router.put('/:pokemonId', async (req, res) => {
  try {
    const updatedPokemon = await Pokemon.updateOne(
      { id: req.params.pokemonId },
      { $inc: { views: 1 } }
    );
    res.json(updatedPokemon);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get upto 25 pokemon
// Query parameters;
//  skip: skip a given amount of pokemon
//  name: get pokemon with name containing name
//  sort: sort by given field in either ascending or descending order
//  type${x}: get pokemon with given type
//  limit: set limit to none to get all pokemon. Otherwise the default is 25.
router.get('/', async (req, res) => {
  try {
    const types = [];
    const skipAmount = req.query.skip ? parseInt(req.query.skip) : 0;
    const name = req.query.name ? req.query.name.toLocaleLowerCase() : '';
    const limitAmount =
      req.query.limit && req.query.limit === 'none' ? 151 : 25;
    const sort = {};
    const filter = {};

    for (const key of Object.keys(req.query)) {
      if (key.startsWith('type')) {
        types.push(req.query[key]);
      } else if (key === 'sort') {
        const value = req.query[key];
        const isDESC = value.endsWith('DESC');
        if (value.startsWith('name')) {
          sort.name = isDESC ? -1 : 1;
        } else if (value.startsWith('id')) {
          sort.id = isDESC ? -1 : 1;
        } else if (value.startsWith('views')) {
          sort.views = isDESC ? -1 : 1;
        }
      }
    }

    if (types.length !== 0) {
      filter.$and = [
        { types: { $in: types } },
        {
          name: {
            $regex: name,
            $options: 'i'
          }
        }
      ];
    } else {
      filter.name = {
        $regex: name,
        $options: 'i'
      };
    }

    const pokemon = await Pokemon.find(filter)
      .sort(sort)
      .skip(skipAmount)
      .limit(limitAmount);
    res.json(pokemon);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
