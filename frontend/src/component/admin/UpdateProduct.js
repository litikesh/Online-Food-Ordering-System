import React, { useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const params = useParams();

  const productId = params.id;

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [actualPrice, setActualPrice] = useState(0);
  const [calories, setCalories] = useState(0);
  const [stock, setStock] = useState(0);
  const [type, setType] = useState(1);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [tag, setTags] = useState([]);
  const [cat, setCats] = useState([]);
  const [time, setTime] = useState([]);

  const FoodType = [1, 2];

  const handleTag = (e) => {
    setTags(e.target.value.split(","));
  };
  const handleTime = (e) => {
    setTime(e.target.value.split(","));
  };
  const handleCat = (e) => {
    setCats(e.target.value.split(","));
  };

  // form
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("actualPrice", actualPrice);
    myForm.set("Foodtype", type);
    myForm.set("cal", calories);
    myForm.set("Stock", stock);
    tag.forEach((tags) => {
      myForm.append("tags", tags);
    });
    cat.forEach((cats) => {
      myForm.append("category", cats);
    });
    time.forEach((times) => {
      myForm.append("time", times);
    });
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setActualPrice(product.actualPrice);
      setCalories(product.cal);
      setStock(product.stock);
      setType(product.Foodtype);
      setOldImages(product.images);
      setTags(product.tags);
      setCats(product.category);
      setTime(product.time);
    }
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (updateError) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      enqueueSnackbar("Product Updated sucessufully", { variant: "success" });
      dispatch({ type: UPDATE_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [
    dispatch,
    error,
    isUpdated,
    navigate,
    enqueueSnackbar,
    productId,
    product,
    updateError,
  ]);
  return (
    <div className="Admin__dashboard">
      <Sidebar />
      <section className="Admin__home">
        <div className="newProductContainer">
          <header>Update Food Details</header>
          <form
            className="addProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            {/* name */}
            <div className="field input">
              <label>Product Name</label>
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {/* des */}
            <div className="field input">
              <label>Product Description</label>
              <textarea
                className="PDes"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="price__details">
              {/* offer price */}
              <div className="field input">
                <label>Discounted Price</label>
                <input
                  type="number"
                  placeholder="Discounted Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              {/* Actual price */}
              <div className="field input">
                <label>Actual Price</label>
                <input
                  type="number"
                  placeholder="Actual Price"
                  value={actualPrice}
                  onChange={(e) => setActualPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* food Type 1 or 2 */}
            <div className="field input">
              <label>Food Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option>Choose Food Type</option>
                {FoodType.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            {/* tags */}
            <div className="field input">
              <label>Food Tags</label>
              <input
                value={tag}
                type="text"
                placeholder="Veg, Hot"
                onChange={handleTag}
              />
            </div>

            {/* calories */}
            <div className="field input">
              <label>Calories</label>
              <input
                type="number"
                placeholder="Enter Food Calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                required
              />
            </div>
            {/* Time */}
            <div className="field input">
              <label>Food Delivery Timing</label>
              <input
                type="text"
                placeholder="40, 30"
                onChange={handleTime}
                value={time}
              />
            </div>
            {/* Category */}
            <div className="field input">
              <label>Food Category</label>
              <input
                type="text"
                value={cat}
                placeholder="veg, pizza"
                onChange={handleCat}
              />
            </div>
            <div className="field input">
              <label>Food Stock</label>
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>

            <div className="image__show">
              <div className="field image" style={{ marginLeft: "14px" }}>
                <label>Select Image</label>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  className="input-file"
                  onChange={updateProductImagesChange}
                  multiple
                />
              </div>
              <div id="createProductFormImage">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt="Old Product Preview"
                    />
                  ))}
              </div>
              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>
            </div>

            <div className="field button">
              <input
                id="createProductBtn"
                type="submit"
                value="Update Product"
                disabled={loading ? true : false}
              />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UpdateProduct;
