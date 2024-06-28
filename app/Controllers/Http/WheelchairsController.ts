import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Wheelchair from 'App/Models/Wheelchair'
import Wheelchairtemplate from 'App/Models/Wheelchairtemplate'
import { StatusEnum } from 'App/utils/enum'

export default class WheelchairsController {
    async buy({ params, response }: HttpContextContract) {
        const chairId = params.templateId
        const wheelChair = await Wheelchairtemplate.findOrFail(chairId)

        let chairToCreate = {}

        if (params.rentOrBuy == 1) {
            chairToCreate = {
                name: wheelChair.name,
                description: wheelChair.description,
                price: wheelChair.price,
                url: wheelChair.url,
                status: StatusEnum.TODELIVER,
                isPurchased: false,
                rentOrBuy: true,
                userId: params.userId

            }
        } else {
            chairToCreate = {
                name: wheelChair.name,
                description: wheelChair.description,
                price: wheelChair.price / 5,
                url: wheelChair.url,
                status: StatusEnum.TODELIVER,
                isPurchased: false, // da fare diventare true all'acquisto così puliamo il carrello
                rentOrBuy: false, // serve per cambiare il colore/ stato acquistato o noleggiato
                userId: params.userId

            }

        }
        if (wheelChair.quantity <= 0) {
            return response.status(404)

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

    async myChairs({ params }: HttpContextContract) {
        const chairs = await Wheelchair.query().where('user_id', params.userId).andWhere('is_purchased', false)
        console.log(chairs);

        return chairs
    }
    async purchasedChairs({ params, auth }: HttpContextContract) {
        const user = auth.use('api').user
        const chairs = await Wheelchair.query().where('user_id', user!.id).andWhere('buy_or_rent', true)

        return chairs
    }
    async rentedChairs({ params }: HttpContextContract) {
        const chairs = await Wheelchair.query().where('user_id', params.userId).andWhere('buy_or_rent', false)

        return chairs
    }

    async confirm({ params }: HttpContextContract) {
        const chairs = await Wheelchair.query().where('user_id', params.userId).andWhere('is_purchased', false)

        await Promise.all(chairs.map(async chair => {

            chair.isPurchased = true
            chair.save()

        }))

    }

    async destroy({ params }: HttpContextContract) {
        const chairId = params.id

        const chair = await Wheelchair.findByOrFail('id', chairId)

        await chair.delete()

    }
}
