// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import Person from 'App/Models/Person'
import EmailService from 'App/Services/EmailService'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class SecuritiesController {
  public async login({ auth, request, response }) {
    const post = await request.validate({
      schema: schema.create({
        email: schema.string([rules.email(), rules.required()]),
        password: schema.string([rules.required()]),
      }),
    })

    const thePerson = await Person.findBy('email', post.email)

    if (thePerson) {
      if (await Hash.verify(thePerson.password, post.password)) {
        //Generación token
        const token = await auth.use('api').generate(thePerson, {
          expiresIn: '60 mins',
        })
        //Esto se pone despues que es para verificar el inicio de sesion
        //let servicioCorreo: EmailService = new EmailService()
        //servicioCorreo.sendConfirmedEmail(post.email, 'Nuevo Inicio de Sesión', post.password)
        //Obtiene los datos correspondientes a la relación
        await thePerson.load('rol')
        thePerson.password = ''
        return {
          token: token,
          user: thePerson,
        }
      } else {
        return response.unauthorized('Credenciales inválidas')
      }
    }
  }
  public async logout({ auth }) {
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  }
  public async forgotPassword({ request }) {
    let respuesta: Object = {}
    const email = request.input('email')
    const thePerson = await Person.findBy('email', email)
    if (!thePerson) {
      respuesta = {
        status: 'error',
        message: 'El correo no está registrado en la plataforma',
      }
    } else {
      let servicioCorreo: EmailService = new EmailService()
      servicioCorreo.sendNewPasswordEmail(email, 'Password Reset Request GoParking')
      respuesta = {
        status: 'success',
        message: 'Revisar el correo',
      }
    }
    return respuesta
  }
  public async resetPassword({ auth, request }) {
    let respuesta: Object = {}
    try {
      await auth.use('api').authenticate()
    } catch (error) {
      return {
        status: 'error',
        message: 'Token corrupto',
      }
    }
    const thePerson = await Person.findBy('email', auth.user!.email)
    if (!thePerson) {
      respuesta = {
        status: 'error',
        message: 'Este usuario no existe',
      }
    } else {
      thePerson.password = request.input('password')
      await thePerson.save()
      await auth.use('api').revoke()
      respuesta = {
        status: 'success',
        message: 'La contraseña se ha restaurado correctamente',
      }
    }
    return respuesta
  }
}
