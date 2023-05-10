import { Schema, models, model } from "mongoose";

export const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
