import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./s3Client";

const makeParams = (blob, title) => {
  const param = {
    Bucket: process.env.BUCKET,
    Key: `${title}/${blob.name}`,
    Body: blob,
    ContentType: blob.type,
  };
  return param;
};

const uploadImage = async (param) => {
  try {
    await s3.send(new PutObjectCommand(param));
    const location = process.env.S3_URL + param.Key;
    return location;
  } catch (err) {
    console.log("Error", err);
  }
};

export { makeParams, uploadImage };
