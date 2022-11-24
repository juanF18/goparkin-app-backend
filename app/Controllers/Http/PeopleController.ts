import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Person from 'App/Models/Person'
import Encryption from '@ioc:Adonis/Core/Encryption'

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
   * Almacena una nueva persona
   * @param request Toma los valores del body
   * @returns retorna la persona agregada
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    body.password = Encryption.encrypt(body.password)
    const person: Person = await Person.create(body)
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
