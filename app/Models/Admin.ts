import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Person from './Person'
import Document from './Document'

export default class Admin extends BaseModel {
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

  @hasMany(() => Document, {
    foreignKey: 'id_admin',
  })
  public documents: HasMany<typeof Document>
}
