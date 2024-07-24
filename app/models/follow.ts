import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Follow extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare followerId: number

  @column()
  declare followingId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
