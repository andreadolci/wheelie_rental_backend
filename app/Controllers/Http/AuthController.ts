import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import Hash from '@ioc:Adonis/Core/Hash'
import { encrypt } from 'App/utils';

export default class AuthController {

  public async login({ request, response, auth }: HttpContextContract) {
    const username = request.input('username')
    const password = request.input('password')
    const encryptedPassword = encrypt(password)

    const users = await Database.rawQuery(
      `SELECT * FROM users WHERE username = '${username}' AND password = '${encryptedPassword}'`
    );

    console.log(users[0].length);

    if (users && users[0].length == 1) {

      try {
        const token = await auth.use('api').generate(users[0][0], {
          expiresIn: '365day'
        });

        console.log({ token });

        return response.ok({
          token, users
        })

      } catch (error) {
        return response.status(400).send(error.stack)
      }
    }

    if (users && users.length > 1) {

      console.log(users[0]);

      return response.ok({
        users: users[0]
      })
    }

  }


}
