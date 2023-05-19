const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/log-in");
  }
  next();
};

const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect("/prompts");
  }
  next();
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
};
