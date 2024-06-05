import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../components/Layouts/DefaultLayout/DefaultLayout";
import UserLayout from "../components/Layouts/DefaultLayout/UserLayout";
import AdminLayout from "../components/Layouts/DefaultLayout/AdminLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Event from "../pages/Event/Event";
import Students from "../pages/Students/Students";
import Teachers from "../pages/Teachers/Teachers";
import User from "../pages/User/User";
import Login from "../pages/Login/Login";
import { useSelector } from "react-redux";
import { Role } from "../helpers/enums/roles";
import AccountSettings from "../pages/AccountSettings/AccountSettings";
import StudentRegistration from "../pages/StudentRegistration/StudentRegistration";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import SignUp from "../pages/SignUp/SignUp";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

const RootLayout = () => {
  const userRole = useSelector((state) => state.user.role);
  const token = getTokenFromLocalStorage();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const getLayout = () => {
    switch (userRole) {
      case Role.teacher:
        return <AdminLayout />;
      case Role.student:
        return <UserLayout />;
      default:
        return <DefaultLayout />;
    }
  };

  return getLayout();
};

const routes = [
  // {
  //   path: "/dashboard",
  //   element: <Dashboard />,
  //   handle: {
  //     title: "Dashboard",
  //   },
  // },
  {
    path: "/event",
    element: <Event />,
    handle: {
      title: "Events",
    },
  },
  {
    path: "/students",
    element: <Students />,
    handle: {
      title: "Students",
    },
  },
  {
    path: "/teachers",
    children: [
      {
        path: "/",
        element: <Teachers />,
        handle: {
          title: "Teachers",
        },
      },
      {
        path: ":contactId",
        element: <ProfileCard />,
        handle: {
          title: "ProfileCard",
        },
      },
    ],
  },
  {
    path: "/user",
    children: [
      {
        path: "/",
        element: <User />,
        handle: {
          title: "User",
        },
      },
      {
        path: "account-settings",
        element: <AccountSettings />,
        handle: {
          title: "AccountSettings",
        },
      },
    ],
  },
];

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/student-egistration",
    element: <StudentRegistration />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      ...routes.map((route) => ({
        index: route.path === "/",
        path: route.path === "/" ? undefined : route.path,
        element: route.element,
        handle: route.handle,
        children: route.children?.map((child) => ({
          index: child.path === "/",
          path: child.path === "/" ? undefined : child.path,
          element: child.element,
          handle: child.handle,
        })),
      })),
    ],
  },
]);

export { router, routes };
