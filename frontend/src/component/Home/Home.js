import React, { Fragment, useEffect } from "react";
import Header from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import menu from "../../img/banner/menu.svg";
import "../styles.css";
import ProductCard from "./ProductCard";
import Slider from "./Slider";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import Categories from "./Categories";
import { FoodCategories } from "../layout/Category";

const Home = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <Header />
      <div className="container">
        <main>
          {loading ? (
            <Loader />
          ) : (
            <>
              <Slider />
              {/* categor */}
              <section className="product" id="Categories">
                <h2 className="section-title">Top Categories</h2>

                <p className="section-text">
                  Consectetur numquam poro nemo veniam eligendi rem adipisci quo
                  modi.
                </p>
                <div style={{ display: "flex" }}>
                  {FoodCategories.map((item) => (
                    <Categories FoodCat={item} key={item.id} />
                  ))}
                </div>
              </section>

              {/* product */}
              <section className="product" id="menu">
                <h2 className="section-title">Most popular dishes</h2>

                <p className="section-text">
                  Consectetur numquam poro nemo veniam eligendi rem adipisci quo
                  modi.
                </p>

                <div className="products-grid">
                  {products &&
                    products.map((product, key) => (
                      <ProductCard product={product} key={key} />
                    ))}
                </div>
                {/* <ProductCard /> */}
                <Link to="/products">
                  <button className="btn btn-primary btn-icon">
                    <img src={menu} alt="menu icon" loading="lazy" />
                    Full menu
                  </button>
                </Link>
              </section>

              {/* extra */}
              <section className="services" id="services">
                <div className="service-card">
                  <p className="card-number">01</p>

                  <h3 className="card-heading">
                    We are located in the city center
                  </h3>

                  <p className="card-text">
                    Porro nemo veniam necessitatibus praesentium eligendi rem
                    temporibus adipisci quo modi numquam.
                  </p>
                </div>

                <div className="service-card">
                  <p className="card-number">02</p>

                  <h3 className="card-heading">
                    Fresh ingredients from organic farms
                  </h3>

                  <p className="card-text">
                    Porro nemo veniam necessitatibus praesentium eligendi rem
                    temporibus adipisci quo modi numquam.
                  </p>
                </div>

                <div className="service-card">
                  <p className="card-number">03</p>

                  <h3 className="card-heading">
                    Own fast delivery. 30 min Maximum
                  </h3>

                  <p className="card-text">
                    Porro nemo veniam necessitatibus praesentium eligendi rem
                    temporibus adipisci quo modi numquam.
                  </p>
                </div>

                <div className="service-card">
                  <p className="card-number">04</p>

                  <h3 className="card-heading">
                    Professional, experienced chefs
                  </h3>

                  <p className="card-text">
                    Porro nemo veniam necessitatibus praesentium eligendi rem
                    temporibus adipisci quo modi numquam.
                  </p>
                </div>

                <div className="service-card">
                  <p className="card-number">05</p>

                  <h3 className="card-heading">
                    The highest standards of service
                  </h3>

                  <p className="card-text">
                    Porro nemo veniam necessitatibus praesentium eligendi rem
                    temporibus adipisci quo modi numquam.
                  </p>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Home;
