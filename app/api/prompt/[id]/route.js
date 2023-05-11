import Prompt from "@models/prompt";
import { connectMongooseDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectMongooseDB();

    const getPromptIdData = await Prompt.findById(params.id).populate(
      "creator"
    );

    return new Response(JSON.stringify(getPromptIdData), { status: 200 });
  } catch (error) {
    return new Response("PromptID", error, { status: 500 });
  }
};

export const PATCH = async (response, { params }) => {
  const { prompt, tag } = await response.json();
  try {
    await connectMongooseDB();

    await Prompt.findByIdAndUpdate(params.id, {
      prompt,
      tag,
    });

    return new Response("Updated Successfully !", { status: 200 });
  } catch (error) {
    return new Response("Error while updating data", error, { status: 500 });
  }
};

export const DELETE = async (response, { params }) => {
  try {
    await connectMongooseDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Deleted Successfully !!", { status: 200 });
  } catch (error) {
    return new Response("Error while Deleting data", error, { status: 500 });
  }
};
