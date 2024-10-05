import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { loadUser } from "./actions/userAction";
import "./App.css";
import store from "./store";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import LoginSignUp from "./component/User/LoginSignUp";
import Profile from "./component/User/Profile";
import ProtectedRouter from "./component/Route/ProtectedRouter";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Orders/MyOrders";
import OrderDetails from "./component/Orders/OrderDetails";
import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList";
import { NewProduct } from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from "./component/admin/ProductReviews";
import PageNotFound from "./component/Home/PageNotFound";
import AboutUs from "./component/AboutUs/AboutUs";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/about" element={<AboutUs />} />

        <Route
          path="/account"
          element={
            <ProtectedRouter>
              <Profile />
            </ProtectedRouter>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRouter>
              <UpdateProfile />
            </ProtectedRouter>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRouter>
              <UpdatePassword />
            </ProtectedRouter>
          }
        />
        {/* forgot password */}
        <Route path="/password/forgot" element={<ForgotPassword />} />
        {/* reset password */}
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        {/* cart */}
        <Route path="/cart" element={<Cart />} />
        {/* shipping  */}
        <Route
          path="/shipping"
          element={
            <ProtectedRouter>
              <Shipping />
            </ProtectedRouter>
          }
        />
        {/* checkout  */}
        <Route
          path="/order/confirm"
          element={
            <ProtectedRouter>
              <ConfirmOrder />
            </ProtectedRouter>
          }
        />
        {/* payment */}
        <Route
          path="/process/payment"
          element={
            <ProtectedRouter>
              {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              )}
            </ProtectedRouter>
          }
        />
        {/* payment sucess page */}
        <Route
          path="/success"
          element={
            <ProtectedRouter>
              <OrderSuccess />
            </ProtectedRouter>
          }
        />
        {/* orders */}
        <Route
          path="/orders"
          element={
            <ProtectedRouter>
              <MyOrders />
            </ProtectedRouter>
          }
        />
        {/* orders Details */}
        <Route
          path="/order/:id"
          element={
            <ProtectedRouter>
              <OrderDetails />
            </ProtectedRouter>
          }
        />
        {/* admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRouter isAdmin={true}>
              <Dashboard />
            </ProtectedRouter>
          }
        />
        {/* admin productes */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRouter isAdmin={true}>
              <ProductList />
            </ProtectedRouter>
          }
        />
        {/* crate products -- admin */}
        <Route
          path="/admin/product"
          element={
            <ProtectedRouter isAdmin={true}>
              <NewProduct />
            </ProtectedRouter>
          }
        />
        {/* Update products -- admin */}
        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRouter isAdmin={true}>
              <UpdateProduct />
            </ProtectedRouter>
          }
        />
        {/* All Orders products -- admin */}
        <Route
          path="/admin/orders"
          element={
            <ProtectedRouter isAdmin={true}>
              <OrderList />
            </ProtectedRouter>
          }
        />
        {/* Update Order -- admin */}
        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRouter isAdmin={true}>
              <ProcessOrder />
            </ProtectedRouter>
          }
        />
        {/* All Users-- admin */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRouter isAdmin={true}>
              <UsersList />
            </ProtectedRouter>
          }
        />
        {/* Update Users-- admin */}
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRouter isAdmin={true}>
              <UpdateUser />
            </ProtectedRouter>
          }
        />
        {/* Users Reviews-- admin */}
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRouter isAdmin={true}>
              <ProductReviews />
            </ProtectedRouter>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
