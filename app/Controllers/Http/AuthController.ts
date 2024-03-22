import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {

  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.attempt(email, password, {
        expiresIn: "365day"
      })

      const user = auth.use('api').user

      return response.ok({
        token, user
      })

    } catch (error) {
      return response.status(400).send('Le credenziali non sono valide')
    }

  }


}
