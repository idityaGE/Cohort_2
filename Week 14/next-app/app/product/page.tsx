import Link from "next/link"


function page() {
  const productId = Math.floor(Math.random() * 10) 
  return (
    <div>
      <h1>Product List</h1>
        <Link href={`/product/2`}>Product 2</Link>
        <br />
        <Link href={`/product/1`}>Product 1</Link>
        <br />
        <Link href={`/product/3`}>Product 3</Link>
        <br />
        <Link href={`/product/${productId}`}>Random Product</Link>
    </div>
  )
}

export default page