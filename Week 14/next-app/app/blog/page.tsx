import { Metadata } from "next"

export const metadata : Metadata = {
  title: "Blog"
}

async function page() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return (
    <h1>Blog Home</h1>
  )
}

export default page