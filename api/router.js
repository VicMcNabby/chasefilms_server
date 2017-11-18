const queries = require('../db/queries');
const express = require('express');

const router = express.Router();

router.get('/movies', (req, res, next) => {
  queries.getAllMovies().then(movies => {
    res.json(movies);
  });
});

router.get('/movie/:id', (req, res) => {
  queries.getOneMovie(req.params.id).then(movieId => {
    res.json(movieId)
  })
})

router.post('/movies', (req, res, next) => {
  queries.addMovieToList(req.body).then(response => {
    res.json(response)
  })
})

router.delete('/movie/:id', (req, res, next) => {
  queries.deleteMovie(req.params.id).then(response => {
    res.json({
      "message": "deleted"
    })
  })
})

module.exports = router;
