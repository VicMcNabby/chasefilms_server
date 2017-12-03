const knex = require('./knex');

module.exports = {
  createUser(user) {
    return knex('users').insert(user, '*');
  },
  getUserByEmail(email) {
    return knex('users').where('email', email).first();
  },
  getAllUsers() {
    return knex('users');
  },
  getAllUserMovies() {
    return knex('user_movies');
  },
  deleteUserById(id) {
    return knex('users').where('id', id).del()
  },
  addUserMovie(movie) {
    return knex('user_movies').insert(movie, '*');
  },
  getAllMovies() {
    return knex('movies');
  },
  getMoviesByUserId(id) {
    return knex('movies').where('users_id', id)
      .join('user_movies', 'movie_id', '=', 'movies.id');
  },
  getWatchedMovies(id) {
    return knex('movies').where('users_id', id).where('user_movies.watched', 'yes')
      .join('user_movies', 'moviedb_id', '=', 'movies.movie_db_id');
  },
  getWantToWatchMovies(id) {
    return knex('movies').where('users_id', id).where('user_movies.want_to_watch', 'yes')
      .join('user_movies', 'moviedb_id', '=', 'movies.movie_db_id');
  },
  // getUserMovieByMovieId(id, movieId) {
  //   return knex('movies').where('users_id', id).where('movie_db_id', movieId).first()
  // },
  getOneMovie(id) {
    return knex('movies').where('id', id).first();
  },
  addMovieToDatabase(movie) {
    return knex('movies').insert(movie, '*');
  },
  removeMovie(id) {
    return knex('movies').where('id', id).del();
  },
  removeUserMovie(id) {
    return knex('user_movies').where('id', id).del();
  }
}
