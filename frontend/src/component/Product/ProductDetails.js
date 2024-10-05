import React, { useEffect, useState } from "react";
import Header from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { Add, Remove } from "@mui/icons-material";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import "../styles.css";
import styled from "styled-components";
import { mobile } from "./responsive";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { Rating } from "@mui/material";
import veg from "../../img/veg-icon.png";
import non from "../../img/cat/non.png";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ImgContainer = styled.div``;

const Price = styled.span`
  font-weight: 700;
  font-size: 40px;
`;

const AddContainer = styled.div`
  margin: 30px 0;
  width: 90%;
  display: flex;
  align-items: center;

  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
`;

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const params = useParams();
  // increase or decrease quanty
  const [quantity, setQuantity] = useState(1);
  // review open and close
  const [open, setOpen] = useState(false);
  // Rating setter
  const [rating, setRating] = useState(0);
  // writting comment
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  //   useSelector is used to fetch data from the redux
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { cartItems } = useSelector((state) => state.cart);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const productId = params.id;

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const itemInCart = cartItems.some((i) => i.product === productId);

  const addToCartHandler = () => {
    dispatch(addItemsToCart(productId, quantity, product.ratings));
    enqueueSnackbar("Product Added To Cart", { variant: "success" });
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", productId);

    dispatch(newReview(myForm));

    setOpen(false);
  };
  //   is use to call the products and match to access it.
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (reviewError) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar("Review submitted SuccessFully", { variant: "success" });
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(productId));
  }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

  const options = {
    color: "hsl(0, 0%, 47%)",
    size: window.innerWidth < 600 ? 20 : 28,
    isHalf: true,
    value: product.ratings,
    edit: false,
  };

  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="recipe-page">
              <section className="recipe-hero">
                <ImgContainer>
                  <Carousel>
                    {product.images &&
                      product.images.map((item, i) => (
                        <img
                          className="img recipe-hero-img"
                          key={i?.length}
                          src={item.url}
                          alt={`${i} Slide`}
                        />
                      ))}
                  </Carousel>
                </ImgContainer>

                <article className="recipe-info">
                  <div className="recipe-head">
                    <h2>{product.name}</h2>
                    {product?.Foodtype === 1 ? (
                      <img src={veg} className="veg-icon" alt="" />
                    ) : (
                      <img src={non} className="nonveg-icon" alt="" />
                    )}
                  </div>
                  <div className="showcase-rating" style={{ display: "flex" }}>
                    <ReactStars {...options} />
                    <span>({product.numOfReviews} Reviews)</span>
                  </div>
                  <p className="recipe-tags">
                    Tags :
                    {product.tags?.map((item) => (
                      <p>{item}</p>
                    ))}
                  </p>
                  <p>{product.description}</p>
                  <p style={{ margin: "15px 0" }}>
                    Status:{" "}
                    <b
                      className={product.Stock < 1 ? "redColor" : "greenColor"}
                    >
                      {product.Stock < 1 ? "Not Available" : "Available"}
                    </b>
                  </p>
                  <Price>Rs. {product.price}</Price>

                  {/* <div className="recipe-icons">
                    <article>
                      <i className="fas fa-clock"></i>
                      <h5>prep time</h5>
                      <p>30 min.</p>
                    </article>
                    <article>
                      <i className="far fa-clock"></i>
                      <h5>cook time</h5>
                      <p>15 min.</p>
                    </article>
                    <article>
                      <i className="fas fa-user-friends"></i>
                      <h5>serving</h5>
                      <p>6 servings</p>
                    </article>
                  </div> */}

                  <AddContainer>
                    <AmountContainer>
                      <Remove
                        className="decreaseQty"
                        onClick={decreaseQuantity}
                        style={{ marginRight: "5px" }}
                      />
                      <input
                        readOnly
                        value={quantity}
                        type="number"
                        className="in-box"
                      />
                      <Add
                        className="increaseQty"
                        onClick={increaseQuantity}
                        style={{ marginLeft: "5px" }}
                      />
                    </AmountContainer>

                    {product.Stock > 0 && (
                      <button
                        className="add-btn"
                        onClick={itemInCart ? goToCart : addToCartHandler}
                      >
                        {itemInCart ? "GO TO CART" : "ADD TO CART"}
                      </button>
                    )}

                    <button className="sub-btn" onClick={submitReviewToggle}>
                      SUBMIT REVIEW
                    </button>
                  </AddContainer>
                </article>
              </section>
              <section className="recipe-content">
                <article>
                  <div className="testimonial-heading">
                    <h1>
                      OUR HAPPY <span> CLIENTS</span>
                    </h1>
                    <hr
                      style={{
                        display: "block",
                        height: "2px",
                        width: "90px",
                        border: "0",
                        marginTop: "-5px",
                        borderRadius: "5px",
                        borderTop: "4px solid #9daaf2",
                        padding: "0",
                      }}
                    />
                  </div>
                  <Dialog
                    aria-labelledby="review-dialog"
                    open={open}
                    onClose={submitReviewToggle}
                  >
                    <DialogTitle style={{ fontWeight: "600" }}>
                      Your Submit Review
                    </DialogTitle>
                    <DialogContent className="submitDialog">
                      <Stack spacing={1}>
                        <Rating
                          onChange={(e) => setRating(e.target.value)}
                          value={rating}
                          size="large"
                          precision={0.5}
                        />
                      </Stack>

                      <TextField
                        className="submitDialogTextArea"
                        label="Review"
                        multiline
                        rows={3}
                        sx={{ width: 400 }}
                        size="small"
                        variant="outlined"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={submitReviewToggle} color="secondary">
                        Cancel
                      </Button>
                      <Button onClick={reviewSubmitHandler} color="primary">
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                  {product.reviews && product.reviews[0] ? (
                    <div className="testimonials-box-container">
                      {product.reviews &&
                        product.reviews.map((review, key) => (
                          <ReviewCard review={review} key={key} />
                        ))}
                    </div>
                  ) : (
                    <p className="noReviews">No Reviews Yet</p>
                  )}
                </article>
              </section>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
