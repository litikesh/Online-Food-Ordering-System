import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import { clearErrors, getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import Loader from "../layout/Loader/Loader";
import "../styles.css";
import { useLocation, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Mincategories } from "../layout/Category";
import { useSnackbar } from "notistack";

const PrettoSlider = styled(Slider)({
  color: "hsl(45, 91%, 58%)",
  height: 6,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 22,
    width: 22,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 10,
    background: "unset",
    padding: 0,
    width: 34,
    height: 34,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "hsl(45, 91%, 58%)",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

// import Pagination from "@mui/material/Pagination";
const Products = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  // page count
  const [currentPage, setCurrentPage] = useState(1);
  // for price
  const [price, setPrice] = useState([0, 200000]);
  // for categories
  const [category, setCategory] = useState(
    location.search ? location.search.split("=")[1] : ""
  );
  // for Rating
  const [Ratings, setRatings] = useState(0);

  //   useSelector is used to fetch data from the redux
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const keyword = params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const clearFilters = () => {
    setPrice([0, 200000]);
    setCategory("");
    setRatings(0);
  };

  //   is use to call the products and match to access it.
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, Ratings));
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    error,
    Ratings,
    enqueueSnackbar,
  ]);

  const count = filteredProductsCount;

  return (
    <>
      <Header />
      <>
        <div className="container">
          <main>
            {keyword ? (
              <div className="search-results">
                <h2 className="heading">
                  search results for <span>{keyword}</span>
                </h2>
              </div>
            ) : (
              <div className="Pro___heading">
                <h1 className="section-title">
                  Our menu
                  <hr
                    style={{
                      display: "block",
                      height: "2px",
                      width: "80px",
                      marginTop: "-5px",
                      borderRadius: "5px",
                      border: "0",
                      borderTop: "4px solid hsl(45, 91%, 58%)",
                      padding: "0",
                    }}
                  />
                </h1>
              </div>
            )}

            <div className="product-grid" style={{ marginTop: "20px" }}>
              <div className="product-container">
                <div className="sidebar-category">
                  <div className="sidebar-top">
                    <h2 className="sidebar-title">
                      Price
                      <span onClick={() => clearFilters()}>clear</span>
                    </h2>
                  </div>
                  <div className="filterBox">
                    <PrettoSlider
                      value={price}
                      onChange={priceHandler}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={0}
                      max={25000}
                    />
                  </div>
                  <div className="sidebar-top" style={{ marginTop: "-25px" }}>
                    <h2 className="sidebar-title">Categories</h2>
                  </div>
                  <ul className="categortBox">
                    {Mincategories.map((categorys) => (
                      <li
                        className="category-link"
                        key={categorys}
                        onClick={() => setCategory(categorys)}
                      >
                        {categorys.charAt(0).toUpperCase() +
                          categorys.slice(1).toLowerCase()}
                      </li>
                    ))}
                  </ul>

                  <div className="sidebar-top" style={{ marginTop: "-25px" }}>
                    <h2 className="sidebar-title">Ratings Above</h2>
                  </div>
                  <div className="filterBox">
                    <PrettoSlider
                      value={Ratings}
                      onChange={(e, newRating) => {
                        setRatings(newRating);
                      }}
                      aria-labelledby="continuous-slider"
                      min={0}
                      max={5}
                      valueLabelDisplay="auto"
                    />
                  </div>
                </div>
              </div>
              {/* products */}
              {loading ? (
                <Loader />
              ) : (
                <>
                  <main>
                    <section className="product" id="menu">
                      <div
                        className="products-grid"
                        style={{ display: "flex", flexWrap: "wrap" }}
                      >
                        {products &&
                          products.map((product, key) => (
                            <ProductCard product={product} key={key} />
                          ))}
                      </div>
                    </section>
                  </main>
                </>
              )}
            </div>
            {loading ? (
              <Loader />
            ) : (
              <>
                {resultPerPage < count && (
                  <div className="paginationBox">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={productsCount}
                      onChange={setCurrentPageNo}
                      nextPageText="Next"
                      prevPageText="Prev"
                      firstPageText="1st"
                      lastPageText="Last"
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </>
      <Footer />
    </>
  );
};

export default Products;
