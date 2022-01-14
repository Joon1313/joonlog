import { getLoginSession } from "../../libs/auth";
import { findUserbyId } from "../../libs/user";

export default async function handler(req, res) {
  try {
    const session = await getLoginSession(req);
    const user = await findUserbyId(session._id);
    res.status(200).json({ user: user.user_id, isLoggedIn: true });
  } catch (err) {
    res.status(401).json({ isLoggedIn: false, err });
  }
}
