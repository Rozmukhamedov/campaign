import { createContext, useState, useContext } from "react";

const AccountPopupContext = createContext();

export function useAccountPopup() {
  return useContext(AccountPopupContext);
}

export function AccountPopupProvider({ children }) {
  const [popup, setPopup] = useState(false);
  const [opened, setOpened] = useState(false);
  const [isHovering, setIsHovering] = useState(true);

  const changeModal = () => {
    setOpened(!opened);
  };
  const changePopup = () => {
    setPopup(!popup);
  };
  const changeEvent = () => {
    setOpened(!opened);
  };

  const handleMouseOver = () => {
    setIsHovering(false);
  };

  const handleMouseOut = () => {
    setIsHovering(true);
  };

  return (
    <AccountPopupContext.Provider
      value={{
        popup,
        changePopup,
        changeModal,
        opened,
        setOpened,
        changeEvent,
        handleMouseOver,
        handleMouseOut,
        isHovering
      }}
    >
      {children}
    </AccountPopupContext.Provider>
  );
}
