import createClient from '@/utils/createClient'

class KhachHangService {
  /**
   * @type {import('axios').AxiosInstance}
   */
  #client

  constructor() {
    this.#client = createClient('khach')
  }

  async getAll() {
    return await this.#client.get('')
  }

  async getById(id) {
    return await this.#client.get(`/${id}`)
  }

  async updateById(id, body) {
    return await this.#client.put(`/${id}`, body)
  }

  async deleteByid(id) {
    return await this.#client.delete(`/${id}`)
  }
}

export default new KhachHangService()
