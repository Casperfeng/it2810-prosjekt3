const express = require("express");
const router = express.Router();
const Pokemon = require("../models/Pokemon");

// Get all pokemon
router.get("/all", async (req, res) => {
  try {
    const pokemon = await Pokemon.find();
    res.json(pokemon);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get a single pokemon by id
router.get("/:pokemonId", async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ id: req.params.pokemonId });
    res.json([pokemon]);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get multiple pokemon by name (as long as it contains it in its name)
router.get("/search/:pokemonName", async (req, res) => {
  try {
    const pokemon = await Pokemon.find({
      name: {
        $regex: req.params.pokemonName.toLocaleLowerCase(),
        $options: "i"
      }
    });
    res.json(pokemon);
  } catch (err) {
    res.json({ message: err });
  }
});

// Increment views on a pokemon
router.put("/:pokemonId", async (req, res) => {
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

// Get upto 25 pokemon, skipping given amount of pokemon and filtered by types if given
router.get("/", async (req, res) => {
  try {
    const filter = [];
    const skipAmount = req.query.skip ? parseInt(req.query.skip) : 0;

    for (const key of Object.keys(req.query)) {
      if (key.startsWith("type")) {
        filter.push(req.query[key]);
      }
    }

    if (filter.length == 0) {
      const pokemon = await Pokemon.find()
        .skip(skipAmount)
        .limit(25);
      res.json(pokemon);
    } else {
      const pokemon = await Pokemon.find({
        types: { $in: filter }
      })
        .skip(skipAmount)
        .limit(25);
      res.json(pokemon);
    }
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
