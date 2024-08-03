import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Tweets extends BaseSchema {
  protected tableName = 'tweets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Identifiant unique pour chaque tweet
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE') // Clé étrangère vers le modèle User
      table.text('content').notNullable() // Contenu du tweet
      table.string('avatar_url').nullable() // URL de l'image jointe au tweet (optionnel)
      table.integer('retweets').defaultTo(0) // Nombre de retweets
      table.integer('likes').defaultTo(0) // Nombre de likes
      table.timestamps(true) // Champs created_at et updated_at
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
