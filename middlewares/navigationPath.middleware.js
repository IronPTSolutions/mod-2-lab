module.exports.use((req, res, next) => {
  res.locals.navigationPath = req.path;
  next();
});
