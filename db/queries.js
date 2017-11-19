const knex = require('./knex');

module.exports = {
  getAllMovies() {
    return knex('movies');
  },
  getWatchedMovies() {
    return knex('movies').where('movies.watched', 'yes')
  },
  getWantToWatchMovies() {
    return knex('movies').where('movies.want_to_watch', 'yes')
  },
  getOneMovie(id) {
    return knex('movies').where('id', id).first();
  },
  addMovieToDatabase(movie) {
    return knex('movies').insert(movie, '*');
  },
  removeMovie(id) {
    return knex('movies').where('id', id).del();
  }
}
