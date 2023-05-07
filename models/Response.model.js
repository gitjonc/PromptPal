const { Schema, model } = require("mongoose");

const responseSchema = new Schema(
  {
    query: {
      type: String,
      required: true,
    },
    chatGPTresponse: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    prompt: { type: Schema.Types.ObjectId, ref: "Prompt" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Response", responseSchema);
