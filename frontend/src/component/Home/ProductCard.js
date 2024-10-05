import "../styles.css";
import ReactStars from "react-rating-stars-component";
import non from "../../img/cat/non.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";

const ProductCard = ({ product }) => {
  const options = {
    color: "hsl(0, 0%, 47%)",
    size: window.innerWidth < 600 ? 20 : 28,
    isHalf: true,
    value: product?.ratings,
    edit: false,
  };

  return (
    <>
      <div className="product-card">
        <div className="img-box">
          <a href={`/product/${product._id}`}>
            <img
              src={product.images[0]?.url}
              alt="product_image"
              className="product-img"
              width="200"
              loading="lazy"
            />
          </a>
        </div>

        <section className="main">
          <div className="main-container">
            <div className="Product__header">
              <a href={`/product/${product._id}`}>
                <span className="product-name">{product.name}</span>
              </a>
              <div className="badge">
                {product.Foodtype === 1 ? (
                  <div className="green-leaf">
                    <figure>
                      <img
                        src="https://i.postimg.cc/qvzCTHML/leaf.png"
                        alt="leaf"
                      />
                    </figure>
                  </div>
                ) : (
                  <div className="red-leaf">
                    <figure>
                      <img src={non} alt="non veg" width={24} />
                    </figure>
                  </div>
                )}
                <div className="red-fire">
                  <figure>
                    <img
                      src="https://i.postimg.cc/gjhmD4Y3/fire.png"
                      alt="fire"
                    />
                  </figure>
                </div>
              </div>
            </div>
            <div className="showcase-rating">
              <ReactStars {...options} />
              <span>({product.numOfReviews} Reviews)</span>
            </div>
            <div className="about-food">
              <p className="p-light">{product.description}</p>
            </div>
            <div className="features">
              <span className="span-light">
                <LocalFireDepartmentOutlinedIcon
                  style={{ fontSize: "26px", color: "red" }}
                />
                <span>{product.cal} Cal</span>
              </span>
              <span className="span-light">
                <AccessTimeIcon style={{ fontSize: "26px", color: "black" }} />
                <span>
                  {product.time[0]}min - {product.time[1]}min
                </span>
              </span>
            </div>
            <div className="Product__footer">
              <div className="price">
                <span className="span-bold">
                  Rs. {product.price.toLocaleString()}
                </span>
                <span className="span-red">
                  <del>Rs. {product.actualPrice.toLocaleString()}</del>
                </span>
              </div>
              <div className="btn">
                <a href={`/product/${product._id}`}>
                  <button>View Now</button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductCard;
