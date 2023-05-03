const router = require("express").Router();
const mongoose = require("mongoose");

const Response = require("./../models/Response.model");

const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard.js");

//GET /responses
router.get("/", isLoggedIn, (req, res, next) => {
  Response.find()
    .then((allResponses) => {
      res.render("responses/responses.hbs", { responses: allResponses });
      console.log(allResponses);
    })
    .catch((error) => {
      console.log("Error while getting the books from the DB: ", error);

      next(error);
    });
});

router.get("/:responseId", isLoggedIn, (req, res) => {
  const { responseId } = req.params;
  Response.findById(responseId)
    .then((response) => {
      res.render("responses/response.hbs", { response });
      console.log({ responseId });
      console.log(req.params);
    })
    .catch((err) => console.log(err));
});

router.get("/my-responses", isLoggedIn, (req, res) => {
  const { responseId } = req.params;
  Response.findById(responseId)
    .then((response) => {
      res.render("responses/response.hbs", { response });
      console.log({ responseId });
      console.log(req.params);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
