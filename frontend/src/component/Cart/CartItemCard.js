import React from "react";
import "../styles.css";
import styled from "styled-components";
import { Add, DeleteForever, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import ReactStars from "react-rating-stars-component";

const Product = styled.div`
  display: flex;
  border-bottom: 0;
  justify-content: space-between;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  width: 100%;
  height: 100%;
`;
const Image = styled.img`
  padding: 2%;
  width: 250px;
  object-fit: cover;
`;

const Details = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  display: flex;
  & .new:hover {
    color: #acb5ee;
  }
`;

const ProductId = styled.span`
  padding: 10px 0;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;
  gap: 10px 0;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const Price = styled.span`
  font-weight: 700;
  font-size: 30px;
`;

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  // increase qty
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  // decrease qty
  const decreaseQuantity = (id, quantity, stock) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  // delete item
  const deleteCartItem = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const options = {
    color: "hsl(0, 0%, 47%)",
    size: window.innerWidth < 600 ? 20 : 28,
    isHalf: true,
    value: item.ratings,
    edit: false,
  };
  return (
    <>
      <Product className="Cart-Product">
        <ProductDetail>
          <Image src={item.image} />
          <Details>
            <ProductName>
              <Link to={`/product/${item.Product}`} style={{ color: "black" }}>
                <span className="new">{item.name}</span>
              </Link>
            </ProductName>

            <ProductId>
              <b>ID:</b> #{item.product}
            </ProductId>
            <ProductSize>
              <ReactStars {...options} />
            </ProductSize>
          </Details>
        </ProductDetail>
        <PriceDetail>
          {/* <div className="cart-date">
            <p className="text-sm">Delivery by | </p>
          </div> */}
          <ProductAmountContainer>
            <Remove
              className="decreaseQty"
              style={{ marginRight: "5px" }}
              onClick={() => decreaseQuantity(item.product, item.quantity)}
            />

            <input
              readOnly
              value={item.quantity}
              type="number"
              className="in-box"
            />
            <Add
              className="increaseQty"
              style={{ marginLeft: "5px" }}
              onClick={() =>
                increaseQuantity(item.product, item.quantity, item.Stock)
              }
            />
          </ProductAmountContainer>
          <div className="cart-price">
            <Price>Rs. {(item.price * item.quantity).toLocaleString()}</Price>{" "}
            <del>Rs. {(item.actualPrice * item.quantity).toLocaleString()}</del>
          </div>
        </PriceDetail>
        <div
          className="tooltip"
          onClick={() => {
            deleteCartItem(item.product);
          }}
        >
          <DeleteForever />
        </div>
      </Product>
    </>
  );
};

export default CartItemCard;
