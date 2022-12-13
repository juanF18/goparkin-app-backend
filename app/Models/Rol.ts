import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './Person'
import Permission from './Permission'
import Person from './Person'

export default class Rol extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * Un rol lo pueden tener muchas personas
   */
  @hasMany(() => Person, {
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
