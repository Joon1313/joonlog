import { getTokenCookie } from "./auth-cookies";
import jwt from "jsonwebtoken";

export async function getLoginSession(req) {
  const token = getTokenCookie(req);
  if (!token) throw new Error("not found token");
  const auth = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
  return auth;
}
