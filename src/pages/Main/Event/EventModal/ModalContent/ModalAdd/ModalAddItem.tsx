import "./style.css";
import React, { ChangeEvent } from "react";
import IMG from "assets/images/default_user.png";

type ModaladdItemProps = {
  item: any;
  setGuests: any;
  guests: any[];
};
const ModalAddItem: React.FC<ModaladdItemProps> = ({
  item,
  guests,
  setGuests,
}) => {
  const handleOnChangeAddEvent = (
    e: ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    if (e?.target?.checked) {
      setGuests([...guests, data?.id]);
    } else {
      setGuests(guests.filter((item) => item !== data.id));
    }
  };

  return (
    <div className="modaladd__item_wrapper">
      <div className="modaladd__soc-info">
        <img src={item?.image ? item?.image : IMG} alt="" />
        <div className="modaladditem__name-job">
          <p className="modaladditem__name">{item?.first_name}</p>
          <p className="modaladditem__job">{item?.organization}</p>
        </div>
      </div>
      <div className="modaladditem__phone-mail">
        <p>{item?.social_contacts?.phone_number}</p>
        <p> {item?.social_contacts?.email}</p>
      </div>
      <div className="modaladditem__checkbox">
        <input
          onChange={(e) => handleOnChangeAddEvent(e, item)}
          type="checkbox"
        />
      </div>
    </div>
  );
};

export default ModalAddItem;
