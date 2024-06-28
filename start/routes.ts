/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('users/me', 'UsersController.me')
  // users/:id
  Route.resource('users', 'UsersController')

  Route.get('wheelchairs/outofstock', 'WheelchairtemplatesController.outOfStock')

  Route.resource('wheelchairs', 'WheelchairsController')

  Route.get('wheelchairs/storic/:userId', 'WheelchairsController.purchasedChairs')
  
  Route.resource('wheelchairtemplate', 'WheelchairtemplatesController')

  Route.get('search/:text', 'WheelchairtemplatesController.search')

  Route.get('wheelchair/:userId', 'WheelchairsController.myChairs')

  Route.post('wheelchair/instance/:templateId/:userId/:rentOrBuy', 'WheelchairsController.buy')

  Route.post('wheelchair/confirm/:userId', 'WheelchairsController.confirm')

  Route.resource('subscriptions', 'SubscriptionsController')

  Route.resource('categories', 'CategoriesController')

}).middleware(['auth'])

Route.post('login', 'AuthController.login')
Route.post("users-create", "UsersController.store");
