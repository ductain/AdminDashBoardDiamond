import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../config/ProtectedRoute";
import AdminLayout from "../layout/AdminLayout";
import ManagerLayout from "../layout/ManagerLayout";
import ErrorPage from "../pages/ErrorPage";
import FeedBack from "../pages/Manager/FeedBack";
import Login from "../pages/SignIn";
import Valuation from "../pages/Valuation";
import AccountCreate from './../pages/Admin/AccountCreate';
import Accounts from './../pages/Admin/Accounts';
import DashBoard from './../pages/Admin/DashBoard';
import EditAccount from './../pages/Admin/EditAccount';
import Service from './../pages/Admin/Service';
import Billing from './../pages/Manager/Billing';
import Request from './../pages/Manager/Request';
import RequestApproval from './../pages/Manager/RequestApproval';
import RequestDetail from './../pages/Manager/RequestDetail';
import Staff from './../pages/Manager/Staff';

export const routes = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRoles={["Admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
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
        path: "service",
        element: <Service />
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
      },
      {
        path: "feedback",
        element: <FeedBack />,
      }
    ],
  },
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />
  },
]);
