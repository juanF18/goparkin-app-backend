import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'parking_spaces'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_parking').unsigned().references('parkings.id').onDelete('CASCADE')
      table.integer('spaces_car').notNullable()
      table.integer('spaces_motorcycle').notNullable()
      table.integer('available_spaces_car').notNullable()
      table.integer('available_spaces_motorcycle').notNullable()
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
