import "./style.css";
import { useState } from "react";
import { ReactComponent as DeleteIcon } from "../../assets/images/delete-red-icon.svg";
import { ReactComponent as UpdateIcon } from "../../assets/images/update-blue-icon.svg";
import facebook from "assets/images/facebook.svg";
import telegram from "assets/images/telegram.svg";
import instagram from "assets/images/instagram.svg";
import phone from "assets/images/phone.svg";
import Skletavatar from "assets/images/skletavatar.svg";
import CardDetails from "./CardDetails+Patch/CardDetails";
import { useCandidatesDetailQuery } from "hooks/query/useCandidatesDetail";
import DeleteModal from "./DeleteModal/DeleteModal";
import { useDeleteCandidateMutation } from "hooks/mutation";
import { useStatesPopup } from "context/MainStatesContext";
import CandidateVoters from "./CandidateVoters/CandidateVoters";
import AddCandidateVoters from "./AddCandidateVoters/AddCandidateVoters";
import { queryClient } from "services/accountAPI";

type cardProps = {
  item?: any;
};

export const Card = ({ item }: cardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [opened, setOpened] = useState(false);
  const [candidateVoters, setCandidateVoters] = useState("");

  const useDeleteCandidat = useDeleteCandidateMutation();

  const RemoveCandinant = () => {
    const deleteCandidat = useDeleteCandidat.mutateAsync(item.id);
    deleteCandidat
      .then((res) => {
        queryClient.refetchQueries("use-get-all-candidates");
        setOpened(false);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const CandidatesListDetail = useCandidatesDetailQuery({
    id: item.id,
    enabled: showDetails,
  });

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div className="card">
      <div className="card__wrapper">
        <div className="inner__card">
          <div
            className="card__img"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <img
              src={item.image ? item.image : Skletavatar}
              alt={item.first_name}
            />
            <div
              className={`${isHovering ? "card__icons" : "card__icons-hidden"}`}
            >
              <UpdateIcon onClick={() => setShowDetails(true)} />
              {!item?.is_owner && (
                <DeleteIcon onClick={() => setOpened(true)} />
              )}
            </div>
          </div>
          <div className="card__info">
            <div>
              <div
                className={`${
                  item.first_name.length > 7 ? "r1" : "card__fullname"
                }`}
              >
                <p>{item.first_name}</p>
                &nbsp;
                <p>{item.last_name}</p>
              </div>
              <div className="socicons">
                {item.social_contacts.facebook === "" ? null : (
                  <a href={item.facebook} target="_blank">
                    <img src={facebook} alt="facebook" />
                  </a>
                )}
                <a href={item.social_contacts.telegram} target="_blank">
                  <img src={telegram} alt="telegram" />
                </a>
                <a href={item.social_contacts.whatsapp} target="_blank">
                  <img src={instagram} alt="instagram" />
                </a>
                <a
                  href={"tel:" + item.social_contacts.phone_number}
                  target="_blank"
                >
                  <img src={phone} alt="phone" />
                </a>
              </div>
            </div>
            <div
              onClick={() => {
                setCandidateVoters("cand");
              }}
              className="voter__k"
            >
              {item.real_numbers} Votes
            </div>
          </div>

          <div className="sort">
            <div className="sort__inner">
              <h4>Target</h4>
              <p> {item.predictions}</p>
            </div>
          </div>
          {/* style={{ backgroundColor: path ? "#F5F5F5" : "#313131" }} */}
          <div
            className="gradient"
            style={{
              background: `linear-gradient(89.93deg, #1c54fc ${
                item.percentage.toFixed(1) + "%"
              }, #e9e9e9  ${item.percentage.toFixed(2) + "%"}`,
            }}
          >
            {item.percentage.toFixed(1)}%
          </div>
          <div className="btn__addvoters">
            <button onClick={() => setCandidateVoters("cand1")}>
              Add voters
            </button>
          </div>
        </div>

        <div className="cardshoddetails">
          {showDetails && CandidatesListDetail.data ? (
            <CardDetails
              voterfirstname={item.first_name}
              voterlastname={item.last_name}
              setShowDetails={setShowDetails}
              showDetails={showDetails}
              CandidatesListDetail={CandidatesListDetail}
            />
          ) : null}
        </div>
      </div>

      <DeleteModal
        opened={opened}
        setOpened={setOpened}
        onClick={RemoveCandinant}
      />
      <div>
        {candidateVoters == "cand" ? (
          <CandidateVoters
            candidateVoters={candidateVoters}
            voterfirstname={item.first_name}
            voterlastname={item.last_name}
            voters={item.real_numbers}
            candidateid={item.id}
            setCandidateVoters={setCandidateVoters}
          />
        ) : candidateVoters == `cand1` ? (
          <AddCandidateVoters
            voterfirstname={item.first_name}
            voterlastname={item.last_name}
            voters={item.real_numbers}
            candidateid={item.id}
            setCandidateVoters={setCandidateVoters}
          />
        ) : null}
      </div>
    </div>
  );
};
