import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { title, name, base64 } = req.body;
      const type = base64.split(";")[0].split("/")[1];
      const buffer = Buffer.from(
        base64.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      const uploadPath = `${title}/${name}`;
      const param = {
        Bucket: process.env.BUCKET,
        Key: uploadPath,
        Body: buffer,
        ContentEncoding: "base64",
        ContentType: `image/${type}`,
      };
      try {
        await s3.send(new PutObjectCommand(param));
        const location = process.env.S3_URL + param.Key;
        res.status(200).json({ message: "success", location: location });
      } catch (err) {
        console.log("aws s3 error", err);
        res.status(400).json({ message: "s3 error" });
      }
      break;
    default:
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
      break;
  }
}
