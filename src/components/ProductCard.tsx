import type { Product } from "../App"
import { useTheme } from "../contexts/ThemeProvider"


type Props = {
    product: Product
}

const ProductCard = ({ product }:Props) => {
  
  const { theme } = useTheme();
  
    
  return (
    <div className="w-3xs">
       <div className="w-full">
        <img className="w-full h-auto" src={product.images[0]} alt={product.title} />
       </div>
       <div className="p-2 flex flex-col gap-2">
        <h3 className={`${theme==="dark"?"text-white":"text-black"} font-bold`}>{product.title}</h3>
        <p className={`${theme==="dark"?"text-white":"text-black"}`}>{product.description}</p>
        <span className={`${theme==="dark"?"text-white":"text-black"}`}>{product.price}</span>
       </div>
    </div>
  )
}

export default ProductCard