const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt.lib");
const createError = require("http-errors");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("../lib/s3Client");
const { sendEmail } = require("./email.usecase");

const BASE_URL = process.env.BASE_URL;

const list = (filter) => {
  const userList = User.find(filter);
  return userList;
};

const getById = async (id) => {
  const user = await User.findById(id)
    // .populate(["pets", "accommodation", "reviews"])
    .populate([
      "pets",
      "accommodation",
      {
        path: "reviews",
        populate: { path: "sender", select: ["name", "lastname", "picture"] },
      },
      {
        path: "reviews",
        populate: { path: "receiver", select: ["name", "lastname", "picture"] },
      },
      {
        path: "reservations",
        select: ["_id", "host", "client", "startDate", "finishDate", "status", "cost"],
        populate: [
          {
            path: "host",
            select: ["name", "lastname", "client", "_id", "picture"],
          },
          {
            path: "client",
            select: ["name", "lastname", "client", "_id", "picture"],
          },
        ],
      },
    ])
    .exec();
  if (!user) throw createError(404, "User not found");
  return user;
};

const create = async (data) => {
  const saltRounds = 10;
  const { email } = data;
  let user = (await User.findOne({ email })) || null;
  if (user != null) throw createError(409, "Ya existe una cuenta asociada a este correo, favor de iniciar sesión con ella o regístrate con un nuevo correo");
  data.password = await bcrypt.hash(data.password, saltRounds);
  data.picture = `https://ui-avatars.com/api/?name=${data.nickname}`;
  user = new User(data);
  //generar token
  const token = jwt.sign({ email: user.email });
  //Obtenemos el templete
  //const templete = getTemplete(user, token);
  //Enviamos el email
  await sendEmail(data, token);
  // await user.save()
  user = User.create(data);
  return user;
};

const confirm = async (req, res) => {
  //optener el token
  const { token } = req.params;
  // verificar la data
  const data = await jwt.getTokenData(token);

  if (data === null) {
    return res.json({
      success: false,
      msg: "Error al obtener data",
    });
  }

  const { email } = data;

  //Verificar existencia del usuario
  const user = (await User.findOne({ email })) || null;

  if (user === null) {
    return res.json({
      notFound: true,
      success: false,
      msg: "usuario no existe",
    });
  }

  // Verificar el codigo
  if (email !== user.email) {
    return res.redirect("../public/error.html");
  }

  //Actualizar usuario
  user.isMailValidated = true;
  await user.save();

  // Redireccionar al a cofirmacion
  return res.redirect(`${BASE_URL}/accounts/signin`);
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw createError(400, "Usuario o Contraseña incorrectos");
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) throw createError(400, "Usuario o Contraseña incorrectos");
  if (!user.isMailValidated) throw createError(400, "Tu correo aún no ha sido validado, revisa tu bandeja de entrada");

  const token = jwt.sign({
    id: user._id,
    userType: user.type,
    userImage: user.picture,
    userNickName: user.nickname,
  });
  return token;
};

const update = async (id, data, folderName, fileData) => {
  const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
  data.birthday = new Date(data.birthday);

  // Uploading picture
  const fileName = `${folderName}/${id}/${new Date().getTime()}-${fileData.originalname}`.replaceAll(" ", "");
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileData.buffer,
  };
  const result = await s3Client.send(new PutObjectCommand(params));
  if (!result) throw createError(404, "File not uploaded");
  const url = `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
  data.picture = url;

  // Updating info into DB
  const updatedUser = await User.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
  if (!updatedUser) throw createError(404, "User not updated");
  return updatedUser;
};

const deleteById = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) throw createError(404, "User not deleted");
  return deletedUser;
};

module.exports = { list, getById, create, update, deleteById, login, confirm };
