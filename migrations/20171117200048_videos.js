exports.up = function(knex, Promise) {
  return knex.schema.createTable('videos', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('video_url');
    table.integer('movie_id').references('movies.id').unsigned().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('videos');
};
