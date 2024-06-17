'use client'
export default function ErrorBoundary({ error, reset }: { error: Error, reset: () => void }) {
  return (
    <div>
      <h1>Error: {error.message}</h1>
      <h2>reviewId can't be == 1</h2>
      <button onClick={reset}>Try Again</button>
      {/* Now we need to make our page client side component */}
    </div>
  )
}