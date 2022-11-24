import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Owner from './Owner'
import User from './User'
import Admin from './Admin'
import Rol from './Rol'

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
   * a la persona le pertenece un rol
   */
  @belongsTo(() => Rol, {
    foreignKey: 'id_rol',
  })
  public rol: BelongsTo<typeof Rol>

  /**
   * Personas tiene muchos dueños
   */
  @hasMany(() => Owner, {
    foreignKey: 'id_person',
  })
  public owners: HasMany<typeof Owner>

  /**
   * Personas tiene muchos usuarios
   */
  @hasMany(() => User, {
    foreignKey: 'id_person',
  })
  public users: HasMany<typeof User>

  /**
   * Personas tiene muchos admins
   */
  @hasMany(() => Admin, {
    foreignKey: 'id_person',
  })
  public admins: HasMany<typeof Admin>
}
