import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    // Herencia
    /**
     * personas pueden ser muchos usuarios
     */
    this.schema.alterTable('user', (table) => {
      table.integer('id_person').unsigned().references('people.id')
    })

    /**
     * personas puede ser muchos dueños
     */
    this.schema.alterTable('owner', (table) => {
      table.integer('id_person').unsigned().references('people.id')
    })

    /**
     * personas pueden ser muchos administradore
     */
    this.schema.alterTable('admins', (table) => {
      table.integer('id_person').unsigned().references('people.id')
    })

    //Relaciones 1 a 1
    /**
     * Un parqueadero tiene un documento
     * Un administrador puede revisar muchos documentos
     */
    this.schema.alterTable('documents', (table) => {
      table.integer('id_parking').unsigned().references('parkings.id').onDelete('CASCADE')
      table.integer('id_admin').unsigned().references('admins.id')
    })

    /**
     * Una parqueadero tiene una direccion
     */
    this.schema.alterTable('adresses', (table) => {
      table.integer('id_parking').unsigned().references('parkings.id').onDelete('CASCADE')
    })

    /**
     * Un parqueadero tiene un espacios de parqueo
     */
    this.schema.alterTable('parking_spaces', (table) => {
      table.integer('id_parking').unsigned().references('parkings.id').onDelete('CASCADE')
    })

    // Relaciones muchos a muchos

    /**
     * Un usuario tiene muchas reservaciones
     * Un parqueadero tiene muchas reservaciones
     */
    this.schema.alterTable('reservations', (table) => {
      table.integer('id_parking').unsigned().references('parkings.id').onDelete('CASCADE')
      table.integer('id_user').unsigned().references('users.id')
    })

    /**
     * Un usuario puede tener muchos ratings
     * Un parqueadero tiene muchos ratings
     */
    this.schema.alterTable('ratings', (table) => {
      table.integer('id_parking').unsigned().references('parkings.id').onDelete('CASCADE')
      table.integer('id_user').unsigned().references('users.id')
    })

    /**
     * Un dueño tiene muchos parqueaderos
     */
    this.schema.alterTable('parkings', (table) => {
      table.integer('id_owner').unsigned().references('owners.id').onDelete('CASCADE')
    })

    /**
     * Un dueño tiene muchos parqueaderos
     */
    this.schema.alterTable('vehicles', (table) => {
      table.integer('id_user').unsigned().references('users.id')
    })

    /**
     * Un rol le pertenece a muchos usuarios
     */

    this.schema.alterTable('people', (table) => {
      table.integer('id_rol').unsigned().references('rols.id')
    })
  }
}
