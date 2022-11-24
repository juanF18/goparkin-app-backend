import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Parking from './Parking'
import User from './User'

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_parking: number

  @column()
  public id_user: number

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
   * Muchas reservaciones le pertenecen a un usuario
   */
  @belongsTo(() => User, {
    foreignKey: 'id_user',
  })
  public user: BelongsTo<typeof User>
}
