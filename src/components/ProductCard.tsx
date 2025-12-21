import type { Product } from "../App"


type Props = {
    product: Product
}

const ProductCard = ({ product }:Props) => {

    
  return (
    <div className="w-3xs">
       <div className="w-full">
        <img className="w-full h-auto" src={product.images[0]} alt={product.title} />
       </div>
       <h3>{product.title}</h3>
       <p>{product.description}</p>
       <span>{product.price}</span>
    </div>
  )
}

export default ProductCard