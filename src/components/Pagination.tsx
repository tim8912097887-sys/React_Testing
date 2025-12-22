
type Props = {
   totalPages: number
   currentPage: number
   setCurrentPage: (page: number) => void
}

const PAGE_LIMIT = 5;

const Pagination = ({ currentPage,totalPages,setCurrentPage }:Props) => {

   
    // utility function for pagination
    const setNextPage = () => {
       if(currentPage < totalPages) setCurrentPage(currentPage+1);
    } 
    const setPrePage = () => {
        if(currentPage > 1) setCurrentPage(currentPage-1);
    }
    
    // caculate first and last page base on current page
    const firstPage = Math.max(1,currentPage-Math.floor(PAGE_LIMIT/2));
    const lastPage = Math.min(currentPage+Math.floor(PAGE_LIMIT/2),totalPages);

  return (
    <div className="flex items-center p-2 gap-1 justify-center w-full">
       <button className="border border-black py-0 px-2 hover:bg-gray-300 transition-all duration-300 cursor-pointer mr-2" onClick={setPrePage}>&#60;</button>
       {
         firstPage > 1 &&
         <>
           <button aria-label={`Go to page 1`} className="border border-black py-0 px-2 hover:bg-gray-300 transition-all duration-300 cursor-pointer" onClick={() => setCurrentPage(1)}>1</button>
           {firstPage > 2 && <p aria-label="left ellipse">...</p>}
         </>
       }
       {totalPages > 1 && 
         Array.from({ length: lastPage-firstPage+1 },(_,index) => index).map((_,num) => {
             return <button aria-label={`Go to page ${firstPage+num}`} className={`border border-black ${currentPage===firstPage+num?"py-1 px-3":"py-0 px-2"} hover:bg-gray-300 transition-all duration-300 cursor-pointer`} key={firstPage+num} onClick={() => setCurrentPage(firstPage+num)}>{firstPage+num}</button>
         })
       }
       {
        lastPage < totalPages && 
        <>
          {(lastPage < totalPages-1) && <p aria-label="right ellipse">...</p>}
          <button aria-label={`Go to page ${totalPages}`} className="border border-black py-0 px-2 hover:bg-gray-300 transition-all duration-300 cursor-pointer" onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
        </>
       }  
       <button className="border border-black py-0 px-2 hover:bg-gray-300 transition-all duration-300 cursor-pointer ml-2" onClick={setNextPage}>&#62;</button>  
    </div>
  )
}

export default Pagination