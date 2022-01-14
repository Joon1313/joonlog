import { getTokenCookie } from "./auth-cookies";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";

export async function getLoginSession(req) {
  const token = getTokenCookie(req);
  if (!token) throw new Error("not found token");
  const auth = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
  return auth;
}

export async function passwordVerify(password, textPassword) {
  const verify = await argon2.verify(password, textPassword);
  return verify;
}
export function createToken(user_id) {
  const token = jwt.sign({ _id: user_id }, process.env.NEXT_PUBLIC_SECRET_KEY);
  return token;
}
