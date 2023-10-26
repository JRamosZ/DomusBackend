const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { CLIENTD_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;
// const htmlTemplete = ;
const REFRESH_TOKEN =
  "1//04DEJtxTXdGoICgYIARAAGAQSNwF-L9IrWUt8LnWn6VyYipK_9tWHdGrvqCB-EFsMEHNsN8iRfQCk01WrEUz_87uFUJ7OBTJul_U";
const oAuth2Client = new google.auth.OAuth2(
  CLIENTD_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendEmail = async (user, token) => {
  
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "dogcatdomus@gmail.com",
        clientId: CLIENTD_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    
    const result = await transporter.sendMail({
      from: "info 🐶😺 <dogcatdomus@gmail.com>",
      to: `${user?.email}`,
      subject: `Bienvenido a DOMUS, ${user?.nickname}`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
      html {
        font-family: sans-serif;}
      .bg {
        background-color: #ff6868;
        color: #ffffff;
        text-decoration: none;
        text-align: center;
        padding: 15px;
        border-radius: 10px;
      }
      .image {
        display: flex;
        justify-content: center;
      }
      .parrafo {
        font-size: 18px;
        color: #2f2e43;
      }
      
      button {
        background-color: #2f2e43;
        font-size: 16px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 20px;
        color: white;
        border: 0px;
        transition: 0.5s ease-out;
      }
      button:hover {
        background-color: #ff6868;
        box-shadow: #2f2e43 5px 5px 5px;
        cursor: pointer;
      }
      .domus {
        font-weight: bold;
        text-align: center;
        margin-top: 50px;
        line-height: 0px;
      }
      
      
      @media only screen and (max-width: 600px) {
        .image img {
          width: 70%;
        }
        .parrafo {
          font-size: 16px;
        }
      }
      </style>
        </head>
        <body>
          <main>
            <h1 class="bg">DOMUS.COM.MX</h1>
            <div class="image">
              <img src="cid:huella" alt="" />
            </div>
            <div style="text-align: center">
            <h2>Hola ${user.nickname} Gracias por unirte a <strong>DOMUS</strong></h2>
              <p class="parrafo">
                Estamos muy
                contentos de que estes con nosotros. verifica tu correo en el
                siguiente enlace.
              </p>
              <a href="http://localhost:8080/users/confirm/${token}">${token}</a>
             
              <p class="parrafo">
                Busca cuidadores y contáctalos por la plataforma de una forma segura.
                Recibirás actualizaciones diarias de tu mascota. ¿Suena bien no?. No
                esperes más y encuentra al cuidador ideal para tu mascota.
              </p>
            </div>
            <div class="domus">
            <h5>ATENTAMENTE</h5>
            <p>Equipo DOMUS.</p>
          </div>
          </main>
        </body>
      </html>
      `,
      attachments: {
        filename: "huella.png",
        path: "./public/img/huella.png",
        cid: "huella",
      },
    });
    return result;
  } catch (error) {
   
  }
};
sendEmail();

module.exports = { sendEmail };
