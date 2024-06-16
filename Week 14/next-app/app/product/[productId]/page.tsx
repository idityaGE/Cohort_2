import { Metadata } from "next"

type Props = {
  params: {
    productId: string
  }
}

// Fetch metadata asynchronously
export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  if (!params?.productId) {
    throw new Error("Product ID is missing")
  }

  const title = await new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Product: ${params.productId}`)
    }, 100)
  })

  return {
    title,
  }
}

const Page = ({ params }: Props) => {
  return (
    <div>
      <h1>Product Details</h1>
      <h2>Product Id: {params.productId}</h2>
    </div>
  )
}

export default Page
