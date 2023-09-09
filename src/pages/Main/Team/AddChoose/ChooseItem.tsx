import "./style.css";
import { ChangeEvent } from "react";
import { Checkbox } from "@mantine/core";
import IMG from "assets/images/default_user.png";

export interface ChooseItemProps {
  item: {
    id: number;
    image: string;
    first_name: string;
    last_name: string;
    job: string;
    phone: string;
    social_contacts: string;
  };
  handleOnChoose: (
    e: ChangeEvent<HTMLInputElement>,
    data: ChooseItemProps["item"]
  ) => void;
}
const ChooseItem: React.FC<ChooseItemProps> = ({ item, handleOnChoose }) => {
  return (
    <div className="chooseitem">
      <div className="chooseitem__left-info">
        <img src={!!item.image ? item.image : IMG} alt="profile-photo" />
        <div className="team__fullname-info">
          <p className="chooseitem__name">
            {item.first_name} {item.last_name}
          </p>
          <p className="chooseitem__job">{item.job}</p>
        </div>
      </div>
      <div className="chooseitem__right-info">
        <div>
          <p>{item.phone}</p>
          <p>{item.social_contacts}</p>
        </div>
        <div className="chooseitem__checkbox">
          <Checkbox
            onChange={(event) => handleOnChoose(event, item)}
            color="#1c54fc"
            size="md"
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseItem;
