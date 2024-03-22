import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {

    async index({ }: HttpContextContract) {
        const cats = await Category.all()
        return cats
    }

    async show({ params }: HttpContextContract) {
        const id = params.id
        const cat = await Category.findOrFail(id)
        await cat.load('periodicals')
        return cat
    }
}
