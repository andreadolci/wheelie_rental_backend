import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Wheelchair from './Wheelchair'

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @belongsTo(()=>User)
  public user: BelongsTo<typeof User>
    
  @column()
  public wheelchairId: number

  @belongsTo(()=>Wheelchair)
  public wheelchair: BelongsTo<typeof Wheelchair>

  @column()
  public isAcquired: boolean //TODO 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}