'use client'
export default function ErrorBoundary({error}: {error: Error}) {
  return (
    <div>
      <h1>Error: {error.message}</h1>
      <h2>reviewId can't be == 1</h2>
    </div>
  ) 
}