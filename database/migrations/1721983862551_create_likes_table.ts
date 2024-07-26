import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Likes extends BaseSchema {
  protected tableName = 'likes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('tweet_id').unsigned().references('id').inTable('tweets').onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
