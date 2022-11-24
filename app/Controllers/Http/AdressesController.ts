import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Adress from 'App/Models/Adress'

export default class AdressesController {
  /**
   * Lista todas las direcciones
   * @returns retorna todas las direcciones
   */
  public async index(ctx: HttpContextContract) {
    let adresses: Adress[] = await Adress.query()
    return adresses
  }

  /**
   * Alamacena una nueva direccion
   * @param request Toma los valores del body
   * @returns retorna la direccion agregada
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const adress: Adress = await Adress.create(body)
    return adress
  }

  /**
   * Muestra uan direccion segun un id
   * @param params Toma los valores de la ruta
   * @returns direccion
   */
  public async show({ params }: HttpContextContract) {
    return Adress.findOrFail(params.id)
  }

  /**
   * Actualiza una direccion basada en un id
   * @param request toma los valores del body
   * @param params toma los valores del la ruta
   * @returns retorna la direccion actualizada
   */
  public async update({ request, params }: HttpContextContract) {
    const body = request.body()
    const adress: Adress = await Adress.findOrFail(params.id)
    adress.city = body.city
    adress.department = body.department
    adress.adress = body.adress
    adress.latitude = body.latitude
    adress.longitude = body.longitude
    return adress.save()
  }

  /**
   * Elimina una direccion basada en un id
   * @param params toma los valores del body que se manda
   * @returns retorna la direccion eliminada
   */
  public async destroy({ params }: HttpContextContract) {
    const adress: Adress = await Adress.findOrFail(params.id)
    return adress.delete()
  }
}
