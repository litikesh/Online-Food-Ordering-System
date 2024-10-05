import React, { useEffect } from "react";
import "./productList.css"; // Ensure you have styles for the table and buttons
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import {
  getAdminProduct,
  clearErrors,
  deleteProduct,
} from "../../actions/productAction";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"; // Optional: Can use Font Awesome for icons as well

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (deleteError) {
      enqueueSnackbar(deleteError, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      enqueueSnackbar("Product Deleted Successfully", { variant: "success" });
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, enqueueSnackbar, isDeleted, deleteError, navigate]);

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.unshift({
        id: item._id,
        name: item.name,
        stock: item.Stock,
        price: item.price,
        image: item.images[0].url, // Replace with appropriate field
        createdAt: new Date(item.createdAt).toISOString().substring(0, 10),
      });
    });

  return (
    <div className="Admin__dashboard">
      <Sidebar />
      <section className="Admin__home">
        <h1 id="productListHeading">ALL Products</h1>

        <div className="productList">
          <table className="product-list-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Created On</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.stock}</td>
                  <td>{row.price}</td>
                  <td>{row.createdAt}</td>
                  <td>
                    <Link to={`/admin/product/${row.id}`}>
                      <button className="productListEdit">Edit</button>
                    </Link>
                  </td>
                  <td>
                    <DeleteOutlineIcon
                      onClick={() => deleteProductHandler(row.id)}
                      className="productListDelete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
