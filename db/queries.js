const knex = require('./knex');

module.exports = {
  getAllMovies() {
    return knex('movies');
  },
  getOneMovie(id) {
    return knex('movies').where('id', id).first();
  },
  addMovieToList(movie) {
    return knex('movies').insert(movie, '*');
  },
  deleteMovie(id) {
    return knex('movies').where('id', id).del();
  }
}
