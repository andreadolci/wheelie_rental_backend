import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UsersController {

  public async me({ auth }: HttpContextContract) {
    return auth.use('api').user
  }

  public async store({ request, response }: HttpContextContract) {

    const data = request.only(['name', 'surname', 'email', 'password', 'birth_date', 'username'])

    const user = await User.create(data)

    console.log(user);


    // return user -> 200 ok
    // 201 -> created
    return response.created(user)
  }

  public async update({ request, response, auth }: HttpContextContract) {

    const loggedUser = auth.use('api').user!

    const picture = request.file('picture', {
      size: "2mb",
      extnames: ["jpg", "jpeg", "png"]
    })

    if (picture?.isValid) {
      await picture.moveToDisk('./')
      loggedUser.profileImg = "http://localhost/adonis-jac-progetto/tmp/uploads/" + picture.fileName
    }

    loggedUser.name = request.input('name')
    loggedUser.surname = request.input('surname')

    await loggedUser.save()

    return loggedUser

  }

}
