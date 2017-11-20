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
  deleteUserById(id) {
    return knex('users').where('id', id).del()
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
      .join('user_movies', 'movie_id', '=', 'movies.id');
  },
  getWantToWatchMovies(id) {
    return knex('movies').where('users_id', id).where('user_movies.want_to_watch', 'yes')
      .join('user_movies', 'movie_id', '=', 'movies.id');
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
