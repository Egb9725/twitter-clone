import type { HttpContext } from '@adonisjs/core/http'
import Tweet from '#models/tweet'

export default class TweetsController {
  async store({ request, auth, response }: HttpContext) {
    const content = request.input('tweet')

    if (!auth.user) {
      return response.unauthorized('You must be logged in to tweet.')
    }

    try {
      const tweet = await Tweet.create({
        content,
        user_id: auth.user.id,
        avatar_url: auth.user.avatar_url || null, // Assurez-vous que l'avatar_url est nullable
        retweets: 0,
        likes: 0,
      })

      return response.redirect().toRoute('home')
    } catch (error) {
      console.error('Error creating tweet:', error)
      return response.internalServerError('Could not create tweet.')
    }
  }

  async index({ request, view, auth }: HttpContext) {
    if (!auth.user) {
      return view.render('tweets.index', { tweets: [], user: null, error: null })
    }

    const page = request.input('page', 1)
    const limit = 20

    try {
      const tweets = await Tweet.query().preload('user').paginate(page, limit)
      return view.render('tweets.index', { tweets: tweets.toJSON(), user: auth.user })
    } catch (error) {
      console.error('Error fetching tweets:', error)
      return view.render('tweets.index', {
        tweets: [],
        user: auth.user,
        error: 'Could not fetch tweets',
      })
    }
  }
}
