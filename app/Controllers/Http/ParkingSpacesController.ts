import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ParkingSpace from 'App/Models/ParkingSpace'

export default class ParkingSpacesController {
  /**
   *  Lista todos los espacios de parqueo
   * @returns todos los parkingSpaces
   */
  public async index(ctx: HttpContextContract) {
    const parkingSpaces: ParkingSpace[] = await ParkingSpace.query()
    return parkingSpaces
  }

  /**
   * Almacena un nuevo espacio de parqueo con su respectiva informacion
   * @param reques toma los datos del body
   * @returns nuevo espacio de parqueo
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const parkingSpace: ParkingSpace = await ParkingSpace.create(body)
    return parkingSpace
  }

  /**
   * Muesta un espacio de parqueo vasado en su ip
   * @param params toma los datos de la ruta
   * @returns un espacio de parqueadero
   */
  public async show({ params }: HttpContextContract) {
    let parkingSpace: ParkingSpace = await ParkingSpace.findOrFail(params.id)
    return parkingSpace
  }

  /**
   * Actualiza la informacion del espacion del parqueo basado en el id
   * @param params toma los datos de la ruta
   * @param request toma los datos del body
   * @returns el parkingSpaces actualizado
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const parkingSpace: ParkingSpace = await ParkingSpace.findOrFail(params.id)
    parkingSpace.spacesCar = body.spacesCar
    parkingSpace.spacesMotorcycle = body.spacesMotorcycle
    parkingSpace.availableSpacesCar = body.availableSpaceCar
    parkingSpace.availableSpacesMotorcycle = body.availableSpaceMotorcycle

    return parkingSpace.save()
  }

  /**
   * Elimina un espacio de parqueo basado en el id
   * @param params toma los datos de la ruta
   * @returns parkinSpace eliminado
   */
  public async destroy({ params }: HttpContextContract) {
    const parkingSpace: ParkingSpace = await ParkingSpace.findOrFail(params.id)
    return parkingSpace.delete()
  }
}
