import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref(localStorage.getItem('cart') || null)

  const addToCart = (chitiet) => {
    if (cart.value == null) {
      cart.value = [chitiet]
    } else {
      cart.value.push(chitiet)
    }
  }

  const removeFromCart = (index) => {
    if (cart.value == null || index < 0 || index >= cart.value.length) {
      return
    }
    cart.value.splice(index, 1)
  }

  return { cart, addToCart, removeFromCart }
})
