import {Navigate, Outlet, useLocation} from "react-router-dom";
import {getCookie} from "../utils/cookie";


function PrivateRoute() {
    const location = useLocation();
    const isAuth = !!getCookie("token");


    if (!isAuth) {
        return <Navigate to={"/login"} state={{from: location}} replace/>;
    }
    return <Outlet/>;
}

export default PrivateRoute;
