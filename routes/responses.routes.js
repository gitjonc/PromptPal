const router = require("express").Router();
const mongoose = require("mongoose");

const Response = require("./../models/Response.model");
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard.js");

//GET /responses
router.get("/", isLoggedIn, (req, res, next) => {
  Response.find()
    .then((allResponses) => {
      // const responses = allResponses.map((el) => {
      //   console.log(el.updatedAt.toLocaleDateString("es-ES"));
      //   el.updatedAt = el.updatedAt.toLocaleDateString("es-ES");
      //   console.log(el.newUpdatedAt);
      //   return el;
      // });
      // console.log(responses);
      res.render("responses/responses.hbs", { responses: allResponses });
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
