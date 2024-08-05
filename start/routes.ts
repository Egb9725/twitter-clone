// // start/routes.ts

// // |--------------------------------------------------------------------------
// // | Routes file
// // |--------------------------------------------------------------------------
// // |
// // | The routes file is used for defining the HTTP routes.
// // |
// // */
import Route from '@adonisjs/core/services/router'
import type { HttpContext } from '@adonisjs/core/http'

const AuthController = () => import('#controllers/auth_controller')
const TweetsController = () => import('#controllers/tweets_controller')
const FollowsController = () => import('#controllers/follows_controller')
const LikesController = () => import('#controllers/likes_controller')

const tweets = [
  // ... vos tweets ici ...
  {
    id: 1,
    name: 'CNN',
    username: '@CNN',
    tweetAvatar: 'images/tweet-profile-photo.png',
    date: '7m',
    text: 'President Joe Biden touted a new agreement reached with the European Union to ease Trump-era tariffs on aluminum and steel as a "major breakthrough" that would serve to both strengthen the US steel industry and combat the global climate crisis.',
    comments: 57,
    retweets: 144,
    likes: 184,
    shares: 0,
    verified: true,
  },
  {
    id: 2,
    name: 'The New York Times',
    username: '@nytimes',
    date: '2h',
    tweetAvatar: 'images/nytimes-avatar.png',
    text: 'Gardening boomed during the pandemic. Six Black writers share how it has helped them re-establish, and reimagine, a connection to cultivation and the land.',
    image: 'images/tweet-image.png',
    comments: 19,
    retweets: 48,
    likes: 484,
    shares: 0,
    verified: true,
  },
  {
    id: 3,
    name: 'Tweeter',
    date: 'Oct 29',
    username: '@twitter',
    tweetAvatar: 'images/tweeter-avatar.png',
    text: 'BIG NEWS lol jk still Twitter',
    comments: '6.8K',
    retweets: '36.6K',
    likes: '267.1K',
    shares: 0,
    verified: true,
  },
  {
    id: 4,
    name: 'Tweeter',
    date: 'Oct 04',
    username: '@twitter',
    tweetAvatar: 'images/tweeter-avatar.png',
    text: 'hello literally everyone',
    comments: '116.7K',
    retweets: '785.5K',
    likes: '3.3M',
    shares: 0,
    verified: true,
  },
  {
    id: 5,
    name: 'Twitter',
    username: '@twitter',
    date: '04 Oct',
    tweetAvatar: 'images/tweeter-avatar.png',
    text: 'hello literally everyone',
    image: 'images/tweet-image.png',
    comments: 19,
    retweets: 48,
    likes: 484,
    shares: 0,
    verified: true,
  },
]

Route.get('/', async (ctx: HttpContext) => {
  return ctx.response.redirect().toRoute('login')
})

Route.get('/home', async ({ view, auth }) => {
  const user = auth.user
  return view.render('pages/home', { tweets, user })
}).as('home')

Route.get('/register', async ({ view }) => {
  return view.render('pages/register')
}).as('register')

Route.post('/register', [AuthController, 'register'])

Route.get('/login', async ({ view }) => {
  return view.render('pages/login')
}).as('login')

Route.post('/login', [AuthController, 'login'])

Route.post('/logout', [AuthController, 'logout'])

Route.group(() => {
  Route.get('/tweets', [TweetsController, 'index']).as('TweetsController.index')
  Route.post('/tweets', [TweetsController, 'store']).as('TweetsController.store')
}).as('auth')

Route.post('/follow', [FollowsController, 'store']).as('FollowsController.create')
Route.delete('/unfollow/:id', [FollowsController, 'destroy']).as('FollowsController.destroy')

Route.post('/like', [LikesController, 'store']).as('LikesController.create')
Route.delete('/unlike/:id', [LikesController, 'destroy']).as('LikesController.destroy')
