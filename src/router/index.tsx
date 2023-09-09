import React, {useEffect} from "react";
import LoginPage from "pages/Login/LoginPage";
import {Routes, Route, useLocation} from "react-router-dom";
import SignupPage from "pages/Signup/SignupPage";
import Layout from "components/Layout/Layot";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import HeroPage from "pages/Hero/HeroPage";
import {AnimatePresence} from "framer-motion";
import MainPage from "pages/Main/MainPage";
import ElectionPage from "pages/Election/ElectionPage";
import CreateElectionPage from "pages/Election/Create/CreateElectionPage";

function RouterMain() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Layout/>}>
                    <Route element={<PrivateRoute/>}>
                        <Route index element={<MainPage/>}/>
                        <Route path="hero" element={<HeroPage/>}/>
                        <Route path="election" element={<ElectionPage/>}/>
                        <Route path="election/create" element={<CreateElectionPage/>}/>
                    </Route>

                    <Route element={<PublicRoute/>}>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="signup" element={<SignupPage/>}/>
                    </Route>
                </Route>
                <Route path="*" element={<p>There's nothing here: 404!</p>}></Route>
            </Routes>
        </AnimatePresence>
    );
}

export default RouterMain;
