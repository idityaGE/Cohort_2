'use client'
export default function error({error}: {error: Error}) {
  return (
    <div>Error: {error.message}</div>
  )
}
