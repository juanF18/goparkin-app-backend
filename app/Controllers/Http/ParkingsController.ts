import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Adress from 'App/Models/Adress'
import Document from 'App/Models/Document'
import Parking from 'App/Models/Parking'
import ParkingSpace from 'App/Models/ParkingSpace'

export default class ParkingsController {
  /**
   * Lista todos los parqueaderos
   */

  public async index(ctx: HttpContextContract) {
    let parkings: Parking[] = await Parking.query().preload('adress').preload('parkingSpace')
    return parkings
  }

  public async parkingsDocuments(ctx: HttpContextContract) {
    let parkings: Parking[] = await Parking.query().preload('person').preload('document')
    return parkings
  }

  /**
   * Almacena la información de un paqueadero
   */

  public async store({ request }: HttpContextContract) {
    const bodyParking = request.body().parking
    const parking: Parking = await Parking.create(bodyParking)

    const bodyAddress = request.body().address
    bodyAddress.id_parking = parking.id
    const adress: Adress = await Adress.create(bodyAddress)

    const bodyParkingSpace = request.body().parkingSpace
    bodyParkingSpace.id_parking = parking.id
    const parkingSpace: ParkingSpace = await ParkingSpace.create(bodyParkingSpace)

    const bodyDocument = request.body().document
    bodyDocument.id_parking = parking.id
    bodyDocument.id_people = parking.id_people
    const document: Document = await Document.create(bodyDocument)

    return { parking, adress, parkingSpace, document }
  }

  /**
   * Muestra la información de un solo parquedero
   */

  public async show({ params }: HttpContextContract) {
    let parking = await Parking.query().where('id', params.id)
    return parking
  }

  /**
 * Muestra la información de los parquederos de un dueño
 */

  public async showOwner({ params }: HttpContextContract) {
    let parkings: Parking[] = await Parking.query().where('id_people', params.id)
    return parkings
  }

  /**
   * Actualiza la información de un usuario basado
   * en el identificador y nuevos parámetros
   */

  public async update({ params, request }: HttpContextContract) {
    const cont = request.body()
    const parking: Parking = await Parking.findOrFail(params.id)
    parking.parking_name = cont.parking_name
    parking.hour_price_car = cont.hour_price_car
    parking.opening_hour = cont.opening_hour
    parking.closing_hour = cont.closing_hour
    parking.hour_price_motorcycle = cont.hour_price_motorcycle
    parking.open_days = cont.open_days
    return parking.save()
  }

  /**
   * Elimina a un usuario basado en el identificador
   */
  public async destroy({ params }: HttpContextContract) {
    const parking = await Parking.findOrFail(params.id)
    return parking.delete()
  }
}
