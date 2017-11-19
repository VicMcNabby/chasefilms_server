exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_movies', (table) => {
    table.increments('id').primary();
    table.integer('users_id').references('users.id').unsigned().onDelete('cascade');
    table.integer('movie_id').references('movies.id').unsigned().onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('user_movies');
};