import "./styless.css";
import { Container } from "@mantine/core";
import CusomCarousel from "components/Carousel/Carousel";
import SkletonCard from "components/Card/SkletonCard/SkletonCard";
import { useCandidatesQuery, useElectionEventQuery } from "hooks/query";
import { useElectionContext } from "context/ElectionContext";
import { useGetElectionById } from "hooks/query/useGetElectionById";

const Candidates = () => {
  const { electionId } = useElectionContext();
  const getElectionId = useGetElectionById(electionId, true);

  const candidateList = useCandidatesQuery({
    page: 1,
    election: electionId,
    
  });

  return (
    <div className="cand_wrapper">
      <div className="position__cand-bottom">
      </div>
      <Container size="xl">
        <h2>Candidates</h2>
        {candidateList.isLoading ? (
          <SkletonCard />
        ) : (
          <CusomCarousel
            CandidatesList={candidateList}
            height="auto"
            slideSize="auto"
            slideGap="xl"
            align="start"
            slidesToScroll={3}
            withControls={false}
          />
        )}
      </Container>
    </div>
  );
};

export default Candidates;
