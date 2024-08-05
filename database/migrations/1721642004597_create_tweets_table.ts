import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Tweets extends BaseSchema {
  protected tableName = 'tweets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE') // En cas de suppression de l'utilisateur, supprimez également ses tweets
      table.text('content').notNullable()
      table.string('avatar_url').nullable()
      table.integer('retweets').defaultTo(0)
      table.integer('likes').defaultTo(0)
      table.timestamps(true, true)
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
