const { S3Client } = require("@aws-sdk/client-s3");
// Set the AWS Region.
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: AWS_BUCKET_REGION,
  httpOptions: {
    timeout: 90000,
  },
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
  params: {
    ACL: "public-read",
    Bucket: AWS_BUCKET_NAME,
  },
});

module.exports = { s3Client };
