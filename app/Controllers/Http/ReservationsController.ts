import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reservation from 'App/Models/Reservation'

export default class ReservationsController {
  /**
   * Lista las reservaciones
   * @returns retorna todas las reservaciones
   */
  public async index(ctx: HttpContextContract) {
    let reservation: Reservation[] = await Reservation.query()
    return reservation
  }

  /**
   * Almacena una reservación en la base de datos
   * @param request toma los datos del body
   * @returns retorna la reservación guardada
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const reservation: Reservation = await Reservation.create(body)
    return reservation
  }

  /**
   * Muestra una reservación basado en el id
   * @param params toma los datos de la ruta
   * @returns reservación
   */
  public async show({ params }: HttpContextContract) {
    let reservation = await Reservation.query().where('id', params.id)
    return reservation
  }

  /**
   * Actualiza una reservación basado en el id
   * @param params obtiene datos de la ruta
   * @param request obtiene los datos del body
   * @returns retorna el reservación actualizada
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const reservation: Reservation = await Reservation.findOrFail(params.id)
    reservation.date = body.date
    reservation.hour = body.hour
    reservation.status = body.status
    return reservation.save()
  }

  /**
   * Elimina una reservación basado en el id
   * @param params obtiene los datos de la ruta
   * @returns reservación eliminada
   */
  public async destroy({ params }: HttpContextContract) {
    const reservation: Reservation = await Reservation.findOrFail(params.id)
    return reservation.delete()
  }
}
