// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async register({ request, auth, response }: HttpContext) {
    const { username, email, password } = request.only(['username', 'email', 'password'])

    const user = await User.create({ username, email, password })

    await auth.use('web').login(user)

    return response.redirect('/tweets')
  }

  async login({ request, auth, response, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.query().where('email', email).firstOrFail()

    if (!(await hash.verify(user.password, password))) {
      session.flash('notification', 'Invalid credentials')
      return response.redirect().back()
    }

    await auth.use('web').login(user)

    return response.redirect('/tweets')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}
