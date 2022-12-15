export default class PasswordService {
  /**
   * Retorna una contraseña aleatoria
   */
  public createPassword(size: number) {
    let pass = ''
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789!#$%&/()=?¡'

    for (let i = 1; i <= size; i++) {
      var char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    return pass
  }
}
