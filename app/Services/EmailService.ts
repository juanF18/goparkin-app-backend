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

      subject: 'Credentials GoParking',

      html:
        "<div style='text-align: center; background: #6916c5; color: white; font-family: Helvetica; font-size: 13px;'>" +
        '<br>' +
        "<h1 style='font-family: Baloo Bhai; font-size: 30px;'>GoParking</h1>" +
        '<p>Hi <strong> ' +
        name +
        ', </strong> welcome !</p>' +
        '<p>User : <strong> ' +
        email +
        ' </strong></p>' +
        '<p>Password : <strong> ' +
        password +
        ' </strong></p>' +
        "<button type='button' style='background: #5cb85c; cursor: pointer; font-family: Helvetica; font-size: 13px; color:white; width: 80px; height: 28px; border-radius: 4px; border-color: #5cb85c' href='http://192.168.1.8:3000/login' target='_blank'> Sign in </button>" +
        '<br>' +
        '<br>' +
        '<br>' +
        '</div>',
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
        <div style='text-align: center; background: #6916c5; color: white; font-family: Helvetica; font-size: 13px;'>
        <br>
        <h1 style='font-family: Baloo Bhai; font-size: 30px;'>GoParking</h1>
        <p>Hi, our new credentials</p>
        <p>User : <strong> ${emailTo} </strong></p>
        <p>Password : <strong> ${newPassword} </strong></p>
        <p><em>Remember change your password for your security.</p>
        <br>
        <br>
        <br>
        </div>
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
