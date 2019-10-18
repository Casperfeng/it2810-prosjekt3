const express = require('express');
const router = express.Router();
const Pokemon = require('../models/Pokemon');

// Get all pokemon
router.get('/', async (req, res) => {
  try {
    const pokemon = await Pokemon.find();
    res.json(pokemon);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get a single pokemon by id
router.get('/:pokemonId', async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ id: req.params.pokemonId });
    res.json([pokemon]);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get multiple pokemon by name (as long as it contains it in its name)
router.get('/search/:pokemonName', async (req, res) => {
  try {
    const pokemon = await Pokemon.find({
      name: {
        $regex: req.params.pokemonName.toLocaleLowerCase(),
        $options: 'i'
      }
    });
    res.json(pokemon);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
