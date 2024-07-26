// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class SocialAuthController {
  async redirectToGoogle({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }

  async handleGoogleCallback({ ally, auth, response }: HttpContext) {
    const google = ally.use('google')
    if (google.accessDenied()) {
      return 'Access was denied'
    }

    if (google.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    if (google.hasError()) {
      return google.getError()
    }

    const googleUser = await google.user()
    const user = await this.findOrCreateUser(googleUser)

    await auth.login(user)
    return response.redirect('/')
  }

  async redirectToApple({ ally }: HttpContext) {
    return ally.use('apple').redirect()
  }

  async handleAppleCallback({ ally, auth, response }: HttpContext) {
    const apple = ally.use('apple')

    if (apple.accessDenied()) {
      return 'Access was denied'
    }

    if (apple.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    if (apple.hasError()) {
      return apple.getError()
    }

    const appleUser = await apple.user()
    const user = await this.findOrCreateUser(appleUser)

    await auth.login(user)
    return response.redirect('/')
  }

  private async findOrCreateUser(providerUser) {
    const user = await User.firstOrCreate(
      { email: providerUser.email },
      {
        username: providerUser.nickname || providerUser.name,
        password: 'default_password'
      }
    )

    return user
  }
}
