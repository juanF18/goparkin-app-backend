import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'

export default class PermissionsController {
  /**
   * Lista los permisos
   * @returns retorna todos los permisos
   */
  public async index(ctx: HttpContextContract) {
    let permission: Permission[] = await Permission.query()
    return permission
  }

  /**
   * Almacena un permiso en la base de datos
   * @param request toma los datos del body
   * @returns retorna el permiso guardado
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const permission: Permission = await Permission.create(body)
    return permission
  }

  /**
   * Muestra un permiso basado en el id
   * @param params toma los datos de la ruta
   * @returns permiso
   */
  public async show({ params }: HttpContextContract) {
    let permission = await Permission.query().where('id', params.id)
    return permission
  }

  /**
   * Actualiza un permiso basado en el id
   * @param params obtiene datos de la ruta
   * @param request obtiene los datos del body
   * @returns retorna el permiso actualizado
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const permission: Permission = await Permission.findOrFail(params.id)
    permission.url = body.url
    permission.name = body.name
    return permission.save()
  }

  /**
   * Elimina un permiso basado en el id
   * @param params obtiene los datos de la ruta
   * @returns permiso eliminado
   */
  public async destroy({ params }: HttpContextContract) {
    const permission: Permission = await Permission.findOrFail(params.id)
    return permission.delete()
  }
}
