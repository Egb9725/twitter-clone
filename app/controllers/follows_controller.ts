import type { HttpContext } from '@adonisjs/core/http'
import Follow from '#models/follow'

export default class FollowsController {
  async store({ request, auth }: HttpContext) {
    const followingId = request.input('following_id')
    const follow = await Follow.create({ followerId: auth.user!.id, followingId })
    return follow
  }
}
