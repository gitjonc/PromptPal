const router = require("express").Router();
const mongoose = require("mongoose");

const Prompt = require("./../models/Prompt.model");
const User = require("./../models/User.model");

const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard.js");

//GET /prompts
router.get("/", isLoggedIn, (req, res, next) => {
  console.log("----->", req.session.currentUser.email);
  Prompt.find()
    .then((allPrompts) => {
      res.render(
        "prompts/prompts.hbs",

        { prompts: allPrompts }
      );
    })
    .catch((error) => {
      console.log("Error while getting the books from the DB: ", error);

      next(error);
    });
});

//GET prompts by TAG

router.get("/buyer-persona", isLoggedIn, (req, res, next) => {
  Prompt.find({ tag: "Buyer Persona Development" })
    .then((bpPrompts) => {
      res.render("prompts/prompts.hbs", { prompts: bpPrompts });
    })
    .catch((error) => {
      console.log("Error while getting the books from the DB: ", error);

      next(error);
    });
});

router.get("/content-creation", isLoggedIn, (req, res, next) => {
  Prompt.find({ tag: "Content Creation and Curation" })
    .then((ccacPrompts) => {
      res.render("prompts/prompts.hbs", { prompts: ccacPrompts });
    })
    .catch((error) => {
      console.log("Error while getting the books from the DB: ", error);

      next(error);
    });
});

router.get("/content-performance", isLoggedIn, (req, res, next) => {
  Prompt.find({ tag: "Content Performance" })
    .then((cpPrompts) => {
      res.render("prompts/prompts.hbs", { prompts: cpPrompts });
    })
    .catch((error) => {
      console.log("Error while getting the books from the DB: ", error);

      next(error);
    });
});

router.get("/content-promotion-distribution", isLoggedIn, (req, res, next) => {
  Prompt.find({ tag: "Content Promotion and Distribution" })
    .then((cpadPrompts) => {
      res.render("prompts/prompts.hbs", { prompts: cpadPrompts });
    })
    .catch((error) => {
      console.log("Error while getting the books from the DB: ", error);

      next(error);
    });
});

router.get("/seo", isLoggedIn, (req, res, next) => {
  Prompt.find({ tag: "SEO Copywriting" })
    .then((seocPrompts) => {
      res.render("prompts/prompts.hbs", { prompts: seocPrompts });
    })
    .catch((error) => {
      console.log("Error while getting the books from the DB: ", error);

      next(error);
    });
});

router.get("/story-telling", isLoggedIn, (req, res, next) => {
  Prompt.find({ tag: "Marketing Storytelling" })
    .then((mksPrompts) => {
      res.render("prompts/prompts.hbs", { prompts: mksPrompts });
    })
    .catch((error) => {
      console.log("Error while getting the books from the DB: ", error);

      next(error);
    });
});

router.get("/:promptId", isLoggedIn, (req, res) => {
  const { promptId } = req.params;
  Prompt.findById(promptId)
    .then((prompt) => {
      res.render("prompts/prompt.hbs", { prompt });
      console.log({ promptId });
      console.log(req.params);
      console.log("------------>", {
        userInSession: req.session.currentUser._id,
      });
    })
    .catch((err) => console.log(err));
});

//  router.get("/mis-prompts", isLoggedIn, (req, res) => {

//  });

module.exports = router;

// Buyer Persona Development
// Content Creation and Curation
// Content Performance
// Content Promotion and Distribution
// SEO Copywriting
// Marketing Storytelling
