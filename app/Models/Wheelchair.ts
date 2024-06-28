import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { StatusEnum } from 'App/utils/enum'
import User from './User'

export default class Wheelchair extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public url: string

  @column()
  public status: StatusEnum

  @column()
  public isPurchased: boolean
  
  @column()
  public rentOrBuy: boolean

  @column()
  public userId: number

  @belongsTo(()=>User)
  public user: BelongsTo<typeof User>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
