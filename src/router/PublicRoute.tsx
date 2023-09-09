import {Navigate, Outlet, useLocation} from "react-router-dom";
import {getCookie} from "../utils/cookie";

function PublicRoute() {
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || "/hero";
    const isAuth = !!getCookie("token");
    const regStep = !!getCookie("regStep");

    if (isAuth && !regStep) {
        return <Navigate to={fromPage} replace/>;
    }

    return <Outlet/>;
}

export default PublicRoute;
