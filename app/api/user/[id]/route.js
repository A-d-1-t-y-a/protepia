import Prompt from "@models/prompt";
import { connectMongooseDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectMongooseDB();

    const getPromptBasedOnUser = await Prompt.find({
      creator: params.id,
    }).populate("creator");
    
    return new Response(JSON.stringify(getPromptBasedOnUser), { status: 200 });
  } catch (error) {
    return new Response("Error while fetching userBased data", { status: 500 });
  }
};