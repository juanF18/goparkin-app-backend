import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Reservation from "App/Models/Reservation";

export default class ReservationsController {
    async store({ request, response }:HttpContextContract) {
        const data = request.input(["date","hour","status"]);
        const reservation = new Reservation();
        reservation.date = new Date();
        reservation.hour = Date.now();
        reservation.status = "No Aproved";
        //faltan las llaves foraneas
        await reservation.save();
        response.json({ "Se ha agregado un nuevo usuario": data });
      }
    
      async index({ response }:HttpContextContract) {
        const reservation = await Reservation.all();
        response.json({
          message: "Todas las reservas",
          users: reservation,
        });
      }
    
      async show({ response, params }:HttpContextContract) {//dado un id muestra las reservas con ese id
        const reservation = await Database.from("reervation")
          .where("id", params.id)
          .select("*");
        return response.json({
          message: "Buscando por id",
          data: reservation,
        });
      }
    
      async update({ request, response, params }:HttpContextContract) {//cambia el status, dado un id
        const reservation = await Reservation.findOrFail(params.id);
        reservation.status = request.input("status");
        await reservation.save();
        return response.json({
          message: "Actualizando por id",
          data: reservation,
        });
      }
    
      async destroy({ response, params }:HttpContextContract) {//elimina reserva dado un id
        const reservation = await Reservation.findOrFail(params.id);
        await reservation.delete();
        return response.json({ message: "Se ha eliminado la reserva con ese id" });
      }
}
