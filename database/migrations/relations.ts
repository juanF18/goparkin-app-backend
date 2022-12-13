import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    //Relaciones 1 a 1
    /**
     * Un parqueadero tiene un documento
     * Una persona puede revisar muchos documentos
     */
    this.schema.alterTable('documents', (table) => {
      table.integer('id_parking').unsigned().references('parkings.id').onDelete('CASCADE')
      table.integer('id_people').unsigned().references('people.id')
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
     * Una persona tiene muchas reservaciones
     * Un parqueadero tiene muchas reservaciones
     */
    this.schema.alterTable('reservations', (table) => {
      table.integer('id_parking').unsigned().references('parkings.id').onDelete('CASCADE')
      table.integer('id_people').unsigned().references('people.id')
    })

    /**
     * Una persona puede tener muchos ratings
     * Un parqueadero tiene muchos ratings
     */
    this.schema.alterTable('raitings', (table) => {
      table.integer('id_parking').unsigned().references('parkings.id').onDelete('CASCADE')
      table.integer('id_people').unsigned().references('people.id')
    })

    /**
     * Una persona tiene muchos parqueaderos
     */
    this.schema.alterTable('parkings', (table) => {
      table.integer('id_people').unsigned().references('people.id').onDelete('CASCADE')
    })

    /**
     * Una persona tiene muchos vehiculos
     */
    this.schema.alterTable('vehicles', (table) => {
      table.integer('id_people').unsigned().references('people.id')
    })

    /**
     * Un rol le pertenece a muchas personas
     */

    this.schema.alterTable('people', (table) => {
      table.integer('id_rol').unsigned().references('rols.id')
    })
  }
}
