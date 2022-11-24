import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Adress extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public city: string

  @column()
  public department: string

  @column()
  public adress: string

  @column()
  public latitude: string

  @column()
  public longitude: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
