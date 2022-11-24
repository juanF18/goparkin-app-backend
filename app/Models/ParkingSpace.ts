import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ParkingSpace extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public spaces_car: number

  @column()
  public spaces_motorcycle: number

  @column()
  public available_spaces_car: number

  @column()
  public available_spaces_motorcycle: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
