import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Parking from './Parking'
import Person from './Person'

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_parking: number

  @column()
  public id_people: number

  @column()
  public plate: string

  @column()
  public date: Date

  @column()
  public hour: number

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * Muchas reservaciones le pertenecen a un parqueadero
   */
  @belongsTo(() => Parking, {
    foreignKey: 'id_parking',
  })
  public parking: BelongsTo<typeof Parking>

  /**
   * A la reservación le pertenece una persona
   */
  @belongsTo(() => Person, {
    foreignKey: 'id_people',
  })
  public person: BelongsTo<typeof Person>
}
