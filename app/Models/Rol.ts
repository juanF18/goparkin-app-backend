import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Permission from './Permission'

export default class Rol extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * Un rol lo pueden tener muchas personas
   */
  @hasMany(() => User, {
    foreignKey: 'id_rol',
  })
  public users: HasMany<typeof User>

  /**
   * Muchos roles pueden tener muchos permisos
   */
  @manyToMany(() => Permission, {
    // Tabla pivote
    pivotTable: 'rol_permission',
    // clave que esta en esta entidad pero en la pivote
    pivotForeignKey: 'id_rol',
    // nombre de la segunda clave que sirve de pivote
    pivotRelatedForeignKey: 'id_permission',
  })
  public permissions: ManyToMany<typeof Permission>
}
