const router = require("express").Router();
const mongoose = require("mongoose");

const Prompt = require("./../models/Prompt.model");
const User = require("./../models/User.model");
const Response = require("./../models/Response.model");

const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard.js");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const tags = await Prompt.distinct("tag");
    const prompts = await Prompt.find();
    const promptsUpdated = prompts.map((el) => {
      const element = el.toObject();
      element.createdAt = element.createdAt.toLocaleDateString("es-ES");
      element.updatedAt = element.updatedAt.toLocaleDateString("es-ES");
      return element;
    });
    res.render("prompts/prompts", { tags, prompts: promptsUpdated });
  } catch (error) {
    next(error);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const tags = await Prompt.distinct("tag");
    const tag = req.body.tag;
    const prompts = await Prompt.find({ tag: tag });
    res.render("prompts/prompts", { tags, prompts });
  } catch (error) {
    next(error);
  }
});

router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("prompts/new-prompt.hbs");
});

router.post("/create", isLoggedIn, (req, res, next) => {
  const { tag, definition } = req.body;
  const user = req.session.currentUser._id;
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

router.get("/mis-prompts", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.session.currentUser._id;
    const tags = await Prompt.distinct("tag");
    const promptos = await Prompt.find({ user: user });
    const promptsUpdated = promptos.map((el) => {
      const element = el.toObject();
      element.createdAt = element.createdAt.toLocaleDateString("es-ES");
      element.updatedAt = element.updatedAt.toLocaleDateString("es-ES");
      return element;
    });

    res.render("prompts/mis-prompts", {
      tags,
      prompts: promptsUpdated,
      promptos,
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
        res.render("prompts/prompt.hbs", { prompt, asPrompt });
      });
    })
    .catch((err) => console.log(err));
});

router.get("/:prompt/prompt", isLoggedIn, (req, res, next) => {
  const { prompt } = req.params;
  Prompt.findById(prompt).then((prompt) => {
    res.render("prompts/related-prompts.hbs", { prompt });
  });
});

router.get("/:prompt/prompts", isLoggedIn, (req, res, next) => {
  const { prompt } = req.params;
  Prompt.find({ prompt: prompt }).then((asPrompt) => {
    Prompt.findById(prompt).then((originalPrompt) => {
      res.render("prompts/associated-prompts.hbs", {
        originalPrompt,
        asPrompt,
      });
    });
  });
});

router.get("/:prompt/responses", isLoggedIn, async (req, res, next) => {
  const { prompt } = req.params;
  const mainPrompt = await Prompt.findById(prompt);
  const responses = await Response.find({ prompt: prompt });
  res.render("prompts/responses", { responses, prompt, mainPrompt });
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
