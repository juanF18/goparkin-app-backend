import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Parking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public parkingName: string

  @column()
  public hourPriceCar: number

  @column()
  public hourPriceMotorcycle: number

  @column()
  public openDays: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
