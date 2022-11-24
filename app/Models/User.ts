import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Vehicle from './Vehicle'
import Reservation from './Reservation'
import Raiting from './Raiting'
import Person from './Person'

export default class User extends BaseModel {
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

  /**
   * Un usuario tiene muchos vehiculos
   */
  @hasMany(() => Vehicle, {
    foreignKey: 'id_user',
  })
  public vehicles: HasMany<typeof Vehicle>

  /**
   * Un usuario puede tener muchas reservaciones
   */
  @hasMany(() => Reservation, {
    foreignKey: 'id_user',
  })
  public reservations: HasMany<typeof Reservation>

  /**
   * Un usuario puede hacer muchos ratings
   */
  @hasMany(() => Raiting, {
    foreignKey: 'id_user',
  })
  public raitings: HasMany<typeof Raiting>
}
