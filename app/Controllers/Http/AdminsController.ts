import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'

export default class AdminsController {
  /**
   * Lista los admin
   * @returns retorna todos los admin
   */
  public async index(ctx: HttpContextContract) {
    let admin: Admin[] = await Admin.query()
    return admin
  }

  /**
   * Almacena un admin en la base de datos
   * @param request toma los datos del body
   * @returns retorna el admin guardado
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const admin: Admin = await Admin.create(body)
    return admin
  }

  /**
   * Muestra un admin basado en el id
   * @param params toma los datos de la ruta
   * @returns Docuemtno
   */
  public async show({ params }: HttpContextContract) {
    let admin = await Admin.query().where('id', params.id)
    return admin
  }

  /**
   * Actualiza un admin bassdo en el id
   * @param params obtiene datos de la ruta
   * @param request obtiene los datos del body
   * @returns retorna el admin actualizado
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const admin: Admin = await Admin.findOrFail(params.id)
    return admin.save()
  }

  /**
   * Elimina un admin basado en el id
   * @param params obtiene los datos de la ruta
   * @returns admin eliminado
   */
  public async destroy({ params }: HttpContextContract) {
    const admin: Admin = await Admin.findOrFail(params.id)
    return admin.delete()
  }
}
