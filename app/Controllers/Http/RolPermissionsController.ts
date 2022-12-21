import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RolPermission from 'App/Models/RolPermission'

export default class RolPermissionsController {
  /**
   * Lista los rol-permisos
   * @returns retorna todos lo rol-permisos
   */
  public async index(ctx: HttpContextContract) {
    let rolPermiso: RolPermission[] = await RolPermission.query()
    return rolPermiso
  }

  /**
   * Almacena un rol-permiso en la base de datos
   * @param request toma los datos del body
   * @returns retorna el rol-permiso guardado
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const rolPermission: RolPermission = await RolPermission.create(body)
    return rolPermission
  }

  /**
   * Muestra un rol-permiso basado en el id
   * @param params toma los datos de la ruta
   * @returns rol-permiso
   */
  public async show({ params }: HttpContextContract) {
    let rolPermission = await RolPermission.query().where('id_rol', params.id)
    return rolPermission
  }

  /**
   * Actualiza un rol-permiso bassdo en el id
   * @param params obtiene datos de la ruta
   * @param request obtiene los datos del body
   * @returns retorna el rol-permiso actualizado
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const rolPermission: RolPermission = await RolPermission.findOrFail(params.id)
    return rolPermission.save()
  }

  /**
   * Elimina un rol-permiso basado en el id
   * @param params obtiene los datos de la ruta
   * @returns rol-permiso eliminado
   */
  public async destroy({ params }: HttpContextContract) {
    const rolPermission: RolPermission = await RolPermission.findOrFail(params.id)
    return rolPermission.delete()
  }
}
