import { createContext, useState, useContext } from "react";

const MainStatesContext = createContext();

export function useStatesPopup() {
  return useContext(MainStatesContext);
}

export function MainStatesProvider({ children }) {
  const [opened, setOpened] = useState(false);
  const [updateGeneral, setupdateGeneral] = useState(0);
  const [updateVoterPage, setUpdateVoterPage] = useState(0);
  const [refreshCandidates, setRefreshCandidates] = useState(0);

  const changeModal = () => {
    setOpened(!opened);
  };

  return (
    <MainStatesContext.Provider
      value={{
        changeModal,
        opened,
        setOpened,
        updateGeneral,
        setupdateGeneral,
        updateVoterPage,
        setUpdateVoterPage,
        refreshCandidates,
        setRefreshCandidates,
      }}
    >
      {children}
    </MainStatesContext.Provider>
  );
}
