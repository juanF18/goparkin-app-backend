import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.dropTableIfExists('adresses')
    this.schema.dropTableIfExists('parking_spaces')
    this.schema.dropTableIfExists('documents')
    this.schema.dropTableIfExists('vehicles')
    this.schema.dropTableIfExists('parkings')
    this.schema.dropTableIfExists('owners')
    this.schema.dropTableIfExists('admins')
    this.schema.dropTableIfExists('reservations')
    this.schema.dropTableIfExists('raitings')
    this.schema.dropTableIfExists('users')
    this.schema.dropTableIfExists('rols')
    this.schema.dropTableIfExists('permissions')
    this.schema.dropTableIfExists('people')
    this.schema.dropTableIfExists('rol_permissions')
  }
}
