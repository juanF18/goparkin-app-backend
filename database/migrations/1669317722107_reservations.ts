import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reservations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('plate', 100).notNullable()
      table.date('date').notNullable() // table.dateTime('hour', { useTz: true }).defaultTo(this.now()) asi estaba antes
      table.time('hour') //almacena la hora dado un <input type='time'> en el formulario reserva
      table.string('status', 100).defaultTo('Pending') //cuando el usuario hace la reserva por defecto el estado es Pending

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
