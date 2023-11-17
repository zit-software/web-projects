import createClient from '@/utils/createClient'

class AuthService {
  #client

  constructor() {
    this.#client = createClient('auth')
  }

  async login(body) {
    return await this.#client.post('/login', body)
  }

  async register(body) {
    return await this.#client.post('/register', body)
  }

  async auth() {
    return await this.#client.get('')
  }
}

export default new AuthService()
