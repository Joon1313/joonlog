import { findUserbyId } from "../../libs/user";
import { passwordVerify, createToken } from "../../libs/auth";

//auth
export default async function handler(req, res) {
  if (req.method !== "POST")
    res.status(405).json({ message: "not allow method" });
  const { user_id, password } = req.body;
  if (!user_id || !password)
    res.status(400).json({ message: "user_id or password empty" });
  try {
    const user = await findUserbyId(user_id);
    const verify = await passwordVerify(user.password, password);
    if (!verify) throw new Error("password is not match");
    const token = createToken(user.user_id);
    res.setHeader(
      "Set-Cookie",
      `auth=${token}; path=/; httpOnly=true; max-age=999999999;`
    );
    res.status(307).json({ message: "success", error: null });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
