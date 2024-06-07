import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Wheelchairtemplate from 'App/Models/Wheelchairtemplate';

export default class WheelchairtemplatesController {
    public async index({ request, response }: HttpContextContract) {
        const page = request.input('page', 1)
        const limit = request.input('limit', 25)
        const periodicals = await Wheelchairtemplate.query()
            .paginate(page, limit)

        return periodicals
    }
}
