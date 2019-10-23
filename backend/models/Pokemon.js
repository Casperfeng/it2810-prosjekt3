const mongoose = require('mongoose');

const PokemonSchema = mongoose.Schema({
    id: Number,
    name: String,
    types: Array,
    stats: Array,
    views: Number,
})

module.exports = Pokemon = mongoose.model('pokemon', PokemonSchema, 'pokemon');