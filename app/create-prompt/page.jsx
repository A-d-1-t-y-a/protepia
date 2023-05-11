import CreateOrUpdate from "@components/CreateOrUpdatePrompt";

const CreatePost = () => {
  // const handleApiCall = async (url) => {
  //   try {
  //     const res = await fetch(url, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         userId: session?.user.id,
  //         prompt: prompt,
  //         tag: tag,
  //       }),
  //     });

  //     if (res.ok) {
  //       route.push("/");
  //     }
  //   } catch (e) {
  //     console.log("error while posting", e);
  //   }
  // };
  return <CreateOrUpdate OldPrompt="" OldTag="" />;
};

export default CreatePost;
