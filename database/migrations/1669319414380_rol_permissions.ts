import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rol_permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //Referencias de las tablas implicadas
      table.integer('id_rol').unsigned().references('rols.id').onDelete('CASCADE')
      table.integer('id_permission').unsigned().references('permissions.id').onDelete('CASCADE')
      table.unique(['id_rol', 'id_permission'])
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
