const moviesService = require("./movies.service");

//////////
// CRUD //
//////////

function read(req, res, next) {
  const movie = res.locals.movie;
  res.json({ data: movie });
}

async function readTheatersByMovie(req, res, next) {
  const movieId = req.params.movieId;
  const data = await moviesService.readTheatersByMovie(movieId);
  res.json({ data });
}

async function readReviewsForMovie(req, res, next) {
  const movieId = req.params.movieId;
  const data = await moviesService.readReviewsForMovie(movieId);
  res.json({ data });
}

async function list(req, res, next) {
  const { is_showing } = req.query;
  const data = is_showing
    ? await moviesService.listCurrentlyShowing()
    : await moviesService.list();
  res.json({ data });
}

////////////////
// VALIDATION //
////////////////

function movieExists(req, res, next) {
  moviesService
    .read(req.params.movieId)
    .then((movie) => {
      if (movie) {
        res.locals.movie = movie;
        return next();
      }
      next({ status: 404, message: "Movie cannot be found." });
    })
    .catch(next);
}

module.exports = {
  list,
  read: [movieExists, read],
  readTheatersByMovie: [movieExists, readTheatersByMovie],
  readReviewsForMovie: [movieExists, readReviewsForMovie],
};
