import "./Style.css";
import Skletavatar from "assets/images/skletavatar.svg";
import { Checkbox } from "@mantine/core";

type CandidatevoterItemProps = {
  item: any;
  showChecked: boolean;
  setShowChecked: any;
  deleteVoters: any;
};

const CandidatevoterItem: React.FC<CandidatevoterItemProps> = ({
  item,
  showChecked,
  deleteVoters,
}) => {
  return (
    <div className="candivoteritem">
      <div className="candivoteritem__info">
        <div className="candvoteritem__soc-flex">
          <img
            className="candivoteritem__soc-info1"
            src={item.voter.image ? item.voter.image : Skletavatar}
            alt={item.voter.first_name}
          />
          <div>
            <div className="candivoteritem__name">
              <p>{item.voter.first_name}</p>
              <p>{item.voter.last_name}</p>
            </div>
            <p className="candivoteritem__job">{item.voter.country}</p>
          </div>
        </div>
        <div className="candivoteritem__soc-info2">
          <div>
            <p className="candivoteritem__phone">{item.voter.phone_number}</p>
            <p className="candivoteritem__mail">{item.voter.email}</p>
          </div>
        </div>
      </div>
      <div className="cand-checkbox">
        {showChecked ? (
          <Checkbox
            color="red"
            size="md"
            onChange={() => deleteVoters(item.voter.id)}
          />
        ) : (
          <h3 className="candivoteritem__realnumer">
            {item.voter.invite_people}
          </h3>
        )}
      </div>
    </div>
  );
};

export default CandidatevoterItem;
