const mongoose = require("mongoose");
const Response = require("../models/Response.model");
require("dotenv").config();

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/PromptPal";

const responses = [
  {
    query:
      "I want you to act as a social media strategist. You will develop a plan for creating and sharing content on social media platforms that will engage your target audience and drive business results. You will also analyze metrics regularly to measure success and adjust the plan as needed. Depending on the objective, you may choose specific platforms and tactics e.g., if it’s brand awareness then you can focus on creating viral videos, infographics and contests; If it’s lead generation then you can concentrate on creating e-books, white papers and webinars etc. My first request is:",
    chatGPTresponse: "De puta madre Buyer Persona.",
  },
  {
    query:
      "Having worked at <company> as a leading <field> professional, what advice do you have for individuals looking to build a strong personal brand within the space?",
    chatGPTresponse: "De puta madre Content Creation and Duration.",
  },
  {
    query:
      "Website traffic: I want to increase my website traffic by <X>% within the next six months.",
    chatGPTresponse: "De puta madre Content Performance",
  },
  {
    query:
      "Develop a personalized outreach plan to <target audience/demographic> using email, social media, and other channels. Include specific messaging and incentives that speak directly to their needs and interests.",
    chatGPTresponse: "De puta madre content creation and distribution",
  },
  {
    query:
      "Write a product description that showcases <key features> with concise and compelling language, targeted to <customer demographic> who prioritize <value elements>.",
    chatGPTresponse: "De puta madre SEO",
  },
  {
    query:
      "What metrics should <business> measure to evaluate the success of their content marketing efforts?",
    chatGPTresponse: "De puta madre Storytelling",
  },
];

mongoose
  .connect(MONGO_URI)
  .then((db) => {
    console.log(`Connected to Mongo database: "${db.connections[0].name}"`);
    return Response.create(responses);
  })
  .then((responsesFromDB) => {
    console.log(`Create ${responsesFromDB.length} responses`);
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("DB connection closed!");
  })
  .catch((err) => {
    console.log(`An error ocurrred while creating prompts from the DB: ${err}`);
  });
