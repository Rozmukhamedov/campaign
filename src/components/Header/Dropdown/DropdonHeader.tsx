import "./styless.css";
import { Avatar } from "@mantine/core";
import { removeCookie } from "utils/cookie";
import IMG from "../../../assets/images/default_user.png";
import { useAccountPopup } from "context/AccountPopupContext";

const DropdonHeader = ({ mainUser }: any) => {
  const { changeModal } = useAccountPopup();

  return (
    <div className="dropdown__wrapper">
      <div onClick={changeModal} className="user__info">
        <p>
          {mainUser?.first_name}
          <br />
          {mainUser?.last_name}
        </p>
        <Avatar
          radius="xl"
          size="lg"
          src={mainUser?.image ? `${mainUser?.image}` : IMG}
        />
      </div>
      <div className="dropdown__setting">
        <ul>
          <li onClick={changeModal}>Settings</li>
          <li
            onClick={() => {
              removeCookie("token");
              removeCookie("refresh_token");
              removeCookie("user");
              localStorage.clear();
              window.location.reload();
            }}
          >
            Log out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdonHeader;
