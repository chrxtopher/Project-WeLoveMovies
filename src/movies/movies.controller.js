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
  const critics = await moviesService.listCritics();

  const content = data.map((review) => {
    const foundCritic = {
      critic: critics.find((critic) => critic.critic_id === review.critic_id),
    };
    return { ...review, ...foundCritic };
  });
  res.json({ data: content });
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

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: "Movie cannot be found",
  });
}

module.exports = {
  list,
  read: [movieExists, read],
  readTheatersByMovie: [movieExists, readTheatersByMovie],
  readReviewsForMovie: [movieExists, readReviewsForMovie],
};
