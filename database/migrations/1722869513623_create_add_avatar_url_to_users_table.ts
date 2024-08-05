import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddAvatarUrlToUsers extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('avatar_url').nullable() // Ajoute la colonne avatar_url qui peut être nulle
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('avatar_url') // Supprime la colonne avatar_url si la migration est annulée
    })
  }
}
