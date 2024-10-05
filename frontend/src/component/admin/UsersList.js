import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
// import "./productList.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      enqueueSnackbar({ message }, { variant: "success" });
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [
    dispatch,
    error,
    enqueueSnackbar,
    isDeleted,
    message,
    deleteError,
    navigate,
  ]);

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 100,
      flex: 0.4,
    },

    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "Username",
      headerName: "User Name",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              draggable="false"
              className="productListImg"
              src={params.row.avatar}
              alt={params.row.name}
            />
            {params.row.Username}
          </div>
        );
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 150,
      flex: 0.2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 100,
      flex: 0.1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            {params.row.role === "admin" ? (
              <span className="food__stock">{params.row.role}</span>
            ) : (
              <span className="food__stockAva">{params.row.role}</span>
            )}
          </>
        );
      },
    },
    {
      field: "registeredOn",
      headerName: "Registered On",
      type: "date",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flex: 0.2,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      flex: 0.3,
      type: "number",
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
              className="productListDelete"
            />
          </>
        );
      },
    },
  ];
  const rows = [];

  users &&
    users.forEach((item) => {
      rows.unshift({
        id: item._id,
        role: item.role,
        email: item.email,
        avatar: item.avatar.url,
        Username: item.Username,
        gender: item.gender,
        registeredOn: new Date(item.createdAt).toISOString().substring(0, 10),
      });
    });
  return (
    <div className="Admin__dashboard">
      <Sidebar />
      <section className="Admin__home">
        <h1 id="productListHeading">ALL Registered Users</h1>

        <div className="productList">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </section>
    </div>
  );
};
export default UsersList;
