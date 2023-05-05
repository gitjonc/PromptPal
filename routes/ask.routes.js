const router = require("express").Router();
const mongoose = require("mongoose");

const Prompt = require("./../models/Prompt.model");
const Response = require("./../models/Response.model");
const question = require("../api/openai");

const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard.js");

//GET Prompt

router.get("/:promptID", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.promptID;
    const prompt = await Prompt.findById(id);
    const definition = prompt.definition;
    res.render("ask/ask", { definition, id });
  } catch (error) {
    next(error);
  }
});

//POST response from ChatGPT

router.post("/:promptID", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.promptID;
    const definition = req.body.prompt;
    let response = await question(definition);
    response = response.data.choices[0].message.content;
    res.render("ask/ask", { definition, id, response });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
