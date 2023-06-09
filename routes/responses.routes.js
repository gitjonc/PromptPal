const router = require("express").Router();

const Response = require("./../models/Response.model");
const mailer = require("../config/nodemailer.config");
const { isLoggedIn } = require("../middleware/route-guard.js");

//GET /responses
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const tags = await Response.find({
      user: req.session.currentUser._id,
    }).distinct("tag");
    const responses = await Response.find({
      user: req.session.currentUser._id,
    }).sort({ updatedAt: -1 });
    const responsesUpdated = responses.map((el) => {
      const element = el.toObject();
      element.createdAt = element.updatedAt.toLocaleDateString("es-ES");
      element.updatedAt = element.updatedAt.toLocaleDateString("es-ES");
      return element;
    });
    res.render("responses/responses", {
      tags,
      responses: responsesUpdated,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const tags = await Response.find({
      user: req.session.currentUser._id,
    }).distinct("tag");
    const tag = req.body.tag;
    const orderBy = req.body.sortByDate;
    let responses = {};
    if (tag == "null") {
      responses = await Response.find({
        user: req.session.currentUser._id,
      }).sort({ updatedAt: orderBy });
    } else {
      responses = await Response.find({
        user: req.session.currentUser._id,
        tag: tag,
      }).sort({ updatedAt: orderBy });
    }
    const responsesUpdated = responses.map((el) => {
      const element = el.toObject();
      element.createdAt = element.updatedAt.toLocaleDateString("es-ES");
      element.updatedAt = element.updatedAt.toLocaleDateString("es-ES");
      return element;
    });
    res.render("responses/responses", {
      tags,
      responses: responsesUpdated,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:response", isLoggedIn, (req, res) => {
  const { response } = req.params;
  Response.findById(response)
    .then((response) => {
      res.render("responses/response.hbs", {
        response,
        userInSession: req.session.currentUser,
      });
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

router.get("/:responseId/send", isLoggedIn, async (req, res, next) => {
  const id = req.params.responseId;
  const response = await Response.findById(id);
  const email = req.session.currentUser.email;
  await mailer.sendMail({
    from: `PromptPal ${process.env.EMAIL}`,
    to: email,
    subject: "Aquí está tu consulta",
    html: `${response.chatGPTresponse}`,
  });
  res.redirect("/responses");
});

module.exports = router;
