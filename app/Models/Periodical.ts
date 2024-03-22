import { BaseModel, HasManyThrough, column, hasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Category from './Category'
import PeriodicalCategory from './PeriodicalCategory'

export default class Periodical extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column() // enum -> union type
  public type: 'settimanale' | 'trimestrale' | 'annuale'

  // prima modello e poi tabella pivot
  @hasManyThrough([() => Category, () => PeriodicalCategory], {
    localKey: 'id', // tabella periodicals
    foreignKey: 'periodicalId', // tabella PeriodicalCategory (id periodico)
    throughLocalKey: 'categoryId', // tabella PeriodicalCategory (id category)
    throughForeignKey: 'id', // tabella categories
  })
  public categories: HasManyThrough<typeof Category>

  @column()
  public price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
