import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reservations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("idUser").unsigned()
      table
      .foreign("idUser")
      .references("user.id")
      .onDelete("cascade")
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
       table
       .foreign("idUser")
       .references("user.id")
       .onDelete("cascade")
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
