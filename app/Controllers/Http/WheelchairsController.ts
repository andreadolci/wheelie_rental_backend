import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Wheelchair from 'App/Models/Wheelchair'
import Wheelchairtemplate from 'App/Models/Wheelchairtemplate'
import { StatusEnum } from 'App/utils/enum'

export default class WheelchairsController {
    async instanceFrom({ params }: HttpContextContract) {
        const chairId = params.templateId
        const wheelChair = await Wheelchairtemplate.findOrFail(chairId)
        const chairToCreate = {
            name: wheelChair.name,
            description: wheelChair.description,
            price: wheelChair.price,
            url: wheelChair.url,
            status: StatusEnum.TODELIVER,
            isPurchased: true,
            userId: params.userId

        }
        wheelChair.quantity -= 1
        wheelChair.save()
        const createdChair = await Wheelchair.create(chairToCreate)
        return createdChair
    }

    async index({ }: HttpContextContract) {
        const chairs = await Wheelchair.all()
        return chairs
    }

    async myChairs({params}: HttpContextContract){
        const chairs = await Wheelchair.query().where('user_id', params.userId)
        console.log(chairs);
        
        return chairs
    }
}
