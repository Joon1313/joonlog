import * as argon2 from "argon2";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//auth
export default async function handler(req, res) {
  if (req.method !== "POST")
    res.status(405).json({ message: "not allow method" });
  const { user_id, password } = req.body;
  if (!user_id || !password)
    res.status(400).json({ message: "user_id or password empty" });
  const admin = await prisma.admin.findUnique({
    where: {
      user_id,
    },
  });
  if (!admin) res.status(404).json({ message: "not found admin" });
  try {
    if (await argon2.verify(admin.password, password)) {
      return res.status(200).json({ message: "match !!" });
    } else {
      return res.status(400).json({ message: "not match !!" });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
}

//craete
// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { user_id, password } = req.body;
//     if (!user_id || !password)
//       return res.status(400).json({ message: "user_id or password empty" });
//     try {
//       const hash = await argon2.hash(password);
//       const auth = await prisma.admin.create({
//         data: {
//           user_id,
//           password: hash,
//         },
//       });
//       return res.status(200).json(auth);
//     } catch (err) {
//       return res.status(400).json({ message: "argon2 hash fail.." });
//     }
//   }
// }
