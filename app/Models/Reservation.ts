import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idUser:number

  @column()
  public idParking:number

  @column()
  public date:Date

  @column()
  public hour:number
x
  @column()
  public status:string
}
