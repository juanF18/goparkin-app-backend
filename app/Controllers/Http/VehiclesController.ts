import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'

export default class VehiclesController {
  /**
   * Lista los vehículos
   * @returns retorna todos los vehículos
   */
  public async index(ctx: HttpContextContract) {
    let vehicle: Vehicle[] = await Vehicle.query()
    return vehicle
  }

  /**
   * Almacena un vehículo en la base de datos
   * @param request toma los datos del body
   * @returns retorna el vehículo guardado
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const vehicle: Vehicle = await Vehicle.create(body)
    return vehicle
  }

  /**
   * Muestra un vehículo basado en el id
   * @param params toma los datos de la ruta
   * @returns vehículo
   */
  public async show({ params }: HttpContextContract) {
    let vehicle = await Vehicle.query().where('id', params.id)
    return vehicle
  }

  /**
   * Actualiza un vehículo bassdo en el id
   * @param params obtiene datos de la ruta
   * @param request obtiene los datos del body
   * @returns retorna el vehículo actualizado
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const vehicle: Vehicle = await Vehicle.findOrFail(params.id)
    vehicle.plate = body.plate
    vehicle.type = body.type
    return vehicle.save()
  }

  /**
   * Elimina un vehículo basado en el id
   * @param params obtiene los datos de la ruta
   * @returns vehículo eliminado
   */
  public async destroy({ params }: HttpContextContract) {
    const vehicle: Vehicle = await Vehicle.findOrFail(params.id)
    return vehicle.delete()
  }
}
