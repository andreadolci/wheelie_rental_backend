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

    async show({ params }: HttpContextContract) {
        const id = params.id
        const cat = await Wheelchairtemplate.findOrFail(id)
        return cat
    }

    async outOfStock({params}:HttpContextContract){
        const wheelChair=Wheelchairtemplate.query().where("quantity", 0)
        return wheelChair
    }
    async search({params}:HttpContextContract){
        const text = params.text
        const search=Wheelchairtemplate.query().where("name",text)
        return search
    }

}
