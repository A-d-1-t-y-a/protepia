import { connectMongooseDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (response, { params: { slug } }) => {
  try {
    await connectMongooseDB();

    const res = await Prompt.find({
      tag: { $regex: slug[0], $options: "i" },
    }).populate("creator");

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response("Failed to give the Search data", { status: 500 });
  }
};
