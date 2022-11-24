import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Document from 'App/Models/Document'

export default class DocumentsController {
  /**
   * Lista los documentos
   * @returns retorna todos lo documentos
   */
  public async index(ctx: HttpContextContract) {
    let documentos: Document[] = await Document.query()
    return documentos
  }

  /**
   * Almacena un documento en la base de datos
   * @param request toma los datos del body
   * @returns retorna el documento guardado
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const document: Document = await Document.create(body)
    return document
  }

  /**
   * Muestra un documento basado en el id
   * @param params toma los datos de la ruta
   * @returns Documento
   */
  public async show({ params }: HttpContextContract) {
    let document = await Document.query().where('id', params.id)
    return document
  }

  /**
   * Actualiza un documento bassdo en el id
   * @param params obtiene datos de la ruta
   * @param request obtiene los datos del body
   * @returns retorna el documento actualizado
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const document: Document = await Document.findOrFail(params.id)
    document.url = body.url
    document.comment = body.comment
    document.status = body.status
    return document.save()
  }

  /**
   * Elimina un documento basado en el id
   * @param params obtiene los datos de la ruta
   * @returns Documento eliminado
   */
  public async destroy({ params }: HttpContextContract) {
    const document: Document = await Document.findOrFail(params.id)
    return document.delete()
  }
}
