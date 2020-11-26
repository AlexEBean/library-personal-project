module.exports = {
    checkUser: async (req, res, next) => {
      if (req.session.user) {
      next();
    } else {
      res.status(403).send("No user logged in");
    }
  },

    checkAdmin: async (req, res, next) => {
      if (req.session.user.admin) {
      next();
    } else {
      res.status(401).send("Not an Admin");
    }
  },
}