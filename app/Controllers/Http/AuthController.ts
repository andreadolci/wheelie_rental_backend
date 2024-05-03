import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {

  public async login({ request, response, auth }: HttpContextContract) {
    const username = request.input('username')
    const password = request.input('password')

    console.log({ username, password, auth });

    try {
      const token = await auth.attempt(username, password, {
        expiresIn: "365day"
      })

      console.log({ token });


      const user = auth.use('api').user

      return response.ok({
        token, user
      })

    } catch (error) {
      return response.status(400).send(error.message)
    }

  }


}
