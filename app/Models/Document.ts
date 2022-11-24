import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Admin from './Admin'
import Parking from './Parking'

export default class Document extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_admin: number

  @column()
  public id_parking: number

  @column()
  public url: string

  @column()
  public comment: string

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Admin, {
    foreignKey: 'id_admin',
  })
  public admin: BelongsTo<typeof Admin>
}
