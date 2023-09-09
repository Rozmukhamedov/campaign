import { useQuery } from "react-query";
import { request } from "services/api";

export const useGetContactPersons = ({enabled, page, election, sponsor}: {enabled: any, page: number, election: number, sponsor: number}) => {
  return useQuery(["election-sponsor-contact-persons", page, election, sponsor], async () => {
    const { data } = await request.get(`/election/sponsor/contact/person/`, {
      params: { page, election, sponsor},
},);
    return data;
  }, {enabled: enabled});
};
