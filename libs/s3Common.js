import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./s3Client";

const S3_URL = "https://camlogs3.s3.ap-northeast-2.amazonaws.com/";

const makeParams = (blob, title) => {
  const 제목 = title();
  const param = {
    Bucket: "camlogs3",
    Key: `${제목}/${blob.name}`,
    Body: blob,
    ContentType: blob.type,
  };
  return param;
};
const uploadImage = async (param) => {
  try {
    await s3.send(new PutObjectCommand(param));
    const location = S3_URL + param.Key;
    return location;
  } catch (err) {
    console.log("Error", err);
  }
};

export { makeParams, uploadImage };
