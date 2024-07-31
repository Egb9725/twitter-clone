// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'
import Like from '#models/like'

export default class LikesController {
  async store({ request, auth }: HttpContext) {
    const tweetId = request.input('tweet_id')
    const like = await Like.create({ userId: auth.user!.id, tweetId })
    return like
  }

  async destroy({ params, auth }: HttpContext) {
    const like = await Like.query()
      .where('user_id', auth.user!.id)
      .andWhere('tweet_id', params.id)
      .firstOrFail()
    await like.delete()
    return { message: 'Unliked successfully' }
  }
}
