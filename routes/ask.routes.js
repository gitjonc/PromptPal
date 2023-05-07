const router = require("express").Router();
const mongoose = require("mongoose");

const Prompt = require("./../models/Prompt.model");
const Response = require("./../models/Response.model");
const question = require("../api/openai");

const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard.js");

//GET Prompt

router.get("/:promptId", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.promptId;
    const prompt = await Prompt.findById(id);
    const definition = prompt.definition;
    res.render("ask/ask", { definition, id });
  } catch (error) {
    next(error);
  }
});

//POST response from ChatGPT

router.post("/:promptId", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.promptId;
    const definition = req.body.prompt;
    let response = await question(definition);
    response = response.data.choices[0].message.content;
    res.render("ask/ask", { definition, id, response });
  } catch (error) {
    next(error);
  }
});

//POST save information

router.post("/save/:promptId", isLoggedIn, async (req, res, next) => {
  try {
    const query = req.body.prompt;
    const chatGPTresponse = req.body.response;
    const prompt = req.params.promptId;
    let tag = await Prompt.findById(prompt);
    tag = tag.tag;
    const user = req.session.currentUser._id;
    await Response.create({ query, chatGPTresponse, prompt, tag, user });
    res.redirect("/prompts");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
