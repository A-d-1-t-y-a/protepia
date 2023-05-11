import { connectMongooseDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async () => {
  try {
    await connectMongooseDB();

    const getPrompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(getPrompts), { status: 200 });
  } catch (error) {
    return new Response("Error while fetching the post", error, {
      status: 500,
    });
  }
};
