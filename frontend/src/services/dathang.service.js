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
  async getOrders(params) {
    return await this.#client.get('/', { params })
  }
  async getDetail(id) {
    return await this.#client.get('/' + id)
  }
}

export default new HangHoaService()
