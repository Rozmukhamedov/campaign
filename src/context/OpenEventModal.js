import {createContext, useState, useContext} from "react";

const EventModalContext = createContext();

export function useEventModalContext() {
    return useContext(EventModalContext);
}

export function EventModalProvider({children}) {
    const [isOpen, setOpen] = useState(false)

    return (<EventModalContext.Provider
        value={{
            setOpen, isOpen
        }}
    >
        {children}
    </EventModalContext.Provider>);
}
