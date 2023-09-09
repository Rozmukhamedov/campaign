import "./styless.css";
import { Container } from "@mantine/core";
import { useCandidatesQuery, useElectionEventQuery } from "hooks/query";
import { useElectionContext } from "context/ElectionContext";
import { useGetElectionById } from "hooks/query/useGetElectionById";

const Candidateinfo = () => {
  const { electionId } = useElectionContext();
  const getElectionId = useGetElectionById(electionId, true);
  const chars = getElectionId.data?.days_left?.split(":");

  return (
    <div className="position__cand-bottom">
      <div className="cand__header">
        <Container size="xl" className="cand__header-container">
          <div className="cand__left-header">
            <p>
            Votes: <span>{getElectionId?.data?.real_numbers}</span>
            </p>
            <p>
            Target: <span>{getElectionId?.data?.predictions}</span>
            </p>
          </div>
          <div className="cand__right-header">
            {getElectionId.data?.days_left && getElectionId.data?.days_left !== "Election is left" ? (
              <p>
                {chars[0] === 0 ? `${chars[0]} day` : `${chars[0]} days`}{" : "}
                {chars[1] === 0 ? `${chars[1]} hour` : `${chars[1]} hours`}{" : "}
                {chars[2] === 0 ? `${chars[2]} minute` : `${chars[1]} minutes`}
                <span>left</span>
              </p>
            ) : (
              <p>{getElectionId.data?.days_left}</p>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Candidateinfo;
