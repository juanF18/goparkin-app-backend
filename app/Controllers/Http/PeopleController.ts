import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Person from 'App/Models/Person'
import Encryption from '@ioc:Adonis/Core/Encryption'
import EmailService from 'App/Services/EmailService'

export default class PeopleController {
  /**
   * Lista todas las personas
   * @returns retorna todas las personas
   */

  public async index(ctx: HttpContextContract) {
    let persons: Person[] = await Person.query()
    return persons
  }

  /**
   *  Muestra persona y documento segun el id
   * @param param : id de la persona
   * @returns Retorna el usuario y el documento.
   */
  public async showDocument(ctx: HttpContextContract) {
    let people = await Person.query().where('id_rol', 2).preload('documents').preload('parkings')
    return people
  }

  /**
   * Almacena una nueva persona
   * @param request Toma los valores del body
   * @returns retorna la persona agregada
   */

  public async store({ request }: HttpContextContract) {
    // Recupera la data desde la soliciud
    const body = request.body()

    // Genera una instancia del servicio de correos
    let emailService: EmailService = new EmailService()
    // Envía el correo de confirmación con las credenciales de inicio de sesión
    emailService.sendConfirmedEmail(body.email, body.name, body.password)

    // Crea la persona
    let person: Person = await Person.create(body)
    return person
  }

  /**
   * Muestra una persona según un id
   * @param params Toma los valores de la ruta
   * @returns persona
   */
  public async show({ params }: HttpContextContract) {
    let person = await Person.query().where('id', params.id)
    return person
  }

  /**
   * Actualiza una persona basada en un id
   * @param request toma los valores del body
   * @param params toma los valores del la ruta
   * @returns retorna la persona actualizada
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const person: Person = await Person.findOrFail(params.id)
    person.name = body.name
    person.last_name = body.last_name
    person.phone = body.phone
    person.email = body.email
    person.id_rol = body.id_rol
    person.password = Encryption.encrypt(body.password)
    return person.save()
  }

  /**
   * Elimina una persona basada en un id
   * @param params toma los valores del body que se manda
   * @returns retorna la persona eliminada
   */
  public async destroy({ params }: HttpContextContract) {
    const person: Person = await Person.findOrFail(params.id)
    return person.delete()
  }
}
