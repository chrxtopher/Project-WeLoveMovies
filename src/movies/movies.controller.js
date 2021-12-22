const moviesService = require("./movies.service");

//////////
// CRUD //
//////////

function read(req, res, next) {
  const movie = res.locals.movie;
  res.json({ data: movie });
}

async function list(req, res, next) {
  const data = await moviesService.list();
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
      next({ status: 400, message: "Movie cannot be found." });
    })
    .catch(next);
}

module.exports = {
  list,
  read: [movieExists, read],
};
