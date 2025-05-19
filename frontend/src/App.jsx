import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from './Pages/Website/Home'
import WebsiteMain from "./Pages/Website/WebsiteMain"
import About from './Pages/Website/About'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SignUp from './Components/Website/SignUp'
import Login from './Components/Website/Login'
import MemberLogin from './Components/Member/MemberLogin'
import MemberMain from './Pages/Member/MemberMain'
import MemberHome from './Pages/Member/MemberHome'
import Profile from './Pages/Member/Profile'
import SelectGander from "./Components/Website/SelectGender"
import AdminMain from './Pages/Admin/AdminMain'
import Dashboard from './Pages/Admin/DashBorad'
import ViewMember from "./Pages/Admin/ViewMember"
import Billing from "./Pages/Admin/Billing"
import Packages from './Pages/Admin/Packages'
import PushNotification from "./Pages/Admin/PushNotification"
import DietPlans from "./Pages/Admin/DietPlans"
import AddSupplement from "./Pages/Admin/AddSupplements"
import ViewSupplement from "./Pages/Admin/ViewSupplement"
import Reports from "./Pages/Admin/Reports"
import Service from './Pages/Website/Service';
import Pricing from './Pages/Website/Pricing';
import Ourteam from './Pages/Website/Ourteam';
import Cart from './Components/Website/Cart';
import UpdateMember from "./Pages/Admin/UpdateMember"
import AddPackages from './Pages/Admin/AddPackages';
import Viewpackage from './Pages/Admin/ViewPackage';
import Editpackage from './Pages/Admin/Editpackage';
import SupplementStore from './Pages/Member/SupplementStore';
import FeeRecipt from "./Pages/Member/FeeRecipt"
import Mydeits from './Pages/Member/Mydeits';
import AdminLogin from './Components/Admin/AdminLogin';
import AddTrainers from './Pages/Admin/AddTrainers';
import ViewTrainers from './Pages/Admin/ViewTrainers';
import EditTrainers from './Pages/Admin/EditTrainer';
import Page404 from "./Components/Website/Page404"



function App() {




  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <WebsiteMain />,
        children: [
          {
            path: "",
            element: <Home />
          },
          {
            path: "about",
            element: <About />
          },
          {
            path: "select-gender",
            element: <SelectGander />

          },
          {
            path: "service",
            element: <Service />
          },
          {
            path: "pricing",
            element: <Pricing />
          },
          {
            path: "our-team",
            element: <Ourteam />
          },
          {
            path: "cart",
            element: <Cart />
          }
        ]
      },
      {
        path: "/member",
        element: <MemberMain />,
        children: [
          {
            path: "",
            element: <MemberHome />
          },
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "supplements",
            element: <SupplementStore />
          },
          {
            path: "fee-receipt",
            element: <FeeRecipt />
          },
          {
            path: "my-diet",
            element: <Mydeits />
          }
        ]
      }, {
        path: "*",
        element: <Page404 />
      },
      {
        path: "/sign-up",
        element: <SignUp />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/member-login",
        element: <MemberLogin />
      },
      {
        path: "/admin",
        element: <AdminMain />,
        children: [
          {
            path: "",
            element: <Dashboard />
          },
          {
            path: "user-mangement",
            children: [
              {
                path: "/admin/user-mangement/update-member/:id",
                element: <UpdateMember />
              },
              {
                path: "/admin/user-mangement/view-member",
                element: <ViewMember />
              }
            ]
          },
          {
            path: "packages",
            children: [
              {
                path: "/admin/packages/add-package",
                element: <AddPackages />

              },
              {
                path: "/admin/packages/view-package",
                element: <Viewpackage />
              }, {
                path: "/admin/packages/edit-package/:id",
                element: <Editpackage />
              }
            ]
          },
          {
            path: "billing",
            element: <Billing />
          },
          {
            path: "fee-packages",
            element: <Packages />
          },
          {
            path: "notifications",
            element: <PushNotification />
          },
          {
            path: "diet-plan",
            element: <DietPlans />
          },
          {
            path: "supplement-store",
            children: [
              {
                path: "/admin/supplement-store/add-supplement",
                element: <AddSupplement />
              },
              {
                path: "/admin/supplement-store/view-supplement",
                element: <ViewSupplement />
              }
            ]
          },
          {
            path: "trainers",
            children: [
              {
                path: "/admin/trainers/add-trainer",
                element: <AddTrainers />
              },
              {
                path: "/admin/trainers/view-trainer",
                element: <ViewTrainers />
              },
              {
                path: "/admin/trainers/edit-trainer/:id",
                element: <EditTrainers />
              }
            ]
          },
          {
            path: "reports",
            element: <Reports />
          }
        ]
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      }
    ]
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App
