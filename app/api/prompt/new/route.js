import Prompt from "@models/prompt";
import { connectMongooseDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectMongooseDB();

    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    newPrompt.save();

    return new Response("Saved successfully" + JSON.stringify(newPrompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
