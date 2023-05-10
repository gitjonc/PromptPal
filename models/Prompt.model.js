const { Schema, model } = require("mongoose");

const promptSchema = new Schema(
  {
    definition: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    responses: [{ type: Schema.Types.ObjectId, ref: "Response" }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
    prompt: { type: Schema.Types.ObjectId, ref: "Prompt" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Prompt", promptSchema);
