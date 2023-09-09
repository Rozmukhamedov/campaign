import {createContext, useState, useContext} from "react";

const ElectionContext = createContext();

export function useElectionContext() {
    return useContext(ElectionContext);
}

export function ElectionProvider({children}) {
    const [electionId, setElectionId] = useState(localStorage.getItem("election_id"));

    return (
        <ElectionContext.Provider
            value={{
                electionId,
                setElectionId,
            }}
        >
            {children}
        </ElectionContext.Provider>
    );
}
