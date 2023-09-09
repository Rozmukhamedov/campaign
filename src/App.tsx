import React from "react";
import "./App.css";
import RouterMain from "./router";
import {AddVoterProvider} from "context/AddVoterContext";
import {ElectionProvider} from "context/ElectionContext";
import {MainStatesProvider} from "context/MainStatesContext";
import {AccountPopupProvider} from "context/AccountPopupContext";
import {Toaster} from "react-hot-toast";
import {UserProvider} from "./context/UserContext";
import {EventModalProvider} from "./context/OpenEventModal";

// just for pipeline

function App() {
    return (
        <div className="App">
            <UserProvider>
                <ElectionProvider>
                    <AccountPopupProvider>
                        <MainStatesProvider>
                            <AddVoterProvider>
                                <EventModalProvider>
                                    <RouterMain/>
                                </EventModalProvider>
                            </AddVoterProvider>
                        </MainStatesProvider>
                    </AccountPopupProvider>
                </ElectionProvider>
            </UserProvider>
            <Toaster/>
        </div>
    );
}

export default App;
