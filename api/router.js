const queries = require('../db/queries');
const express = require('express');

const router = express.Router();

router.get('/movies', (req, res, next) => {
  queries.getAllMovies().then(movies => {
    res.json(movies);
  });
});

router.get('/movies/watched', (req, res, next) => {
  queries.getWatchedMovies().then(movies => {
    res.json(movies);
  });
});

router.get('/movies/want_to_watch', (req, res, next) => {
  queries.getWantToWatchMovies().then(movies => {
    res.json(movies);
  });
});

router.get('/movies/:id', (req, res) => {
  queries.getOneMovie(req.params.id).then(movieId => {
    res.json(movieId)
  })
})

router.post('/movies', (req, res, next) => {
  queries.addMovieToDatabase(req.body).then(response => {
    res.json(response)
  })
})

router.delete('/movies/:id', (req, res, next) => {
  queries.removeMovie(req.params.id).then(response => {
    res.json({
      "message": "removed"
    })
  })
})

module.exports = router;
