import { DateTime } from 'luxon'
import { BaseModel, beforeSave, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Rol from './Rol'
import Vehicle from './Vehicle'
import Raiting from './Raiting'
import Reservation from './Reservation'
import Parking from './Parking'
import Document from './Document'
import ApiToken from './ApiToken'
import Hash from '@ioc:Adonis/Core/Hash'

export default class Person extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_rol: number

  @column()
  public name: string

  @column()
  public last_name: string

  @column()
  public phone: string

  @column()
  public email: string

  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * A la persona le pertenece un rol
   */
  @belongsTo(() => Rol, {
    foreignKey: 'id_rol',
  })
  public rol: BelongsTo<typeof Rol>

  /**
   * Una persona tiene muchos vehiculos
   */
  @hasMany(() => Vehicle, {
    foreignKey: 'id_people',
  })
  public vehicles: HasMany<typeof Vehicle>

  /**
   * Una persona tiene muchos raitings
   */
  @hasMany(() => Raiting, {
    foreignKey: 'id_people',
  })
  public raitings: HasMany<typeof Raiting>

  /**
   * Una persona tiene muchas reservaciones
   */
  @hasMany(() => Reservation, {
    foreignKey: 'id_people',
  })
  public reservations: HasMany<typeof Reservation>

  /**
   * Una persona tiene muchos parqueaderos
   */
  @hasMany(() => Parking, {
    foreignKey: 'id_people',
  })
  public parkings: HasMany<typeof Parking>

  /**
   * Una persona tiene muchos documentos
   */
  @hasMany(() => Document, {
    foreignKey: 'id_people',
  })
  public documents: HasMany<typeof Document>


 
@hasMany(() => ApiToken,{
  foreignKey: 'user_id',
})
public people: HasMany<typeof ApiToken>


@beforeSave()
public static async hashPassword (the_person: Person) {
  if (the_person.$dirty.password) {
    the_person.password = await Hash.make(the_person.password)
  }
}

}

