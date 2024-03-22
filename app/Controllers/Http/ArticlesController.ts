import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Article from 'App/Models/Article';

export default class ArticlesController {

  public async search({ params }: HttpContextContract) {
    const searchString = params.text

    const articles = await Article.query().whereILike('name', `%${searchString}%`)

    console.log(articles);

    return articles

  }

}
