import { notFound } from "next/navigation"

const getRandomInt = (max:number) => {
  return Math.floor(Math.random() * max)
}

const page = ({params}:{
  params:{
    productId:string
    reviewId:string
  }
}) => {
  const random = getRandomInt(2)
  if (random === 1) {
    throw new Error('Random Error Occured')
  }
  if (parseInt(params.reviewId) > 100) {
    return notFound() // by defualt it will return 404 page of root level but you can also define a not found page in the same folder
  }
  return (
    <div>
      <h1>Product Review</h1>
      <h2>Product Id: {params.productId}</h2>
      <h2>Review Id: {params.reviewId}</h2>
    </div>
  )
}

export default page

