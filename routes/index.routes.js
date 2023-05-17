const router = require("express").Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const User = require("./../models/User.model");
const uploader = require("./../config/cloudinary.config");
const sendMail = require("./../utils/welcome-email");

const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard.js");

//REGEX
const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { userInSession: req.session.currentUser });
});

// GET /sign-up
router.get("/sign-up", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

// POST /sign-up
router.post("/sign-up", uploader.single("profilePic"), isLoggedOut, async (req, res, next) => {
  try {
    const { username, email, password, industry } = req.body;
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
    await User.create({
      username,
      email,
      password: hashedPassword,
      industry,
      profilePic: req.file.path,
    });
    await sendMail({
      to: email,
      username: username,
    });

    res.redirect("/profile");
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render("auth/signup", { errorMessage: error.message });
    } else if (error.code === 11000) {
      res.status(500).render("auth/signup", {
        errorMessage: "El usuario y el email deben ser únicos, y alguno está en uso.",
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
      req.session.currentUser = user;
      res.redirect("/profile");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("auth/profile", { userInSession: req.session.currentUser });
});

router.get("/edit-profile", isLoggedIn, (req, res, next) => {
  const user = req.session.currentUser;
  User.findById(user._id).then((userOne) => {
    res.render("auth/profile-account", userOne);
  });
});

router.post("/edit-profile", uploader.single("profilePic"), isLoggedIn, async (req, res, next) => {
  const user = req.session.currentUser;
  const { username, email, industry } = req.body;
  let pic = req.body.profilePicOld;
  if (req.file != undefined) {
    pic = req.file.path;
  }
  await User.findByIdAndUpdate(user._id, {
    username,
    email,
    industry,
    profilePic: pic,
  });
  res.redirect("/edit-profile");
});

router.get("/edit-profile/change-password", isLoggedIn, (req, res) => {
  res.render("auth/change-password");
});

router.post("/edit-profile/change-password", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.session.currentUser;
    const { currentpass, newpass, repeatpass } = req.body;
    if (!bcrypt.compareSync(currentpass, user.password)) {
      res.render("auth/change-password", {
        errorMessage: "La contraseña no es correcta",
      });
      return;
    }
    if (currentpass == newpass) {
      res.render("auth/change-password", {
        errorMessage: "La contraseña nueva debe ser diferente a la actual",
      });
      return;
    }
    if (newpass != repeatpass) {
      res.render("auth/change-password", {
        errorMessage: "La nueva contraseña no coincide",
      });
      return;
    }
    if (!regex.test(newpass)) {
      res.render("auth/change-password", {
        errorMessage:
          "El password debe tener al menos 6 caracteres y debe contener un número, una minúscula y una mayúscula.",
      });
      return;
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(newpass, salt);
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
    res.redirect("/edit-profile");
  } catch (error) {
    next(error);
  }
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
