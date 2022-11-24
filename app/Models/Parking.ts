import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Document from './Document'
import Adress from './Adress'
import ParkingSpace from './ParkingSpace'
import Reservation from './Reservation'
import Raiting from './Raiting'
import Owner from './Owner'

export default class Parking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_owner: number

  @column()
  public parking_name: string

  @column()
  public hour_price_car: number

  @column()
  public hour_price_motorcycle: number

  @column()
  public open_days: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // pertenece a
  @belongsTo(() => Owner, {
    foreignKey: 'id_owner',
  })
  public owner: BelongsTo<typeof Owner>
  // Relaciones 1 a 1
  /**
   * Un parqueadero tiene un docuemnto
   */
  @hasOne(() => Document, {
    foreignKey: 'id_parking',
  })
  public document: HasOne<typeof Document>

  /**
   * Un parqueadero tiene una direccion
   */
  @hasOne(() => Adress, {
    foreignKey: 'id_parking',
  })
  public adress: HasOne<typeof Adress>

  /**
   * Un parqueadero tiene una direccion
   */
  @hasOne(() => ParkingSpace, {
    foreignKey: 'id_parking',
  })
  public parkingSpace: HasOne<typeof ParkingSpace>

  // Relacion 1 a N

  /**
   * Un parqueadero tiene muchas reservaciones
   */
  @hasMany(() => Reservation, {
    foreignKey: 'id_parking',
  })
  public reservations: HasMany<typeof Reservation>

  /**
   * Un parqueadero tiene muchas reservaciones
   */
  @hasMany(() => Raiting, {
    foreignKey: 'id_parking',
  })
  public raitings: HasMany<typeof Raiting>
}
