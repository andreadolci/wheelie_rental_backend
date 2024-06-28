import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'wheelchairs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name')
      table.string('description')
      table.float('price')
      table.string('url')
      table.string('status')
      table.boolean('is_purchased')
      table.boolean('rent_or_buy')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.dateTime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
