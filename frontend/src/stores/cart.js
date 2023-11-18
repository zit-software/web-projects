import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])

  const addToCart = (chitiet) => {
    const availableChiTiet = cart.value.find((item) => item.id === chitiet.id)
    if (!availableChiTiet) {
      cart.value.push(chitiet)
      window.localStorage.setItem('cart', JSON.stringify(cart.value))
      return
    }
    cart.value = cart.value.map((item) => {
      if (item.id === chitiet.id) {
        item.soluong += chitiet.soluong
      }
      return item
    })

    window.localStorage.setItem('cart', JSON.stringify(cart.value))
  }

  const removeFromCart = (index) => {
    cart.value = cart.value.filter((item, i) => i !== index)
  }

  const getItemById = (id) => cart.value.find((item) => item.id === id)

  return { cart, addToCart, removeFromCart, getItemById }
})
