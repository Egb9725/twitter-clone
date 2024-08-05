import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { schema, rules } from '@adonisjs/validator'

export default class AuthController {
  async register({ request, auth, response }: HttpContext) {
    const userSchema = schema.create({
      username: schema.string({}, [rules.required(), rules.minLength(3), rules.maxLength(30)]),
      email: schema.string({}, [rules.required(), rules.email()]),
      password: schema.string({}, [rules.required(), rules.minLength(6)]),
    })

    const validation = await request.validate({ schema: userSchema })

    try {
      // Vérifier l'existence de l'email
      const emailExists = await User.query().where('email', validation.email).first()
      if (emailExists) {
        return response.badRequest({ message: 'Email is already taken.' })
      }

      const user = new User()
      user.username = validation.username
      user.email = validation.email
      user.password = await hash.make(validation.password)
      await user.save()

      await auth.use('web').login(user)
      return response.redirect('pages/home') // Rediriger vers la page d'accueil après inscription
    } catch (error) {
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async login({ request, auth, response, session }: HttpContext) {
    const loginSchema = schema.create({
      email: schema.string({}, [rules.required(), rules.email()]),
      password: schema.string({}, [rules.required()]),
    })

    const validation = await request.validate({ schema: loginSchema })

    try {
      const { email, password } = validation
      const user = await User.query().where('email', email).firstOrFail()

      if (!(await hash.verify(user.password, password))) {
        session.flash('notification', 'Invalid credentials')
        return response.redirect().back()
      }

      await auth.use('web').login(user)
      return response.redirect('/home') // Rediriger vers la page d'accueil après connexion
    } catch (error) {
      session.flash('notification', 'An error occurred during login')
      return response.redirect().back()
    }
  }

  async logout({ auth, response }: HttpContext) {
    try {
      await auth.use('web').logout()
      return response.redirect('/login')
    } catch (error) {
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
