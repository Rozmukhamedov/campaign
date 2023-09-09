"use strict";
exports.__esModule = true;
exports.queryClient = void 0;
// import React from "react"
// import UseCustomFetcher from "hooks/useFetch";
var react_query_1 = require("react-query");
// const URLBASE = process.env.BASE_API_KEY;
// export const createAccount = () => {
//     console.log("12344")
//     const [error, UseFetcher] = UseCustomFetcher();
//     console.log(UseFetcher({
//         url: `${URLBASE}/account/register/with/email/`,
//         method: "GET",
//     }))
// }
exports.queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});
