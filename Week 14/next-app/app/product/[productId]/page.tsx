
const page = ({ params }: { params: { productId: string } }) => {
  return (
    <div>
      <h1>Product Details</h1>
      <h2>product Id : {params.productId}</h2>
    </div>
  )
}

export default page