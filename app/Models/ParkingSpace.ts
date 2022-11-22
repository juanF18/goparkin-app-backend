import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ParkingSpace extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public spacesCar: number

  @column()
  public spacesMotorcycle: number

  @column()
  public availableSpacesCar: number

  @column()
  public availableSpacesMotorcycle: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
