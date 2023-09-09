import { useState } from "react";
import AddContact from "../SponsorModal/AddContact/AddContact";

const AccordionControl = ({ item, contactsList}: any) => {
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <div className="sponsoritem__acc-btns">
        {/* <button className="sponsoritem__acc-delete"> Delete </button> */}
        <button
          onClick={() => setOpened(true)}
          className="sponsoritem__acc-add"
        >
          Add
        </button>
      </div>

      <AddContact item={item} opened={opened} setOpened={setOpened} contactsList={contactsList}/>
    </div>
  );
};

export default AccordionControl;
