// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

// export default class AuthController {
//   async register({ request, auth, response }: HttpContext) {
//     const { username, email, password } = request.only(['username', 'email', 'password'])

//     const user = await User.create({ username, email, password })

//     await auth.use('web').login(user)

//     return response.redirect('/tweets')
//   }

//   async login({ request, auth, response, session }: HttpContext) {
//     const { email, password } = request.only(['email', 'password'])

//     const user = await User.query().where('email', email).firstOrFail()

//     if (!(await hash.verify(user.password, password))) {
//       session.flash('notification', 'Invalid credentials')
//       return response.redirect().back()
//     }

//     await auth.use('web').login(user)

//     return response.redirect('/tweets')
//   }

//   async logout({ auth, response }: HttpContext) {
//     await auth.use('web').logout()
//     return response.redirect('/')
//   }
// }
export default class AuthController {
  async register({ request, auth }: HttpContext) {
    const user = new User()
    user.username = request.input('username')
    user.email = request.input('email')
    user.password = request.input('password')
    await user.save()

    await auth.use('web').login(user)
    return 'User registered and logged in'
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

  async logout({ auth }: HttpContext) {
    await auth.use('web').logout()
    return 'User logged out'
  }
}
