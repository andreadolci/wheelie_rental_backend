import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import Hash from '@ioc:Adonis/Core/Hash'
import { encrypt } from 'App/utils';

export default class AuthController {

  public async login({ request, response, auth }: HttpContextContract) {
    const username = request.input('username')
    let password = request.input('password')
    password = encrypt(password)

    console.log(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`);
    const users = await Database.rawQuery(
      `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
    );

    if (users && users.length > 0) {

      console.log(users[0]);

      return response.ok({
        users: users[0]
      })
    }

    // try {
    //   const token = await auth.attempt(username, password, {
    //     expiresIn: "365day"
    //   })

    //   console.log({ token });


    //   // const user = auth.use('api').user

    //   return response.ok({
    //     token, users
    //   })

    // } catch (error) {
    //   return response.status(400).send(error.message)
    // }

  }


}
