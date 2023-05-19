const router = require("express").Router();

const Prompt = require("./../models/Prompt.model");
const Response = require("./../models/Response.model");
const { isLoggedIn } = require("../middleware/route-guard.js");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.session.currentUser);
    const tags = await Prompt.distinct("tag");
    const prompts = await Prompt.find();
    const promptsUpdated = prompts.map((el) => {
      const element = el.toObject();
      element.createdAt = element.createdAt.toLocaleDateString("es-ES");
      element.updatedAt = element.updatedAt.toLocaleDateString("es-ES");
      return element;
    });
    res.render("prompts/prompts", {
      tags,
      prompts: promptsUpdated,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const tags = await Prompt.distinct("tag");
    const tag = req.body.tag;
    const prompts = await Prompt.find({ tag: tag });
    res.render("prompts/prompts", {
      tags,
      prompts,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("prompts/new-prompt.hbs", {
    userInSession: req.session.currentUser,
  });
});

router.post("/create", isLoggedIn, (req, res, next) => {
  const { tag, definition } = req.body;
  const user = req.session.currentUser._id;
  Prompt.create({ tag, definition, user })
    .then(() => res.redirect("/prompts/mis-prompts"))
    .catch((error) => next(error));
});

// GET Mis Prompts

router.get("/mis-prompts", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.session.currentUser._id;
    const tags = await Prompt.find({ user }).distinct("tag");
    const promptos = await Prompt.find({ user });
    const promptsUpdated = promptos.map((el) => {
      const element = el.toObject();
      element.createdAt = element.createdAt.toLocaleDateString("es-ES");
      element.updatedAt = element.updatedAt.toLocaleDateString("es-ES");
      return element;
    });

    res.render("prompts/mis-prompts", {
      tags,
      prompts: promptsUpdated,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/mis-prompts", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.session.currentUser._id;
    const tags = await Prompt.find({ user }).distinct("tag");
    const tag = req.body.tag;
    const orderBy = req.body.sortByDate;
    let prompts = {};
    if (tag == "null") {
      prompts = await Prompt.find({
        user: req.session.currentUser._id,
      }).sort({ updatedAt: orderBy });
    } else {
      prompts = await Prompt.find({
        user: req.session.currentUser._id,
        tag: tag,
      }).sort({ updatedAt: orderBy });
    }
    const promptsUpdated = prompts.map((el) => {
      const element = el.toObject();
      element.createdAt = element.updatedAt.toLocaleDateString("es-ES");
      element.updatedAt = element.updatedAt.toLocaleDateString("es-ES");
      return element;
    });
    res.render("prompts/mis-prompts", {
      tags,
      prompts: promptsUpdated,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:prompt", isLoggedIn, (req, res) => {
  const { prompt } = req.params;
  Prompt.findById(prompt)
    .then((prompt) => {
      Prompt.find({ prompt: prompt }).then((asPrompt) => {
        res.render("prompts/prompt.hbs", {
          prompt,
          asPrompt,
          userInSession: req.session.currentUser,
        });
      });
    })
    .catch((err) => console.log(err));
});

router.get("/:prompt/prompt", isLoggedIn, (req, res, next) => {
  const { prompt } = req.params;
  Prompt.findById(prompt).then((prompt) => {
    res.render("prompts/related-prompts.hbs", {
      prompt,
      userInSession: req.session.currentUser,
    });
  });
});

router.get("/:prompt/prompts", isLoggedIn, (req, res, next) => {
  const { prompt } = req.params;
  Prompt.find({ prompt }).then((asPrompt) => {
    Prompt.findById(prompt).then((originalPrompt) => {
      res.render("prompts/associated-prompts.hbs", {
        originalPrompt,
        asPrompt,
        userInSession: req.session.currentUser,
      });
    });
  });
});

router.get("/:prompt/responses", isLoggedIn, async (req, res, next) => {
  const { prompt } = req.params;
  const mainPrompt = await Prompt.findById(prompt);
  const responses = await Response.find({ prompt: prompt });
  res.render("prompts/responses", {
    responses,
    prompt,
    mainPrompt,
    userInSession: req.session.currentUser,
  });
});

router.get("/:prompt/edit", isLoggedIn, (req, res, next) => {
  const { prompt } = req.params;
  Prompt.findById(prompt)
    .then((promptToEdit) => {
      res.render("prompts/edit-prompt.hbs", {
        promptToEdit,
        userInSession: req.session.currentUser,
      });
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

router.get("/:prompt/delete", isLoggedIn, (req, res, next) => {
  const { prompt } = req.params;

  Prompt.findByIdAndDelete(prompt)
    .then(() => {
      res.redirect("/prompts/mis-prompts");
    })
    .catch((error) => next(error));
});

module.exports = router;
