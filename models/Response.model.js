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
    prompts: [{ type: Schema.Types.ObjectId, ref: "Prompt" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Response", promptSchema);
