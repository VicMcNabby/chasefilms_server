const knex = require('./knex');

module.exports = {
  createUser(user) {
    return knex('users').insert(user, '*');
  },
  getUserByEmail(email) {
    return knex('users').where('email', email).first();
  },
  getAllMovies() {
    return knex('movies');
  },
  getMoviesByUserId(id) {
    return knex('movies').where('users_id', id)
      .join('user_movies', 'movie_id', '=', 'movies.id');
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
