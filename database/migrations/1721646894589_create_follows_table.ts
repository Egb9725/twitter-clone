import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Follows extends BaseSchema {
  protected tableName = 'follows'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('follower_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('following_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
