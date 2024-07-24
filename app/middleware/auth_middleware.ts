// import type { HttpContext } from '@adonisjs/core/http'
// import type { NextFn } from '@adonisjs/core/types/http'
// import type { Authenticators } from '@adonisjs/auth/types'

// /**
//  * Auth middleware is used authenticate HTTP requests and deny
//  * access to unauthenticated users.
//  */
// export default class AuthMiddleware {
//   /**
//    * The URL to redirect to, when authentication fails
//    */
//   redirectTo = '/login'

//   async handle(
//     ctx: HttpContext,
//     next: NextFn,
//     options: {
//       guards?: (keyof Authenticators)[]
//     } = {}
//   ) {
//     await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
//     return next()
//   }
// }

import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

/**
 * Auth middleware is used to authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(
    { auth, response }: HttpContext,
    next: NextFn,
    customGuards?: (keyof Authenticators)[]
  ) {
    try {
      // Attempt to authenticate the request using the custom guards or default guard
      if (customGuards && customGuards.length > 0) {
        for (const guard of customGuards) {
          await auth.use(guard).authenticate()
        }
      } else {
        await auth.use('web').authenticate()
      }
    } catch {
      // Redirect to the login page if authentication fails
      return response.redirect(this.redirectTo)
    }

    // Call next to advance the request
    await next()
  }
}
