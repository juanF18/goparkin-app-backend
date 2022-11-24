import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Owner from 'App/Models/Owner'

export default class OwnersController {
  /**
   * Lista los dueños
   * @returns retorna todos los dueños
   */
  public async index(ctx: HttpContextContract) {
    let owner: Owner[] = await Owner.query()
    return owner
  }

  /**
   * Almacena un dueño en la base de datos
   * @param request toma los datos del body
   * @returns retorna el dueño guardado
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const owner: Owner = await Owner.create(body)
    return owner
  }

  /**
   * Muestra un dueño basado en el id
   * @param params toma los datos de la ruta
   * @returns Dueño
   */
  public async show({ params }: HttpContextContract) {
    let owner = await Owner.query().where('id', params.id)
    return owner
  }

  /**
   * Actualiza un dueño bassdo en el id
   * @param params obtiene datos de la ruta
   * @param request obtiene los datos del body
   * @returns retorna el dueño actualizado
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const owner: Owner = await Owner.findOrFail(params.id)
    return owner.save()
  }

  /**
   * Elimina un dueño basado en el id
   * @param params obtiene los datos de la ruta
   * @returns dueño eliminado
   */
  public async destroy({ params }: HttpContextContract) {
    const owner: Owner = await Owner.findOrFail(params.id)
    return owner.delete()
  }
}
