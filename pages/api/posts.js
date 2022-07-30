import { getLoginSession } from "../../libs/auth";
import { createPost, updatePost } from "../../libs/post";

export default async function handler(req, res) {
  const { title, content, tag, preview, slug, id } = req.body;

  if (!title || !content || !tag || !preview || !slug)
    return res.status(400).json({ message: "params is empty" });

  try {
    await getLoginSession(req);
  } catch (err) {
    res.status(401).json({ error: err.message });
    return;
  }

  switch (req.method) {
    case "POST":
      try {
        const post = await createPost(req.body);
        res.status(200).json({ message: "success", response: post });
      } catch (err) {
        res.status(400).json(err);
      }
      break;
    case "PUT":
      try {
        const post = await updatePost(req.body);
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
