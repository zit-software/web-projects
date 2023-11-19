import createClient from '@/utils/createClient'

class HangHoaService {
  /**
   * @type {import('axios').AxiosInstance}
   */
  #client

  constructor() {
    this.#client = createClient('dathang')
  }

  async placeOrder(body) {
    return await this.#client.post('/', body)
  }
}

export default new HangHoaService()
