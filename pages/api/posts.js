import { getLoginSession } from "../../libs/auth";
import { createPost, updatePost } from "../../libs/post";

export default async function handler(req, res) {
  const postData = { ...req.body };
  const { title, content, tag, preview, slug } = postData;
  postData.preview = postData.preview.replaceAll("*", "");
  if (!title || !content || !tag || !preview || !slug) return res.status(400).json({ message: "params is empty" });
  try {
    await getLoginSession(req);
  } catch (err) {
    res.status(401).json({ error: err.message });
    return;
  }

  switch (req.method) {
    case "POST":
      try {
        const post = await createPost(postData);
        await fetch(process.env.VERCEL_WEBHOOK);
        res.status(200).json({ message: "success", response: post });
      } catch (err) {
        res.status(400).json(err);
      }
      break;
    case "PUT":
      try {
        const post = await updatePost(postData);
        await fetch(process.env.VERCEL_WEBHOOK);
        res.status(200).json({ message: "success", response: post });
      } catch (err) {
        res.status(400).json(err);
      }
      break;
    default:
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
      break;
  }
}
