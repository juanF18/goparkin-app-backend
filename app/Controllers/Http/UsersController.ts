import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  /**
   * Lista todas los usuarios
   * @returns retorna todos los usuarios
   */
  public async index(ctx: HttpContextContract) {
    let user: User[] = await User.query()
    return user
  }

  /**
  * Almacena un nuevo user
  * @param request Toma los valores del body
  * @returns retorna el user agregado
  */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const user: User = await User.create(body)
    return user
  }

  /**
 * Muestra un user según un id
 * @param params Toma los valores de la ruta
 * @returns user
 */
  public async show({ params }: HttpContextContract) {
    let user = await User.query().where('id', params.id)
    return user
  }

  /**
   * Actualiza un user basada en un id
   * @param request toma los valores del body
   * @param params toma los valores del la ruta
   * @returns retorna el user actualizada
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const user: User = await User.findOrFail(params.id)
    return user.save()
  }

  /**
   * Elimina un user basada en un id
   * @param params toma los valores del body que se manda
   * @returns retorna el user eliminada
   */
  public async destroy({ params }: HttpContextContract) {
    const user: User = await User.findOrFail(params.id)
    return user.delete()
  }
}


