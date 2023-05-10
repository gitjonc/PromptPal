const router = require("express").Router();
const mongoose = require("mongoose");

const Prompt = require("./../models/Prompt.model");
const User = require("./../models/User.model");

const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard.js");

//GET /prompts
router.get("/", isLoggedIn, (req, res, next) => {
  Prompt.find({ user: { $exists: false } })
    .sort({ createdAt: -1 })
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

router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("prompts/new-prompt.hbs");
});

router.post("/create", isLoggedIn, (req, res, next) => {
  const { tag, definition } = req.body;
  const user = req.session.currentUser._id;
  console.log(user);
  Prompt.create({ tag, definition, user })
    .then(() => res.redirect("/prompts/mis-prompts"))
    .catch((error) => next(error));
});

//GET prompts by TAG

router.get("/buyer-persona", isLoggedIn, (req, res, next) => {
  Prompt.find({ tag: "Buyer Persona Development" })
    .then((bpPrompts) => {
      res.render("prompts/prompts.hbs", { prompts: bpPrompts });
    })
    .catch((error) => {
      console.log("Error while getting the prompts from the DB: ", error);

      next(error);
    });
});

router.get("/content-creation", isLoggedIn, (req, res, next) => {
  Prompt.find({ tag: "Content Creation and Curation" })
    .then((ccacPrompts) => {
      res.render("prompts/prompts.hbs", { prompts: ccacPrompts });
    })
    .catch((error) => {
      console.log("Error while getting the prompts from the DB: ", error);

      next(error);
    });
});

router.get("/content-performance", isLoggedIn, (req, res, next) => {
  Prompt.find({ tag: "Content Performance" })
    .then((cpPrompts) => {
      res.render("prompts/prompts.hbs", { prompts: cpPrompts });
    })
    .catch((error) => {
      console.log("Error while getting the prompts from the DB: ", error);

      next(error);
    });
});

router.get("/content-promotion-distribution", isLoggedIn, (req, res, next) => {
  Prompt.find({ tag: "Content Promotion and Distribution" })
    .then((cpadPrompts) => {
      res.render("prompts/prompts.hbs", { prompts: cpadPrompts });
    })
    .catch((error) => {
      console.log("Error while getting the prompts from the DB: ", error);

      next(error);
    });
});

router.get("/seo", isLoggedIn, (req, res, next) => {
  Prompt.find({ tag: "SEO Copywriting" })
    .then((seocPrompts) => {
      res.render("prompts/prompts.hbs", { prompts: seocPrompts });
    })
    .catch((error) => {
      console.log("Error while getting the prompts from the DB: ", error);

      next(error);
    });
});

router.get("/story-telling", isLoggedIn, (req, res, next) => {
  Prompt.find({ tag: "Marketing Storytelling" })
    .then((mksPrompts) => {
      res.render("prompts/prompts.hbs", { prompts: mksPrompts });
    })
    .catch((error) => {
      console.log("Error while getting the prompts from the DB: ", error);

      next(error);
    });
});

router.get("/mis-prompts", isLoggedIn, (req, res, next) => {
  const user = req.session.currentUser._id;
  Prompt.find({ user: user })
    .then((allPrompts) => {
      res.render("prompts/mis-prompts.hbs", { prompts: allPrompts });
    })
    .catch((err) => console.log(err));
});

router.get("/:prompt", isLoggedIn, (req, res) => {
  const { prompt } = req.params;
  Prompt.findById(prompt)
    .then((prompt) => {
      res.render("prompts/prompt.hbs", { prompt });
    })
    .catch((err) => console.log(err));
});

router.get("/:prompt/queries", isLoggedIn, (req, res, next) => {
  // Prompt.find({ prompt: { $exists: true } })
  const { prompt } = req.params;
  Prompt.findById(prompt)
    .populate("prompt")
    .then((prompt) => {
      Prompt.findById(prompt.prompt._id).then((relatedPrompt) => {
        console.log("---->", relatedPrompt);
        res.render("prompts/related-prompts.hbs", { relatedPrompt });
      });
    })
    .catch((err) => console.log(err));
});

router.get("/:prompt/edit", isLoggedIn, (req, res, next) => {
  const { prompt } = req.params;
  Prompt.findById(prompt)
    .then((promptToEdit) => {
      res.render("prompts/edited-prompt.hbs", { promptToEdit });
    })
    .catch((error) => next(error));
});

router.post("/:prompt/edit", isLoggedIn, (req, res, next) => {
  const { prompt } = req.params;
  const { tag, definition } = req.body;
  const user = req.session.currentUser._id;
  Prompt.create({ tag, definition, user, prompt })
    .then(() => res.redirect("/prompts/mis-prompts"))
    .catch((error) => next(error));
});

router.post("/:prompt/delete", isLoggedIn, (req, res, next) => {
  const { prompt } = req.params;
  Prompt.findByIdAndDelete(prompt)
    .then(() => {
      res.redirect("/prompts/mis-prompts");
    })
    .catch((error) => next(error));
});

module.exports = router;
