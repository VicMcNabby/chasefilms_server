const queries = require('../db/queries');
const express = require('express');
const bcrypt = require('bcrypt');
const valid = require('./validate');
const jwt = require('jsonwebtoken');
// const authMiddleware = require('../auth/middleware');

const router = express.Router();

router.post('/auth/login', (req, res, next) => {
  if (valid.user(req.body)) {
    queries.getUserByEmail(req.body.email).then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then(result => {
          if (result) {
            jwt.sign({
              id: user.id
            }, process.env.TOKEN_SECRET, (err, token) => {
              console.log(err, token);
              res.json({
                //message: `Logged in as ${user.name}.`,
                token,
                id: user.id
              });
            });
          } else {
            next(new Error("Password Incorrect"))
          }
        });
      } else {
        next(new Error("Email Not Found"))
      }
    });
  } else {
    next(new Error("Invalid Email/Password"))
  }
});

router.post('/users', (req, res, next) => {
  if (valid.user(req.body)) {
    queries.getUserByEmail(req.body.email).then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10)
          .then((hash) => {
            let user = {
              name: req.body.name,
              email: req.body.email,
              password: hash
            };
            queries.createUser(user).then(user => {
              res.json({
                message: "Success",
                user
              });
            });
          });
      } else {
        next(new Error("Email in use"));
      }
    });
  } else {
    next(new Error("Invalid Password"));
  }
});

router.get('/users', (req, res, next) => {
  queries.getAllUsers().then(users => {
    res.json(users)
  });
});

router.delete('/users/:id', (req, res, next) => {
  queries.deleteUserById(req.params.id).then(response => {
    res.json({
      "message": "user deleted"
    });
  });
});

router.get('/movies', (req, res, next) => {
  queries.getAllMovies().then(movies => {
    res.json(movies);
  });
});

router.get('/user_movies', (req, res, next) => {
  queries.getAllUserMovies().then(movies => {
    res.json(movies);
  });
});

router.get('/users/:id/movies', (req, res) => {
  // if (!isNaN(req.params.id)) {
  queries.getMoviesByUserId(req.params.id).then(movies => {
    res.json(movies);
  });
  // } else {
  //   res.Error(res, 500, "Invalid ID");
  // }
});

router.get('/users/:id/movies/watched', (req, res, next) => {
  queries.getWatchedMovies(req.params.id).then(movies => {
    res.json(movies);
  });
});

router.get('/users/:id/movies/want_to_watch', (req, res, next) => {
  queries.getWantToWatchMovies(req.params.id).then(movies => {
    res.json(movies);
  });
});

router.get('/movies/:id', (req, res) => {
  queries.getOneMovie(req.params.id).then(movieId => {
    res.json(movieId)
  });
});

router.post('/movies', (req, res, next) => {
  queries.addMovieToDatabase(req.body).then(response => {
    res.json(response)
  });
});

router.post('/user_movies', (req, res, next) => {
  queries.addUserMovie(req.body).then(response => {
    res.json(response)
  });
});

router.delete('/movies/:id', (req, res, next) => {
  queries.removeMovie(req.params.id).then(response => {
    res.json({
      "message": "removed"
    });
  });
});

router.delete('/user_movies/:id', (req, res, next) => {
  queries.removeUserMovie(req.params.id).then(response => {
    res.json({
      "message": "removed"
    });
  });
});

module.exports = router;
