exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('poster_url');
    table.text('overview');
    table.text('tagline');
    table.integer('rating');
    table.text('movie_db_id');
    table.text('imdb');
    table.text('homepage');
    table.string('watched');
    table.string('want_to_watch');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('movies');
};
