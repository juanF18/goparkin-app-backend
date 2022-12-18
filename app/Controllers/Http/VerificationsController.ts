import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Person from 'App/Models/Person'

export default class VerificationsController {
  /**
   * TODO Nos verifica que la persona exista y que sea tipo dueño.
   * @param id id del dueño
   */
  public async verfyOwner(ctx: HttpContextContract, id: number) {
    let people: Person[] = await Person.query()
    let person = people.filter((person) => {
      person.id === id && person.id_rol === 2
    })
    return person
  }

  public async verifyUser(ctx: HttpContextContract, id: number) {
    let people: Person[] = await Person.query()
    let person = people.filter((person) => {
      person.id === id && person.id_rol === 1
    })

    return person
  }
}
