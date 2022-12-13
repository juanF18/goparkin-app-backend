// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Person from "App/Models/Person";
import Hash from '@ioc:Adonis/Core/Hash';
import ApiToken from 'App/Models/ApiToken';
import EmailService from 'App/Services/EmailService';
import PlantillaSeguridad from 'App/Services/EmailsTemplates/PlantillaSeguridad';

export default class SeguritiesController {
    async login({ auth, request, response }) {
        const email = request.input('email')
        const password = request.input('password')
        const the_person = await Person.query()
            .where('email', email)
            .firstOrFail()
        if (await Hash.verify(the_person.password, password)) {
            //Generación token
            const token = await auth.use('api').generate(the_person, {
                expiresIn: '60 mins'
            })
            let plantilla_correo: PlantillaSeguridad = new PlantillaSeguridad()
            let html = plantilla_correo.newLogin()
            let el_servicio_correo: EmailService = new EmailService();
            el_servicio_correo.sendEmail(email, "Nuevo Inicio de Sesión", html)
            //Obtiene los datos correspondientes a la relación
            await the_person.load("rol");
            the_person.password = ""
            return {
                "token": token,
                "person": the_person
            };
        } else {
            return response.unauthorized('Credenciales inválidas')
        }
    }
    async logout({ auth }) {
        await auth.use('api').revoke()
        return {
            revoked: true
        }
    }
    async forgotPassword({ auth, request }) {
        let respuesta: Object = {}
        const email = request.input('email')
        const the_person = await Person.query()
            .where('email', email)
            .firstOrFail()
        if (!the_person) {
            respuesta = {
                "status": "error",
                "message": "El correo no está registrado en la plataforma"
            }
        } else {
            const token = await auth.use('api').generate(the_person, {
                expiresIn: '60 mins'
            })
            let plantilla_correo: PlantillaSeguridad = new PlantillaSeguridad()
            let html = plantilla_correo.forgotPassword(token.token)
            let el_servicio_correo: EmailService = new EmailService();
            el_servicio_correo.sendEmail(email, "Solicitud restablecimiento de contraseña", html)
            respuesta = {
                "status": "success",
                "message": "Revisar el correo"
            }
        }
        return respuesta;
    }
    async resetPassword({ auth, request }) {
        let respuesta: Object = {}
        try {
            await auth.use('api').authenticate()
            auth.use('api').isAuthenticated
        } catch (error) {
            return {
                status: "error",
                message: "Token corrupto"
            };
        }
        const the_person = await Person.findBy('email', auth.person!.email);
        if (!the_person) {
            respuesta = {
                status: "error",
                message: "Este usuario no existe"
            }
        } else {
            the_person.password = request.input('password');
            await the_person.save();
            await auth.use('api').revoke();
            respuesta = {
                status: "success",
                message: "La contraseña se ha restaurado correctamente"
            };
        }
        return respuesta;
    }

}
