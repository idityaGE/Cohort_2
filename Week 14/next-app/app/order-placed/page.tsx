'use client'

import { useRouter } from "next/navigation"

export default function page() {
  const router = useRouter()
  const handlePlaceOrder = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push('/')
    // router.replace('/')  // replace the current page
    // router.reload()  // reload the current page
    // router.back()  // go back
    // router.forward()  // go forward 
  }
  return (
    <div>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  )
}
