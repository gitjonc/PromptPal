const router = require("express").Router();
const mongoose = require("mongoose");

const Response = require("./../models/Response.model");
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard.js");

//GET /responses
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const tags = await Response.distinct("tag");
    const responses = await Response.find();
    const responsesUpdated = responses.map((el) => {
      const element = el.toObject();
      element.updatedAt = element.updatedAt.toLocaleDateString("es-ES");
      return element;
    });
    console.log(responsesUpdated[0]);
    res.render("responses/responses", { tags, responses: responsesUpdated });
  } catch (error) {
    next(error);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const tags = await Response.distinct("tag");
    const tag = req.body.tag;
    const responses = await Response.find({ tag: tag });
    res.render("responses/responses", { tags, responses });
  } catch (error) {
    next(error);
  }
});

router.get("/:response", isLoggedIn, (req, res) => {
  const { responseId } = req.params;
  Response.findById(response)
    .then((response) => {
      res.render("responses/response.hbs", { response });
    })
    .catch((err) => console.log(err));
});

router.get("/:responseId/delete", isLoggedIn, (req, res, next) => {
  const { responseId } = req.params;
  Response.findByIdAndDelete(responseId)
    .then(() => {
      res.redirect("/responses");
    })
    .catch((error) => next(error));
});

module.exports = router;
