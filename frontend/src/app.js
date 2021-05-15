import Error404Screen from './screens/Error404Screen.js'
import HomeScreen from './screens/HomeScreen.js'
import MyBookmarks from './screens/MyBookmarks.js'
import MyCategories from './screens/MyCategories.js'
import { parseRequestUrl } from './utils.js'

const routes = {
  '/': HomeScreen,
  '/my-bookmarks': MyBookmarks,
  '/my-categories': MyCategories,
  // '/log-in': Login,
  // '/sign-up': SignUp,
  // '/import-bookmarks': ImportBookmarks,
  // '/export-bookmarks': ExportBookmarks,
}

const router = () => {
  const request = parseRequestUrl()
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '')
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen

  const main = document.getElementById('main-container')
  main.innerHTML = screen.render()
}

window.addEventListener('load', router)
window.addEventListener('hashchange', router)
