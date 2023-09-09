// import React from "react"
// import UseCustomFetcher from "hooks/useFetch";
import {QueryClient} from "react-query";

// const URLBASE = process.env.BASE_API_KEY;

// export const createAccount = () => {
//     console.log("12344")
//     const [error, UseFetcher] = UseCustomFetcher();
//     console.log(UseFetcher({
//         url: `${URLBASE}/account/register/with/email/`,
//         method: "GET",
//     }))
// }


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

