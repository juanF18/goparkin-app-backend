import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reservations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // table.integer("idUser").unsigned()
      // table
      // .foreign("idUser")
      // .references("user.id")
      // .onDelete("cascade")
      //  table
      //  .foreign("idUser")
      //  .references("user.id")
      //  .onDelete("cascade")
      //las llaves foraneas todavia no estan
      // faltan los campos idUser y idParking
      table.date("date")
      table.string("status",20)
      table.integer("hour")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
