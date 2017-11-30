exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('poster_url');
    table.text('overview');
    table.text('tagline');
    table.integer('movie_db_id').unique().notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('movies');
};
