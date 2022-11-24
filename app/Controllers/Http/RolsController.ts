import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rol from 'App/Models/Rol'

export default class RolsController {
  /**
   * Lista los roles
   * @returns retorna todos los roles
   */
  public async index(ctx: HttpContextContract) {
    let rol: Rol[] = await Rol.query()
    return rol
  }
  /**
   * Almacena un rol en la base de datos
   * @param request toma los datos del body
   * @returns retorna el rol guardado
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const rol: Rol = await Rol.create(body)
    return rol
  }

  /**
   * Muestra un rol basado en el id
   * @param params toma los datos de la ruta
   * @returns rol
   */
  public async show({ params }: HttpContextContract) {
    let rol = await Rol.query().where('id', params.id)
    return rol
  }

  /**
   * Actualiza un rol basasdo en el id
   * @param params obtiene datos de la ruta
   * @param request obtiene los datos del body
   * @returns retorna el rol actualizado
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const rol: Rol = await Rol.findOrFail(params.id)
    return rol.save()
  }

  /**
   * Elimina un rol basado en el id
   * @param params obtiene los datos de la ruta
   * @returns rol eliminado
   */
  public async destroy({ params }: HttpContextContract) {
    const rol: Rol = await Rol.findOrFail(params.id)
    return rol.delete()
  }
}
