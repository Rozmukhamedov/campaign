import { useQuery } from "react-query";
import { request } from "services/api";

export const useGetVoterCandidates = ({candidate, query}:{candidate:number, query:string}) => {
  return useQuery(["use-get-candidates-for-voters", candidate, query], async () => {
    const { data } = await request.get(`/candidates/voter/for/candidate/`, {
      params: { candidate, query },
    });
    return data;
  });
};

