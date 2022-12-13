export default class EmailService {

  /**
   * Retorna una contraseña aleatoria
   */
  createPassword(size) {
    let pass = '';
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789!#$%&/()=?¡';

    for (let i = 1; i <= size; i++) {
      var char = Math.floor(Math.random()
        * str.length + 1);

      pass += str.charAt(char)
    }
    return pass;
  }
}
