import {
    createBrowserRouter,
} from "react-router";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Registration/Login";
import Register from "../Pages/Registration/Register";
import Events from "../Pages/Events/Events";
import AddEvents from "../Pages/Events/AddEvents";
import MyEvents from "../Pages/Events/MyEvents";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/events",
                element: <Events />,
            },
            {
                path: "/add_events",
                element: <AddEvents />,
            },
            {
                path: "/my_events",
                element: <MyEvents />,
            },
        ]
    },
]);

export default router;