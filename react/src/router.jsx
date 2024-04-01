import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import DefaultLayout from "./Components/DefaultLayout";
import GuestLayout from "./Components/GuestLayout";
import User from "./pages/user";
import Update from "./pages/update";
import AddUsers from "./pages/addUsers";

const router = createBrowserRouter( [
    {
        path:'/',
        element: <DefaultLayout/>,
        children:[
            {
                path:'/Dashboard',
                element :<Dashboard/>
            },
            {
                path:'/',
                element :< User/>
            },
            {
                path:'/',
                element :< Navigate to ="/user"/>
            },
            {
                path:'/user',
                element :< User/>
            },
            {
              path:'/users/:id',
              element :<Update/>
          },
          {
            path:'/new',
            element :<AddUsers/>
        },


        ]

    },
    {
        path:'/',
        element: <GuestLayout/>,
        children:[
            {
                path:'/login',
                element :<Login/>
            },
            {
                path:'/signup',
                element :<Signup/>
            }

        ]

    },


])

export default router;
