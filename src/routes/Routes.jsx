import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import DashBoard from "../pages/DashBoard";
import Accounts from "../pages/Accounts";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import ProtectedRoute from "../config/ProtectedRoute";
import AccountCreate from "../pages/AccountCreate";
import Request from "../pages/Request";
import RequestDetail from "../pages/RequestDetail";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "accounts",
        element: <Accounts />,
      },
      {
        path: "requests",
        element: <Request />,
      },
      {
        path: "requests/detail/:id",
        element: <RequestDetail />,
      },
      {
        path: "accounts/create",
        element: <AccountCreate />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />
  },
]);
