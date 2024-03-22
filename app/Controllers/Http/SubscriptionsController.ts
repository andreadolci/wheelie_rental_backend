import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'

export default class SubscriptionsController {

    async index({ auth, request }: HttpContextContract) {
        const page = request.input('page', 1)

        const loggedUser = auth.use('api').user!
        const userId = loggedUser.id

        const subs = await Subscription.query()
            .where('userId', userId)
            .preload('periodical')
            .paginate(page, 25)

        return subs
    }

    async destroy({ auth, request, params, response }: HttpContextContract) {
        const subId = params.id
        const loggedUser = auth.use('api').user!
        const userId = loggedUser.id

        const sub = await Subscription.findOrFail(subId)

        if (sub.userId != userId) {
            return response.status(401).send({
                error: 'non puoi cancellare abbonamenti altrui'
            })
        }

        await sub.delete()
        return response.noContent()
    }

}
