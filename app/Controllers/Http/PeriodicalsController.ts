import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Periodical from 'App/Models/Periodical';

export default class PeriodicalsController {

  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 25
    const periodicals = await Periodical.query().preload('categories')
      .paginate(page, limit)

    return periodicals
  }

}
