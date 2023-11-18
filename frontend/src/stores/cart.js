import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])

  const addToCart = (chitiet) => {
    cart.value.push(chitiet)
  }

  const removeFromCart = (index) => {
    cart.value = cart.value.filter((item, i) => i !== index)
  }

  return { cart, addToCart, removeFromCart }
})
