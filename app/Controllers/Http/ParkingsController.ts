import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Parking from 'App/Models/Parking';

export default class ParkingsController {

     /**
     * Lista todos los parqueaderos
     */

    public async index(ctx:HttpContextContract){
        let parkings:Parking[] = await Parking.query()
        return parkings;
    }

    /**
     * Almacena la información de un paqueadero
     */

    public async store({request}:HttpContextContract){
        const cont= request.body()
        const parking: Parking = await Parking.create(cont)
        return parking
    }

    /**
     * Muestra la información de un solo parquedero
     */

    public async show({params}:HttpContextContract) {
        let parking= await Parking.query().where('id',params.id)
        return parking
        
    }

    /**
     * Actualiza la información de un usuario basado
     * en el identificador y nuevos parámetros
     */

    public async update({ params, request }: HttpContextContract) {
        const cont = request.body()
        const parking: Parking = await Parking.findOrFail(params.id)
        parking.parkingName= cont.parkingName;
        parking.hourPriceCar= cont.hourPriceCar;
        parking.hourPriceMotorcycle= cont.hourPriceMotorcycle;
        parking.openDays=cont.openDays;
        return parking.save()
    }

     /**
     * Elimina a un usuario basado en el identificador
     */
      public async destroy({params}:HttpContextContract) {
        const the_parking=await Parking.findOrFail(params.id);
        return the_parking.delete();
    }

}