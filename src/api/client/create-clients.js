import AuthClient from './auth'
import UserClient from './user'

module.exports = function(config, store) {
  return {
    AuthClient: AuthClient(store),
    UserClient: UserClient(store)
  }
}
