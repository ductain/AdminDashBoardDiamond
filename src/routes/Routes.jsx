import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import DashBoard from "../pages/DashBoard";
import Accounts from "../pages/Accounts";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/SignIn";
import ProtectedRoute from "../config/ProtectedRoute";
import AccountCreate from "../pages/AccountCreate";
import Request from "../pages/Request";
import RequestDetail from "../pages/RequestDetail";
import EditAccount from "../pages/EditAccount";
import Billing from "../pages/Billing";
import Valuation from "../pages/Valuation";
import ManagerLayout from "../layout/ManagerLayout";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute requiredRoles={["Admin"]}>
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
        path: "accounts/edit/:id",
        element: <EditAccount />,
      },
      {
        path: "accounts/create",
        element: <AccountCreate />,
      },
    ],
  },
  {
    path: "/manager",
    element: (
      <ProtectedRoute requiredRoles={["Manager"]}>
        <ManagerLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "requests",
        element: <Request />,
      },
      {
        path: "requests/detail/:id",
        element: <RequestDetail />,
      },
      {
        path: "billing",
        element: <Billing />,
      },
      {
        path: "valuation/:id",
        element: <Valuation />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />
  },
]);
