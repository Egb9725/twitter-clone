import type { HttpContext } from '@adonisjs/core/http'
import Tweet from '#models/tweet'

export default class TweetsController {
  async store({ request, auth }: HttpContext) {
    const content = request.input('content')
    const tweet = await Tweet.create({ content, user_id: auth.user!.id })
    return tweet
  }

  async index({ request, view, auth }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20
    const tweets = await Tweet.query().paginate(page, limit)

    return view.render('tweets.index', { tweets, user: auth.user })
  }
}
