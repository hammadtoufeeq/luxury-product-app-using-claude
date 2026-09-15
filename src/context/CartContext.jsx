import { useEffect, useMemo, useState } from 'react'
import { CartContext } from './cart-context'

function readStoredCart() {
  try {
    const stored = JSON.parse(localStorage.getItem('cart'))
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  function addToCart(product, quantity = 1) {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...current, { ...product, quantity }]
    })
  }

  function removeFromCart(id) {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }
    setItems((current) => current.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  function clearCart() {
    setItems([])
  }

  const cartCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const cartTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
