import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Document from 'App/Models/Document'

export default class DocumentsController {
  public async index(ctx: HttpContextContract) {
    let documentos: Document[] = await Document.query()
    return documentos
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const document: Document = await Document.create(body)
    return document
  }

  public async show({ params }: HttpContextContract) {
    let document = await Document.query().where('id', params.id)
    return document
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const document: Document = await Document.findOrFail(params.id)
    document.url = body.url
    document.comment = body.comment
    return document.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const document: Document = await Document.findOrFail(params.id)
    return document.delete()
  }
}
