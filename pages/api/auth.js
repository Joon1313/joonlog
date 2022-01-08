import { getLoginSession } from "../../libs/auth";
import { findUser } from "../../libs/user";

export default async function handler(req, res) {
  try {
    const session = await getLoginSession(req);
    const user = await findUser(session._id);
    res.status(200).json({ user, isLoggedIn: true });
  } catch (err) {
    res.status(401).json({ isLoggedIn: false, err });
  }
}
