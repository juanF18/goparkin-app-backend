import Env from '@ioc:Adonis/Core/Env'
export default class EmailService {

  /**
   * Envia un correo electrónico mediante el servicio de SendGrid para
   * confirmar el correo dado por el nuevo usuario
   * @param email A quién le envió el correo
   * @param name Nombre del usuario o dueño nuevo
   * @param password Contraseña asignada por el sistema
   */
  sendConfirmedEmail(email: string, name: string, password: string) {

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(Env.get('SENDGRID_API_KEY'))

    const msg = {
      to: email,
      from: Env.get('SENDGRID_FROM_EMAIL'),

      subject: "Credentials GoParking",

      html: "<div style='text-align: center; background: #6916c5; color: white; font-family: Helvetica; font-size: 13px;'>" +
        "<br>" +
        "<h1 style='font-family: Baloo Bhai; font-size: 30px;'>GoParking</h1>" +
        "<p>Hi <strong> " + name + ", </strong> welcome !</p>" +
        "<p>User : <strong> " + email + " </strong></p>" +
        "<p>Password : <strong> " + password + " </strong></p>" +
        "<button type='button' style='background: #5cb85c; cursor: pointer; font-family: Helvetica; font-size: 13px; color:white; width: 80px; height: 28px; border-radius: 4px; border-color: #5cb85c' href='http://localhost:3333/login' target='_blank'> Sign in </button>" +
        "<br>" +
        "<br>" +
        "<br>" +
        "</div>"

    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  /**
   *
   * Dejo la estructura básica para que la modifiquen en el correo que se envía
   * al recuperar la contraseña
   *
   *
 * Envia un correo electrónico mediante el servicio de SendGrid para
 * verificar el cambio de contraseña
 * @param emailTo A quién le envió el correo
 * @param theSubject Asunto del correo
 * @param theHTML Contenido del mensaje
 */
  sendNewPasswordEmail(emailTo, theSubject, theHTML) {

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(Env.get('SENDGRID_API_KEY'))
    const msg = {
      to: emailTo,
      from: Env.get('SENDGRID_FROM_EMAIL'),
      subject: theSubject,
      html: theHTML,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
