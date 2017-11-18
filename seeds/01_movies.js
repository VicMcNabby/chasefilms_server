const movies = require('./seeds-data/movies')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE movies RESTART IDENTITY CASCADE;')
    .then(function() {
      return knex('movies').insert(movies);
    });
};
