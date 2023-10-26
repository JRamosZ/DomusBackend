const newBookingClient = (data) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
      html {
        font-family: sans-serif;
        background-color: #ffffff;
      }
      .bg {
        background-color: #ff7068;
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

      .parrafo_2 {
        color: #2f2e43;
        font-size: 14px;
        margin-top: 50px;
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
        transition: 0.2s ease-out;
      }
      button:hover {
        background-color: #ff6868;
        box-shadow: #2f2e43 5px 5px 5px;
        cursor: pointer;
      }

      a {
        text-decoration: none;
        color: #ffffff;
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
        .parrafo_2 {
            font-size: 14px;
          }
      }
      </style>
        </head>
        <body>
          <main>
            <h1 class="bg">DOMUS.COM.MX</h1>
            <div class="image">
              <img src="https://domus-bucket.s3.amazonaws.com/assets/huella.png" alt="Domus.com.mx" />
            </div>
            <div style="text-align: center">
                <h2>Hola ${data.client.name}, acabas de realizar una solicitud de reserva a <strong>${data.host.name} ${data.host.lastname}.</strong></h2>
                <p class="parrafo">
                Te invitamos a estar al pendiente de tu correo o cuenta en Domus para que te enteres en el momento que tu reserva haya sido aceptada.
                </p>
                <button><a href="https://www.domus.com.mx/accounts/signin">Ir a mi perfil</a></button>
                <br>
                <br>
                <br>
                <br>
                <br>
                <p class="parrafo_2">
                    Busca cuidadores y contáctalos por la plataforma de una forma segura.
                    Recibirás actualizaciones diarias de tu mascota, ¿suena bien no? No
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
      `;
};

const newBookingHost = (data) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
  html {
    font-family: sans-serif;
    background-color: #ffffff;
  }
  .bg {
    background-color: #ff7068;
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

  .parrafo_2 {
    color: #2f2e43;
    font-size: 14px;
    margin-top: 50px;
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
    transition: 0.2s ease-out;
  }
  button:hover {
    background-color: #ff6868;
    box-shadow: #2f2e43 5px 5px 5px;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: #ffffff;
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
    .parrafo_2 {
        font-size: 14px;
      }
  }
  </style>
    </head>
    <body>
      <main>
        <h1 class="bg">DOMUS.COM.MX</h1>
        <div class="image">
          <img src="https://domus-bucket.s3.amazonaws.com/assets/huella.png" alt="Domus.com.mx" />
        </div>
        <div style="text-align: center">
        <h2>Hola ${data.host.name}, acabas de recibir una solicitud de reserva por parte de <strong>${data.client.name} ${data.client.lastname}.</strong></h2>
        <p class="parrafo">
          Te invitamos a que vayas a tu perfil y des clic en Aceptar. Recuerda que puedes visitar el perfil de ${data.client.name} ${data.client.lastname} y ver su información general, lista de mascotas y reseñas de servicios anteriores.
        </p>
            <button><a href="https://www.domus.com.mx/accounts/signin">Ir a mi perfil</a></button>
            <br>
            <br>
            <br>
            <br>
            <br>
            <p class="parrafo_2">
                Busca cuidadores y contáctalos por la plataforma de una forma segura.
                Recibirás actualizaciones diarias de tu mascota, ¿suena bien no? No
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
  `;
};

const cancelBookingClient = (data) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
  html {
    font-family: sans-serif;
    background-color: #ffffff;
  }
  .bg {
    background-color: #ff7068;
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

  .parrafo_2 {
    color: #2f2e43;
    font-size: 14px;
    margin-top: 50px;
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
    transition: 0.2s ease-out;
  }
  button:hover {
    background-color: #ff6868;
    box-shadow: #2f2e43 5px 5px 5px;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: #ffffff;
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
    .parrafo_2 {
        font-size: 14px;
      }
  }
  </style>
    </head>
    <body>
      <main>
        <h1 class="bg">DOMUS.COM.MX</h1>
        <div class="image">
          <img src="https://domus-bucket.s3.amazonaws.com/assets/huella.png" alt="Domus.com.mx" />
        </div>
        <div style="text-align: center">
        <h2>Hola ${data.client.name}, tu solicitud de reservación acaba de ser cancelada por <strong>${data.host.name} ${data.host.lastname}.</strong></h2>
                  <p class="parrafo">
                    Te invitamos a que realices una nueva búsqueda, tenemos muchos anfitriones disponibles que recibirán a ${data.pet[0].name} con mucho gusto.
                  </p>
            <button><a href="https://www.domus.com.mx/accounts/signin">Ir a mi perfil</a></button>
            <br>
            <br>
            <br>
            <br>
            <br>
            <p class="parrafo_2">
                Busca cuidadores y contáctalos por la plataforma de una forma segura.
                Recibirás actualizaciones diarias de tu mascota, ¿suena bien no? No
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
  `;
};

const cancelBookingHost = (data) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
    html {
      font-family: sans-serif;
      background-color: #ffffff;
    }
    .bg {
      background-color: #ff7068;
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
  
    .parrafo_2 {
      color: #2f2e43;
      font-size: 14px;
      margin-top: 50px;
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
      transition: 0.2s ease-out;
    }
    button:hover {
      background-color: #ff6868;
      box-shadow: #2f2e43 5px 5px 5px;
      cursor: pointer;
    }
  
    a {
      text-decoration: none;
      color: #ffffff;
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
      .parrafo_2 {
          font-size: 14px;
        }
    }
    </style>
      </head>
      <body>
        <main>
          <h1 class="bg">DOMUS.COM.MX</h1>
          <div class="image">
            <img src="https://domus-bucket.s3.amazonaws.com/assets/huella.png" alt="Domus.com.mx" />
          </div>
          <div style="text-align: center">
          <h2>Hola ${data.host.name}, acabas de cancelar la solicitud de reserva de <strong>${data.client.name} ${data.client.lastname}.</strong></h2>
                    <p class="parrafo">
                      En esta ocasión no fue posible concretar esta reserva, pero esperamos que en las siguientes no tengas inconvenientes y puedas recibir en casa a ${data.pet[0].name} o a cualquier otra mascota.
                    </p>
              <button><a href="https://www.domus.com.mx/accounts/signin">Ir a mi perfil</a></button>
              <br>
              <br>
              <br>
              <br>
              <br>
              <p class="parrafo_2">
                  Busca cuidadores y contáctalos por la plataforma de una forma segura.
                  Recibirás actualizaciones diarias de tu mascota, ¿suena bien no? No
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
    `;
};

const acceptedBookingClient = (data) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
  html {
    font-family: sans-serif;
    background-color: #ffffff;
  }
  .bg {
    background-color: #ff7068;
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

  .parrafo_2 {
    color: #2f2e43;
    font-size: 14px;
    margin-top: 50px;
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
    transition: 0.2s ease-out;
  }
  button:hover {
    background-color: #ff6868;
    box-shadow: #2f2e43 5px 5px 5px;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: #ffffff;
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
    .parrafo_2 {
        font-size: 14px;
      }
  }
  </style>
    </head>
    <body>
      <main>
        <h1 class="bg">DOMUS.COM.MX</h1>
        <div class="image">
          <img src="https://domus-bucket.s3.amazonaws.com/assets/huella.png" alt="Domus.com.mx" />
        </div>
        <div style="text-align: center">
        <h2>Hola ${data.client.name}, tu solicitud de reservación acaba de ser aprobada por <strong>${data.host.name} ${data.host.lastname}.</strong></h2>
        <p class="parrafo">
          Te invitamos a que realices el pago lo más pronto posible para confirmar tu reserva.
        </p>
            <button><a href="https://www.domus.com.mx/accounts/signin">Ir a mi perfil</a></button>
            <br>
            <br>
            <br>
            <br>
            <br>
            <p class="parrafo_2">
                Busca cuidadores y contáctalos por la plataforma de una forma segura.
                Recibirás actualizaciones diarias de tu mascota, ¿suena bien no? No
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
  `;
};

const acceptedBookingHost = (data) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
    html {
      font-family: sans-serif;
      background-color: #ffffff;
    }
    .bg {
      background-color: #ff7068;
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
  
    .parrafo_2 {
      color: #2f2e43;
      font-size: 14px;
      margin-top: 50px;
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
      transition: 0.2s ease-out;
    }
    button:hover {
      background-color: #ff6868;
      box-shadow: #2f2e43 5px 5px 5px;
      cursor: pointer;
    }
  
    a {
      text-decoration: none;
      color: #ffffff;
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
      .parrafo_2 {
          font-size: 14px;
        }
    }
    </style>
      </head>
      <body>
        <main>
          <h1 class="bg">DOMUS.COM.MX</h1>
          <div class="image">
            <img src="https://domus-bucket.s3.amazonaws.com/assets/huella.png" alt="Domus.com.mx" />
          </div>
          <div style="text-align: center">
          <h2>Hola ${data.host.name}, la solicitud de reservación de <strong>${data.client.name} ${data.client.lastname}</strong> acaba de ser aprobada.</h2>
          <p class="parrafo">
          Te invitamos a estar al pendiente de tu correo o cuenta en Domus para que te enteres en el momento que el pago de la reserva se haya concretado.
          </p>
              <button><a href="https://www.domus.com.mx/accounts/signin">Ir a mi perfil</a></button>
              <br>
              <br>
              <br>
              <br>
              <br>
              <p class="parrafo_2">
                  Busca cuidadores y contáctalos por la plataforma de una forma segura.
                  Recibirás actualizaciones diarias de tu mascota, ¿suena bien no? No
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
    `;
};

const paidBookingClient = (data) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
  html {
    font-family: sans-serif;
    background-color: #ffffff;
  }
  .bg {
    background-color: #ff7068;
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

  .parrafo_2 {
    color: #2f2e43;
    font-size: 14px;
    margin-top: 50px;
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
    transition: 0.2s ease-out;
  }
  button:hover {
    background-color: #ff6868;
    box-shadow: #2f2e43 5px 5px 5px;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: #ffffff;
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
    .parrafo_2 {
        font-size: 14px;
      }
  }
  </style>
    </head>
    <body>
      <main>
        <h1 class="bg">DOMUS.COM.MX</h1>
        <div class="image">
          <img src="https://domus-bucket.s3.amazonaws.com/assets/huella.png" alt="Domus.com.mx" />
        </div>
        <div style="text-align: center">
        <h2>Hola ${data.client.name}, se ha realizado la confirmación de tu pago, pronto <strong>${data.host.name} ${data.host.lastname}</strong> estará cuidando de ${data.pet[0].name}.</h2>
        <p class="parrafo">
          Te invitamos a que sigas las recomendaciones que ${data.host.name} ${data.host.lastname} puso en su perfil, con la intención de que la estancia de ${data.pet[0].name} sea la más agradable.
        </p>
            <button><a href="https://www.domus.com.mx/accounts/signin">Ir a mi perfil</a></button>
            <br>
            <br>
            <br>
            <br>
            <br>
            <p class="parrafo_2">
                Busca cuidadores y contáctalos por la plataforma de una forma segura.
                Recibirás actualizaciones diarias de tu mascota, ¿suena bien no? No
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
  `;
};

const paidBookingHost = (data) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
  html {
    font-family: sans-serif;
    background-color: #ffffff;
  }
  .bg {
    background-color: #ff7068;
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

  .parrafo_2 {
    color: #2f2e43;
    font-size: 14px;
    margin-top: 50px;
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
    transition: 0.2s ease-out;
  }
  button:hover {
    background-color: #ff6868;
    box-shadow: #2f2e43 5px 5px 5px;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: #ffffff;
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
    .parrafo_2 {
        font-size: 14px;
      }
  }
  </style>
    </head>
    <body>
      <main>
        <h1 class="bg">DOMUS.COM.MX</h1>
        <div class="image">
          <img src="https://domus-bucket.s3.amazonaws.com/assets/huella.png" alt="Domus.com.mx" />
        </div>
        <div style="text-align: center">
        <h2>Hola ${data.host.name}, se ha realizado la confirmación del pago de <strong>${data.client.name} ${data.client.lastname}</strong>, pronto estarás cuidando de ${data.pet[0].name}.</h2>
        <p class="parrafo">
          Te invitamos a que revises las recomendaciones que ${data.client.name} ${data.client.lastname} puso en su perfil, con la intención de que la estancia de ${data.pet[0].name} sea la más agradable.
        </p>
            <button><a href="https://www.domus.com.mx/accounts/signin">Ir a mi perfil</a></button>
            <br>
            <br>
            <br>
            <br>
            <br>
            <p class="parrafo_2">
                Busca cuidadores y contáctalos por la plataforma de una forma segura.
                Recibirás actualizaciones diarias de tu mascota, ¿suena bien no? No
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
  `;
};

const concludedBookingClient = (data) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
  html {
    font-family: sans-serif;
    background-color: #ffffff;
  }
  .bg {
    background-color: #ff7068;
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

  .parrafo_2 {
    color: #2f2e43;
    font-size: 14px;
    margin-top: 50px;
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
    transition: 0.2s ease-out;
  }
  button:hover {
    background-color: #ff6868;
    box-shadow: #2f2e43 5px 5px 5px;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: #ffffff;
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
    .parrafo_2 {
        font-size: 14px;
      }
  }
  </style>
    </head>
    <body>
      <main>
        <h1 class="bg">DOMUS.COM.MX</h1>
        <div class="image">
          <img src="https://domus-bucket.s3.amazonaws.com/assets/huella.png" alt="Domus.com.mx" />
        </div>
        <div style="text-align: center">
        <h2>Hola ${data.client.name}, se ha concluido tu reserva con <strong>${data.host.name} ${data.host.lastname}.</strong></h2>
                      <p class="parrafo">
                        Esperamos que la estancia de ${data.pet[0].name} haya sido la mejor. Te pedimos que nos apoyes dejando una reseña dentro de la bitácora para que esta información sea de utilidad para otros miembros de la comunidad.
                      </p>
            <button><a href="https://www.domus.com.mx/accounts/signin">Ir a mi perfil</a></button>
            <br>
            <br>
            <br>
            <br>
            <br>
            <p class="parrafo_2">
                Busca cuidadores y contáctalos por la plataforma de una forma segura.
                Recibirás actualizaciones diarias de tu mascota, ¿suena bien no? No
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
  `;
};

const concludedBookingHost = (data) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
  html {
    font-family: sans-serif;
    background-color: #ffffff;
  }
  .bg {
    background-color: #ff7068;
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

  .parrafo_2 {
    color: #2f2e43;
    font-size: 14px;
    margin-top: 50px;
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
    transition: 0.2s ease-out;
  }
  button:hover {
    background-color: #ff6868;
    box-shadow: #2f2e43 5px 5px 5px;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: #ffffff;
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
    .parrafo_2 {
        font-size: 14px;
      }
  }
  </style>
    </head>
    <body>
      <main>
        <h1 class="bg">DOMUS.COM.MX</h1>
        <div class="image">
          <img src="https://domus-bucket.s3.amazonaws.com/assets/huella.png" alt="Domus.com.mx" />
        </div>
        <div style="text-align: center">
        <h2>Hola ${data.host.name}, se ha concluido tu reserva con <strong>${data.client.name} ${data.client.lastname}.</strong></h2>
        <p class="parrafo">
          Esperamos que el tiempo que compartiste con ${data.pet[0].name} haya sido el mejor. Te pedimos que nos apoyes dejando una reseña dentro de la bitácora para que esta información sea de utilidad para otros miembros de la comunidad.
        </p>
            <button><a href="https://www.domus.com.mx/accounts/signin">Ir a mi perfil</a></button>
            <br>
            <br>
            <br>
            <br>
            <br>
            <p class="parrafo_2">
                Busca cuidadores y contáctalos por la plataforma de una forma segura.
                Recibirás actualizaciones diarias de tu mascota, ¿suena bien no? No
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
  `;
};

const currentBookingClient = (data) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
    html {
      font-family: sans-serif;
      background-color: #ffffff;
    }
    .bg {
      background-color: #ff7068;
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
  
    .parrafo_2 {
      color: #2f2e43;
      font-size: 14px;
      margin-top: 50px;
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
      transition: 0.2s ease-out;
    }
    button:hover {
      background-color: #ff6868;
      box-shadow: #2f2e43 5px 5px 5px;
      cursor: pointer;
    }
  
    a {
      text-decoration: none;
      color: #ffffff;
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
      .parrafo_2 {
          font-size: 14px;
        }
    }
    </style>
      </head>
      <body>
        <main>
          <h1 class="bg">DOMUS.COM.MX</h1>
          <div class="image">
            <img src="https://domus-bucket.s3.amazonaws.com/assets/huella.png" alt="Domus.com.mx" />
          </div>
          <div style="text-align: center">
          <h2>Hola ${data.client.name}, hoy da inicio tu reserva con <strong>${data.host.name} ${data.host.lastname}.</strong></h2>
          <p class="parrafo">
            Por favor, lleva a ${data.pet[0].name} en el horario indicado. Si tienes alguna pregunta o comentario, no dudes en contactar a ${data.host.name} ${data.host.lastname} a través de los medios de contacto descritos en la bitácora.
          </p>
              <button><a href="https://www.domus.com.mx/accounts/signin">Ir a mi perfil</a></button>
              <br>
              <br>
              <br>
              <br>
              <br>
              <p class="parrafo_2">
                  Busca cuidadores y contáctalos por la plataforma de una forma segura.
                  Recibirás actualizaciones diarias de tu mascota, ¿suena bien no? No
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
    `;
};

const currentBookingHost = (data) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
    html {
      font-family: sans-serif;
      background-color: #ffffff;
    }
    .bg {
      background-color: #ff7068;
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
  
    .parrafo_2 {
      color: #2f2e43;
      font-size: 14px;
      margin-top: 50px;
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
      transition: 0.2s ease-out;
    }
    button:hover {
      background-color: #ff6868;
      box-shadow: #2f2e43 5px 5px 5px;
      cursor: pointer;
    }
  
    a {
      text-decoration: none;
      color: #ffffff;
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
      .parrafo_2 {
          font-size: 14px;
        }
    }
    </style>
      </head>
      <body>
        <main>
          <h1 class="bg">DOMUS.COM.MX</h1>
          <div class="image">
            <img src="https://domus-bucket.s3.amazonaws.com/assets/huella.png" alt="Domus.com.mx" />
          </div>
          <div style="text-align: center">
          <h2>Hola ${data.host.name}, hoy da inicio tu reserva con <strong>${data.client.name} ${data.client.lastname}.</strong></h2>
          <p class="parrafo">
          ${data.client.name} ${data.client.lastname} y ${data.pet[0].name} estarán llegando a tu casa en el horario descrito por lo que te pedimos tener todo listo. Si tienes alguna pregunta o comentario, no dudes en contactar a ${data.client.name} ${data.client.lastname} a través de los medios de contacto descritos en la bitácora.
          </p>
              <button><a href="https://www.domus.com.mx/accounts/signin">Ir a mi perfil</a></button>
              <br>
              <br>
              <br>
              <br>
              <br>
              <p class="parrafo_2">
                  Busca cuidadores y contáctalos por la plataforma de una forma segura.
                  Recibirás actualizaciones diarias de tu mascota, ¿suena bien no? No
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
    `;
};

module.exports = {
  newBookingClient,
  newBookingHost,
  cancelBookingClient,
  cancelBookingHost,
  acceptedBookingClient,
  acceptedBookingHost,
  paidBookingClient,
  paidBookingHost,
  concludedBookingClient,
  concludedBookingHost,
  currentBookingClient,
  currentBookingHost,
};
