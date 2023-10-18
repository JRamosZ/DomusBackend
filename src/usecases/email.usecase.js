// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// const { CLIENTD_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;
// // const htmlTemplete = ;

// const oAuth2Client = new google.auth.OAuth2(
//   CLIENTD_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );

// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// const accessToken = oAuth2Client.getAccessToken();
// const createTrans = () => {
//   const transport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: "dogcatdomus@gmail.com",
//       clientId: CLIENTD_ID,
//       clientSecret: CLIENT_SECRET,
//       refreshToken: REFRESH_TOKEN,
//       accessToken: accessToken,
//     },
//   });
//   return transport;
// };

// const sendMail = async (user) => {
//   const transporter = createTrans();
//   const info = transporter.sendMail({
//     from: "dogcatdomus@gmail.com",
//     to: `${user.email}`,
//     subject: `Bienvenido a DOMUS, ${user.nickname}`,
//     html: `

//     <!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8" />
//         <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <style>
//     html {
//       font-family: sans-serif;}
//     .bg {
//       background-color: #ff6868;
//       color: #ffffff;
//       text-decoration: none;
//       text-align: center;
//       padding: 15px;
//       border-radius: 10px;
//     }
//     .image {
//       display: flex;
//       justify-content: center;
//     }
//     .parrafo {
//       font-size: 18px;
//       color: #2f2e43;
//     }

//     button {
//       background-color: #2f2e43;
//       font-size: 16px;
//       padding-left: 20px;
//       padding-right: 20px;
//       padding-top: 10px;
//       padding-bottom: 10px;
//       border-radius: 20px;
//       color: white;
//       border: 0px;
//       transition: 0.5s ease-out;
//     }
//     button:hover {
//       background-color: #ff6868;
//       box-shadow: #2f2e43 5px 5px 5px;
//       cursor: pointer;
//     }

//     @media only screen and (max-width: 600px) {
//       .image img {
//         width: 70%;
//       }
//       .parrafo {
//         font-size: 16px;
//       }
//     }
//     </style>
//       </head>
//       <body>
//         <main>
//           <h1 class="bg">DOMUS.COM.MX</h1>
//           <div class="image">
//             <img src="cid:huella" alt="" />
//           </div>
//           <div style="text-align: center">
//             <p class="parrafo">
//               Hola <strong>${user.nickname}</strong>, Gracias por unirte a <strong>DOMUS</strong>. Estamos muy
//               contentos de que estes con nosotros. verifica tu correo en el
//               siguiente botón.
//             </p>
//             <button>Verificar correo</button>
//             <p class="parrafo">
//               Busca cuidadores y contáctalos por la plataforma de una forma segura.
//               Recibirás actualizaciones diarias de tu mascota. ¿Suena bien no?. No
//               esperes más y encuentra al cuidador ideal para tu mascota.
//             </p>
//           </div>
//         </main>
//       </body>
//     </html>
//     `,
//     attachments: {
//       filename: "huella.png",
//       path: "./public/img/huella.png",
//       cid: "huella",
//     },
//   });
//   console.log("MENSAJE ENVIADO", info.messageId);
//   return;
// };

// exports.sendMail = (userEnv) => sendMail(userEnv);
