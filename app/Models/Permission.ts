import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Rol from './Rol'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public url: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Rol, {
    // Tabla pivote
    pivotTable: 'rol_permission',
    // clave que esta en esta entidad pero en la pivote
    pivotForeignKey: 'id_permission',
    // nombre de la segunda clave que sirve de pivote
    pivotRelatedForeignKey: 'id_rol',
  })
  public rols: ManyToMany<typeof Rol>
}
