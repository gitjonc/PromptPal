const router = require("express").Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const User = require("./../models/User.model");

const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard.js");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// GET /sign-up
router.get("/sign-up", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

// POST /sign-up
router.post("/sign-up", isLoggedOut, async (req, res, next) => {
  try {
    const { username, email, password, industry } = req.body;
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
      res.status(500).render("auth/signup", {
        errorMessage:
          "El password debe tener al menos 6 caracteres y debe contener un número, una minúscula y una mayúscula.",
      });
      return;
    }

    if (!username || !email || !password) {
      res.render("auth/signup", {
        errorMessage: "Es necesario rellenar todos los campos.",
      });
      return;
    }

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      res.render("auth/signup", {
        errorMessage: "El usuario y/o email ya están en uso",
      });
      return;
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    await User.create({ username, email, password: hashedPassword, industry });
    res.redirect("/profile");
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render("auth/signup", { errorMessage: error.message });
    } else if (error.code === 11000) {
      res.status(500).render("auth/signup", {
        errorMessage:
          "El usuario y el email deben ser únicos, y alguno está en uso.",
      });
    } else {
      next(error);
    }
  }
});

// GET /log-in
router.get("/log-in", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

// POST /log-in
router.post("/log-in", isLoggedOut, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.render("auth/login", {
        errorMessage: "Se necesitan ambos campos para el log-in.",
      });
      return;
    }

    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.render("auth/login", {
        errorMessage: "El email y/o la contraseña son incorrectos",
      });
      return;
    } else if (bcrypt.compareSync(password, user.password)) {
      res.render("auth/profile", { user });
      req.session.currentUser = user;
      res.redirect("/profile");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/profile", (req, res) => {
  res.render("auth/profile", { userInSession: req.session.currentUser });
});

// GET /log-out
router.get("/log-out", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render("auth/logout", { errorMessage: err.message });
      return;
    }

    res.redirect("/");
  });
});

module.exports = router;