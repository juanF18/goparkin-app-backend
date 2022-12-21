import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Raiting from 'App/Models/Raiting'

export default class RaitingsController {
  /**
   * Lista todos los usuarios
   */
  public async index(ctx: HttpContextContract) {
    let raitings: Raiting[] = await Raiting.query()
    return raitings
  }
    /**
   * Lista todos los comentarios por parking
   */
    public async indexParking( {params }:  HttpContextContract) {
      let raiting = await Raiting.query().where('id_parking', params.id)
      return raiting
    }
  /**
   * Almacena la información de un usuario
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const raiting: Raiting = await Raiting.create(body)
    return raiting
  }
  /**
   * Muestra la información de un solo usuario
   */
  public async show({ params }: HttpContextContract) {
    let raiting = await Raiting.query().where('id', params.id)
    return raiting
  }
  /**
   * Actualiza la información de un usuario basado
   * en el identificador y nuevos parámetros
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const raiting = await Raiting.findOrFail(params.id)
    raiting.raiting = body.raiting
    raiting.comment = body.comment

    return raiting.save()
  }
  /**
   * Elimina a un usuario basado en el identificador
   */
  public async destroy({ params }: HttpContextContract) {
    const raiting = await Raiting.findOrFail(params.id)
    return raiting.delete()
  }
}
