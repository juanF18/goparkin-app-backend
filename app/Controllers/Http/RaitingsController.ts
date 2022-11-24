import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Raiting from 'App/Models/Raiting';

export default class RaitingsController {

/**
* Lista todos los usuarios
*/
public async index(ctx:HttpContextContract){
    let raitings:Raiting[] = await Raiting.query()
        return raitings;
    }
    /**
    * Almacena la información de un usuario
    */
    public async store({request}:HttpContextContract){
        const body= request.body()
        const raiting: Raiting = await Raiting.create(body)
        return raiting
    }
    /**
    * Muestra la información de un solo usuario
    */
    public async show({params}:HttpContextContract) {
        let raiting = await Raiting.query().where('id',params.id)
        return raiting
    }
    /**
    * Actualiza la información de un usuario basado
    * en el identificador y nuevos parámetros
    */
    public async update({params,request}:HttpContextContract) {
    const body=request.body();
    const the_raiting=await Raiting.findOrFail(params.id);
    the_raiting.raiting=body.raiting;
    the_raiting.comment=body.comment;
    
    return the_raiting.save();
    }
    /**
    * Elimina a un usuario basado en el identificador
    */
    public async destroy({params}:HttpContextContract) {
    const the_raiting=await Raiting.findOrFail(params.id);
    return the_raiting.delete();
    }

}