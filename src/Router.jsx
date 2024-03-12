import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Publish from "./Pages/Publish";
import Messages from "./Pages/Messages";
import Requests from "./Pages/Requests";
import AppLayout from "./AppLayout";
import Profile from "./Pages/Profile";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import NotfoundPaga from "./Pages/404/404";
import RootLayout from "./RootLayout";
import Travelers from "./Pages/Travelers";
import AuthWrapper from "./Auth/AuthWraper";
import UnAuthWraper from "./Auth/UnAuthWraper";
import PrivacyPolicyPage from "./Pages/PrivacyPolicy/PrivacyPolicy";
import DetailTrip from "./Components/Trips/DetailTrip/DetailTrip";

const router = createBrowserRouter([
    {
      path: "/",
      Component: AuthWrapper(AppLayout),
      children: [
          {
              index: true,
              Component: Home,
          },
          {
              path: 'travelers',
              Component: AuthWrapper(RootLayout),
              children: [
                {
                  index: true,
                  Component: AuthWrapper(Travelers),
                },
                {
                  path : ':trip_id',
                  Component: AuthWrapper(DetailTrip),
                }
              ]
          },
          {
              path: 'publish',
              Component: AuthWrapper(Publish),
          },
          {
              path: 'chats',
              Component: AuthWrapper(Messages),
          },
          {
              path: 'requests',
              Component: AuthWrapper(Requests),
          },
          {
              path: 'profile',
              Component: AuthWrapper(Profile),
          }
        ]
    },
    {
      path: "/",
      // Component: AppLayout,
      Component: RootLayout,
      children: [
          // {
          //     path: 'login',
          //     Component: DashBoard,
          // },
          {
              path: 'login',
              Component: UnAuthWraper(Login),
          },
          {
            path:'register',
            Component : UnAuthWraper(Register)
          },
          {
            path:'forgot-password',
            Component : UnAuthWraper(ForgotPassword)
          },
          {
            path:'privacy-policy',
            Component : UnAuthWraper(PrivacyPolicyPage)
          }
      ],
    },
    {
      path: '*',
      Component: NotfoundPaga,
    },
  ])

  export default router