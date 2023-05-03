const mongoose = require("mongoose");
const Response = require("../models/Response.model");
require("dotenv").config();

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/PromptPal";

const prompts = [
  {
    query: "¿Cómo estás?",
    chatGPTresponse: "De puta madre.",
  },
  {
    query: "¿Cómo te llamas?",
    chatGPTresponse: "¿Y a ti qué te importa?",
  },
  {
    query: "¿Cómo te llamas?",
    chatGPTresponse: "¿Y a ti qué te importa?",
  },
  {
    query: "¿Cómo te llamas?",
    chatGPTresponse: "¿Y a ti qué te importa?",
  },
  {
    query: "¿Cómo te llamas?",
    chatGPTresponse: "¿Y a ti qué te importa?",
  },
];
