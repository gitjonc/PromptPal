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
  },
  {
    timestamps: true,
  }
);

module.exports = model("Prompt", promptSchema);
