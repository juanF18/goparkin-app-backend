import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Reservation from "App/Models/Reservation";

export default class ReservationsController {

    /**
   *  Lista todas las reservas
   * @returns todas las reservas
   */
     public async index(ctx: HttpContextContract) {
      const reservation: Reservation[] = await Reservation.query()
      return reservation
    }
  
    /**
     * Almacena una nueva reserva con su respectiva informacion
     * @param request toma los datos del body
     * @returns nuevo espacio de reserva
     */
    public async store({ request }: HttpContextContract) {
      const body = request.body()
      const reservation: Reservation = await Reservation.create(body)
      return reservation
    }
  
    /**
     * Muesta una reserva basado en su ip
     * @param params id
     * @returns una reserva o nulo si el id no existe
     */
    public async show({ params }: HttpContextContract) {
      let reservation: Reservation = await Reservation.findOrFail(params.id)
      return reservation
    }
  
    /**
     * Actualiza la informacion de la reserva basado en el id
     * @param params id
     * @param request toma los datos del body
     * @returns la reserva actualizada
     */
    public async update({ params, request }: HttpContextContract) {
      const body = request.body()
      const reservation: Reservation = await Reservation.findOrFail(params.id)
      reservation.idUser = body.idUser
      reservation.idParking = body.idParking
      reservation.date = body.date
      reservation.hour = body.hour
      reservation.status = body.status
      return reservation.save()
    }
  
    /**
     * Elimina una reserva basado en el id
     * @param params id
     * @returns reserva eliminada
     */
    public async destroy({ params }: HttpContextContract) {
      const reservation: Reservation = await Reservation.findOrFail(params.id)
      return reservation.delete()
    }
  
}
