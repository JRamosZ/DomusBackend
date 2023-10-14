require("dotenv").config();

const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("../lib/s3Client");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const saveUpload = async (routeData, files) => {
  let uploadedData = [];
  for await (const file of files) {
    let randNumber = Math.floor(Math.random() * 1000 + 1);
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: `${routeData.folder}/${routeData.id}/${
        file.originalname.replaceAll(" ", "").split(".")[0]
      }-${randNumber}.${file.originalname.split(".")[1]}`,
      Body: file.buffer,
    };
    const result = await s3Client.send(new PutObjectCommand(params));
    // Escribir el código para subir el nombre del archivo a las bases de datos relacionadas
    uploadedData.push({ params, result });
  }
  return uploadedData;
};

const getPicture = (pictureName) => {
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: pictureName,
    ACL: "public-read",
  };
  const command = new GetObjectCommand(params);
  const url = getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return url;
};

module.exports = { saveUpload, getPicture };
