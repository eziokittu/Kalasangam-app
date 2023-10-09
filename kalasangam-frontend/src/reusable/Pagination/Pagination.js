import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

import './Pagination.css';

function Pagination() {
  const [products, setProducts] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const[limit=2,setLimit]=useState();
  const[currentPage=1,setCurrentPage]=useState();


  useEffect(() => {
    const getNumberOfPages = async () => {
      const res = await fetch(
        // `http://localhost:3004/comments?_page=1&_limit=${limit}`
        `http://localhost:5000/api/products?_=age=${currentPage}&_limit=${limit}`
        // `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
      // console.log(Math.ceil(total/12));
      setProducts(data);
    };

    getNumberOfPages();
  }, [limit, currentPage]);

  const fetchProducts = async (currentPage) => {
    const res = await fetch(
      // `http://localhost:3004/comments?_page=${currentPage}&_limit=${limit}`
      `http://localhost:5000/api/products?_=age=${currentPage}&_limit=${limit}`
      // `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const productsFormServer = await fetchProducts(currentPage);
    setProducts(productsFormServer);
    // scroll to the top
    //window.scrollTo(0, 0)
  };


  return (
    <div className="">
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"classes"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
      {products.map((i) => {
        return (
          <div>
          <h1>{i.fname}</h1>
          <h1>{i.email}</h1>
          {/* <h1>{i.userType}</h1> */}
          </div>
        );
      })}
    </div>
  );
}

export default Pagination