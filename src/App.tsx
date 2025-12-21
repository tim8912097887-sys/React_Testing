import { useEffect, useState } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import { useTheme } from './contexts/ThemeProvider'
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';

export type Product = {
  id: number
  title: string
  description: string
  price: number
  images: string[]
}

type MetaData = {
  products: Product[]
  total: number
  skip: number
}

const BASE_URL = "https://dummyjson.com/products";
const LIMIT = 10;

function App() {
     
  const { theme } = useTheme();
  const [currentPage,setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(0);
  const [loading,setLoading] = useState(true);
  const [isError,setIsError] = useState(false);
  const [products,setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
     
     const fetchProduct = async() => {
        // reset state every time fetch the product
        setIsError(false);
        setLoading(true);
        try {
          const response = await fetch(`${BASE_URL}?limit=${LIMIT}&skip=${(currentPage-1)*LIMIT}`);
          const fetchProducts = await response.json() as MetaData;
          setProducts(fetchProducts.products);
          if(!totalPages) {
            const pages = Math.ceil(fetchProducts.total/LIMIT);
            setTotalPages(pages);
          } 
          console.log(`Skip: ${fetchProducts.skip}`);
        } catch (error: any) {
          // print detail message for debug
          console.error(`Fetch Failed: ${error.message}`);
          setIsError(true);
        } finally {
          // finish loading when fetch finish
          setLoading(false);
        }
     }
     fetchProduct();
  },[currentPage]);

  return (
    <>
      <div className={`${theme==="dark"?"bg-black":"bg-amber-100"} w-full h-dvh`}>
          <Navbar/>
          <div className='flex flex-wrap gap-1.5 p-4'>
              {loading && <div>Loading...</div>}
              {isError && <div>Something went wrong</div>}
              {!loading && !isError && products.map(product => {
                  return <ProductCard key={product.id} product={product} />
              })}
          </div>
          {!loading && !isError && totalPages!==0 &&
           <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          }
      </div>    
    </>
  )
}

export default App
