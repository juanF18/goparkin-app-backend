import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Parking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public parking_name: string

  @column()
  public hour_price_car: number

  @column()
  public hour_price_motorcycle: number

  @column()
  public open_days: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
