import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const data = await new Promise((resolve, reject) => {
        const form = formidable();
        form.parse(req, (err, fields, files) => {
          if (err) {
            reject({ err });
          }
          resolve({ err, fields, files });
        });
      });
      const buffer = Buffer.from(JSON.stringify(data.files.blob)).toString(
        "base64"
      );
      const uploadPath = `${data.fields.title}/${data.files.blob.originalFilename}`;
      const param = {
        Bucket: process.env.BUCKET,
        Key: uploadPath,
        Body: buffer,
        ContentType: data.files.blob.mimetype,
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
