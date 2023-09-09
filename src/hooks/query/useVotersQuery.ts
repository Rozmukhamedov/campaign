import { useQuery } from "react-query";
import { request } from "services/api";

export const useVotersQuery = ({
                                   page,
                                   election,
                                   status,
                                   main,
                                   refresh,
                                   query,
                               }: {
    page?: number;
    election?: number;
    status?: string;
    main?: string;
    refresh?: number;
    query?: string;
}) => {
    return useQuery(
        ["use-get-all-voters", page, election, query, status, main, refresh],
        async () => {
            const { data } = await request.get(`/voters`, {
                params: { page, election, status, main, query },
            });
            return data;
        }
    );
};
