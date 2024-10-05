import React, { useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { clearErrors, createProduct } from "../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

export const NewProduct = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [actualPrice, setActualPrice] = useState(0);
  const [calories, setCalories] = useState(0);
  const [stock, setStock] = useState(0);
  const [type, setType] = useState(1);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [tag, setTags] = useState([]);
  const [cat, setCats] = useState([]);
  const [time, setTime] = useState([]);

  const FoodType = [1, 2];
  const categories = [
    "Veg Pizza",
    "Non-Veg Pizza",
    "Pizza Mania",
    "Sides Orders",
    "Beverages",
    "Choice Of Crusts",
    "Burger Pizza",
    "Veg Biryani",
  ];

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
  const createProductSubmitHandler = (e) => {
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
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar("Product Created", { variant: "success" });
      dispatch({ type: NEW_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [dispatch, error, success, navigate, enqueueSnackbar]);
  return (
    <div className="Admin__dashboard">
      <Sidebar />
      <section className="Admin__home">
        <div className="newProductContainer">
          <header>Create New Food</header>
          <form
            className="addProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
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
              <select onChange={(e) => setType(e.target.value)}>
                <option value="">Choose Food Type</option>
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
              <input type="text" placeholder="40, 30" onChange={handleTime} />
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
            {/* <div className="field input">
              <label>Product Description</label>
              <select>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="image__show">
              <div className="field image" style={{ marginLeft: "14px" }}>
                <label>Select Image</label>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  className="input-file"
                  onChange={createProductImagesChange}
                  multiple
                />
              </div>
              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>
            </div>

            <div className="field button">
              <input id="createProductBtn" type="submit" value="Create" />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
