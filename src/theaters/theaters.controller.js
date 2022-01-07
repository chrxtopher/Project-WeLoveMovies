const theatersService = require("./theaters.service");

async function list(req, res, next) {
  const theaters = await theatersService.list();
  res.json({ theaters });
}

module.exports = {
  list,
};
