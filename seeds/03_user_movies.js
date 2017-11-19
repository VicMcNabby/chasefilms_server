const user_movies = require('./seeds-data/user_movies')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE user_movies RESTART IDENTITY CASCADE;')
    .then(function() {
      return knex('user_movies').insert(user_movies);
    });
};
