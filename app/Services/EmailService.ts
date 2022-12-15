import Env from '@ioc:Adonis/Core/Env'
import Person from 'App/Models/Person'
import PasswordService from './PasswordService'
export default class EmailService {
  /**
   * Envia un correo electrónico mediante el servicio de SendGrid para
   * confirmar el correo dado por el nuevo usuario
   * @param email A quién le envió el correo
   * @param name Nombre del usuario o dueño nuevo
   * @param password Contraseña asignada por el sistema
   */
  public sendConfirmedEmail(email: string, name: string, password: string) {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(Env.get('SENDGRID_API_KEY'))

    const msg = {
      to: email,
      from: Env.get('SENDGRID_FROM_EMAIL'),

      subject: 'Credentials Go Parking',
      html:
        '<p>Hi <strong>' +
        name +
        '</strong></p>' +
        '<h1>Welcome to Go Parking</h1>' +
        '<p>Your account was created successfully</p>' +
        '<p>User : <strong>' +
        email +
        '</strong></p>' +
        '<p>Password : <strong>' +
        password +
        '</strong><em></em></p>',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  /**
   * Envia un correo electrónico mediante el servicio de SendGrid para
   * verificar el cambio de contraseña
   * @param emailTo A quién le envió el correo
   * @param theSubject Asunto del correo
   * @param theHTML Contenido del mensaje
   */
  public async sendNewPasswordEmail(emailTo: string, theSubject: string) {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(Env.get('SENDGRID_API_KEY'))
    let createNewPassword: PasswordService = new PasswordService()
    let newPassword: string = createNewPassword.createPassword(6)
    /**
     * Hacemos una consulta a base de datos para que cundo estemos
     * generando una nueva contraseña, se le asigne a ese usuario
     */
    const thePerson = await Person.query().where('email', emailTo).firstOrFail()
    if (thePerson) {
      thePerson.password = newPassword
      thePerson.save()
    }
    const msg = {
      to: emailTo,
      from: Env.get('SENDGRID_FROM_EMAIL'),
      subject: theSubject,
      html: `
      <h1><strong>Welcome to Go Parking</strong></h1>
      <h3>HI</h3>
      <p>Tu email es: <strong>${emailTo}</strong></p>
      <p>Tu nueva password: <strong>${newPassword}</strong></p>
      <p><em>Remember change your password for your security.</em></p>
      `,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.error(error)
      })
  }
}
