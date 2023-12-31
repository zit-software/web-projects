import createClient from '@/utils/createClient'

class HangHoaService {
  /**
   * @type {import('axios').AxiosInstance}
   */
  #client

  constructor() {
    this.#client = createClient('hanghoa')
  }

  async create(body) {
    return await this.#client.post('', body)
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

  async deleteById(id) {
    return await this.#client.delete(`/${id}`)
  }

  async addImage(id, image) {
    const formData = new FormData()
    formData.append('image', image)

    return await this.#client.post(`/${id}/hinh`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async deleteImage(id, imageId) {
    return await this.#client.delete(`/${id}/hinh/${imageId}`)
  }
}

export default new HangHoaService()
