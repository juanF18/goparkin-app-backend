import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Person from './Person'
import Parking from './Parking'

export default class Owner extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_person: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Person, {
    foreignKey: 'id_person',
  })
  public person: BelongsTo<typeof Person>

  @hasMany(() => Parking, {
    foreignKey: 'id_owner',
  })
  public parkigns: HasMany<typeof Parking>
}
