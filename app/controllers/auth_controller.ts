// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async register({ request, auth }: HttpContext) {
    const email = request.input('email')
    const password = request.input('password')
    const username = request.input('username')
    const user = await User.create({ email, password, username })
    await auth.login(user)
    return user
  }

  async login({ request, auth }: HttpContext) {
    const email = request.input('email')
    const password = request.input('password')

    const user = await User.query().where('email', email).firstOrFail()

    if (!(await hash.verify(user.password, password))) {
      return 'Invalid credentials'
    }

    await auth.login(user)
    return user
  }
}
