import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../config/ProtectedRoute";
import AdminLayout from "../layout/AdminLayout";
import ManagerLayout from "../layout/ManagerLayout";
import AccountCreate from "../pages/AccountCreate";
import Accounts from "../pages/Accounts";
import Billing from "../pages/Billing";
import DashBoard from "../pages/DashBoard";
import EditAccount from "../pages/EditAccount";
import ErrorPage from "../pages/ErrorPage";
import Request from "../pages/Request";
import RequestApproval from "../pages/RequestApproval";
import RequestDetail from "../pages/RequestDetail";
import Service from "../pages/Service";
import Login from "../pages/SignIn";
import Staff from "../pages/Staff";
import Valuation from "../pages/Valuation";

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
      {
        path:"service",
        element: <Service/>
      }
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
      },
      {
        path: "staff",
        element: <Staff />,
      },
      {
        path: "request-approved",
        element: <RequestApproval />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />
  },
]);
