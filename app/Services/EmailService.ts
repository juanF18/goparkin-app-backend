import Env from '@ioc:Adonis/Core/Env'
export default class EmailService {

  /**
   * Envia un correo electrónico mediante el servicio de SendGrid para
   * confirmar el correo dado por el nuevo usuario
   * @param email A quién le envió el correo
   * @param name Nombre del usuario o dueño nuevo
   * @param password Contraseña asignada por el sistema
   */
  sendConfirmedEmail(email, name, password) {

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(Env.get('SENDGRID_API_KEY'))

    const msg = {
      to: email,
      from: Env.get('SENDGRID_FROM_EMAIL'),

      subject: "Credentials Go Parking",
      html: "<p>Hi <strong>"+name+"</strong></p>" +
        "<p>Welcome to Go Parking</p>" +
        "<p>User : <strong>"+email+"</strong></p>" +
        "<p>Password : <strong>"+password+"</strong><em></em></p>" +
        "<p><em>Remember change your password for your security.</em></p>"

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
