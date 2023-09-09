import "./style.css";
import { useState, FC } from "react";
import SponsorsItem from "./SponsorsItem/SponsorsItem";
import AddClient from "./SponsorModal/AddClient/AddClient";
import UpdateSponsor from "./UpdateSponsor/UpdateSponsor";
import { useElectionContext } from "context/ElectionContext";
import { useGetSponsorsQuery } from "hooks/query";

type SponsorsState = {
  openedModel?: any;
};

const Sponsors: FC<SponsorsState> = ({ openedModel }) => {
  const [opened, setOpened] = useState(false);
  const [openUpdate, setOpenUpdate] = useState("sponsoritem");
  const { electionId } = useElectionContext();
  const [sponsorId, setSponsorId] = useState()

  const useGetSponsors = useGetSponsorsQuery({
    election: electionId,
    enabled: openedModel == "sponsors",
  });

  return (
    <div className="sponsors__wrapper">
      <h2>Sponsors</h2>
      {openUpdate == "sponsoritem" ? (
        <>
          <div className="sponsorsitem">
            {useGetSponsors?.data?.results.map((item: any, index: number) => (
              <SponsorsItem
                item={item}
                key={index}
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                setSponsorId={setSponsorId}
              />
            ))}
          </div>
          <div className="addsponsors" onClick={() => setOpened(true)}>
            +Add sponsor
          </div>
        </>
      ) : openUpdate == "update" ? (
        <UpdateSponsor setSponsorId={setSponsorId} openUpdate={openUpdate} sponsorId={sponsorId} setOpenUpdate={setOpenUpdate} useGetSponsors={useGetSponsors} />
      ) : null}

      <AddClient opened={opened} setOpened={setOpened} useGetSponsors={useGetSponsors}/>
    </div>
  );
};

export default Sponsors;
