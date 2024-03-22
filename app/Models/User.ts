import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, HasMany, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Subscription from './Subscription'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public surname: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public gender: boolean

  @column()
  public birthDate: DateTime

  @column({ serializeAs: null })
  public verified: boolean

  @column()
  public picture: string

  @hasMany(() => Subscription)
  public subscriptions: HasMany<typeof Subscription>

  @beforeSave() // insert e update
  public static async hashPassword(user: User) {
    //import Hash from '@ioc:Adonis/Core/Hash';
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
