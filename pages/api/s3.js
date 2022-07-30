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
      const param = {
        Bucket: process.env.BUCKET,
        Key: `${data.fields.title}/${data.files.blob.originalFilename}`,
        Body: data.files.blob,
        ContentType: data.files.blob.mi,
      };
      try {
        await s3.send(new PutObjectCommand(param));
        const location = process.env.S3_URL + param.Key;
        return location;
      } catch (err) {
        console.log("aws s3 error", err);
      }
      break;
    default:
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
      break;
  }
}
