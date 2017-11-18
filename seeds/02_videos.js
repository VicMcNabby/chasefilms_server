const videos = require('./seeds-data/videos')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE videos RESTART IDENTITY CASCADE;')
    .then(function() {
      return knex('videos').insert(videos);
    });
};
