import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RolPermission extends BaseModel {
  public static table = 'rol_permissions'
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_rol: number

  @column()
  public id_permission: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
