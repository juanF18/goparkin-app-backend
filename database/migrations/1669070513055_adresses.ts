import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'adresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_parking').unsigned().references('parkings.id').onDelete('CASCADE')
      table.string('city', 400).notNullable()
      table.string('department', 400).notNullable()
      table.string('adress', 400).notNullable()
      table.string('latitude', 400).notNullable()
      table.string('longitude', 400).notNullable()

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
