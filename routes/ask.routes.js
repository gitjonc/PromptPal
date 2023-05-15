const router = require("express").Router();

const Prompt = require("./../models/Prompt.model");
const Response = require("./../models/Response.model");
const question = require("../config/openai.config");

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
    const prompt = req.params.promptId;
    const query = req.body.prompt;
    let response = await question(query);
    const chatGPTresponse = response.data.choices[0].message.content;
    let tag = await Prompt.findById(prompt);
    tag = tag.tag;
    const user = req.session.currentUser._id;
    let responseId = await Response.create({ query, chatGPTresponse, prompt, tag, user });
    responseId = responseId._id;
    res.redirect(`/responses/${responseId}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
