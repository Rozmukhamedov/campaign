import "./style.css";
import { Accordion } from "@mantine/core";
import { BsFillPlayFill } from "react-icons/bs";
import AccordionControl from "./AccordionControl";
import facebook from "assets/images/facebook.svg";
import telegram from "assets/images/telegram.svg";
import instagram from "assets/images/instagram.svg";
import phone from "assets/images/phone.svg";
import AddAmountModal from "../SponsorModal/AddAmount/AddAmountModal";
import AddClient from "../SponsorModal/AddClient/AddClient";
import updateIcon from "../../../../../../../assets/images/updateicon.svg";
import { useGetContactPersons } from "hooks/query/useGetContactPersons";
import { useElectionContext } from "context/ElectionContext";
import toast from "react-hot-toast";
import { usePatchContactMutation } from "hooks/mutation";

type SponsorsItemProps = {
  item: any;
  setOpenUpdate: React.Dispatch<React.SetStateAction<string>>;
  openUpdate: any;
  setSponsorId: any;
};

const SponsorsItem: React.FC<SponsorsItemProps> = ({
  item,
  setOpenUpdate,
  openUpdate,
  setSponsorId,
}) => {
  const { electionId } = useElectionContext();
  const useDeleteContact = usePatchContactMutation();

  const contactsList = useGetContactPersons({
    page: 1,
    election: electionId,
    sponsor: item.id,
    enabled: openUpdate === "sponsoritem",
  });

  const deleteContactFunc = (id: any) => {
    const deleteContact = useDeleteContact.mutateAsync({
      election: electionId,
      id: id,
    });
    deleteContact
      .then(() => {
        toast.success("Contact deleted");
        contactsList.refetch();
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  return (
    <div className="sponsoritem__wrapper">
      <div className="sponsoritem__top">
        <div className="sponsoritem__top-info">
          <div className="logo">
            <img src={item.image} alt="logo" />
          </div>
          <div>
            <h2>{item.name}</h2>
            <div className="sponsoritem__socicons">
              {!!item.social_media.facebook ? (
                <a
                  href={
                    "https://www.facebook.com/" + item.social_media.facebook
                  }
                >
                  <img src={facebook} />
                </a>
              ) : null}
              {!!item.social_media.telegram ? (
                <a
                  href={
                    "https://www.instagram.com/" + item.social_media.telegram
                  }
                >
                  <img src={instagram} />
                </a>
              ) : null}
              {!!item.social_media.phone_number ? (
                <a href={"tel:" + item.social_media.phone_number}>
                  <img src={phone} />
                </a>
              ) : null}
            </div>
          </div>
        </div>
        <div className="sponsoritem__updateicon">
          <img
            onClick={() => {
              setOpenUpdate("update");
              setSponsorId(item.id);
            }}
            src={updateIcon}
            alt="update-icon"
          />
        </div>
      </div>

      <div className="sponsoritem__users">
        <Accordion
          className="accordion__sponsor_root"
          chevron={<BsFillPlayFill size={20} />}
          styles={{
            chevron: {
              "&[data-rotate]": {
                transform: "rotate(90deg)",
              },
            },
          }}
        >
          <Accordion.Item value="customization">
            <div className="sponsoritem__acc-container">
              <div>
                <Accordion.Control className="sponsoritem__cont-pos">
                  <p className="sponsoritem__acc-control">Contact person</p>
                </Accordion.Control>
              </div>
              <div className="sponsoritem__acc-btns">
                <AccordionControl item={item} contactsList={contactsList} />
              </div>
            </div>
            {contactsList.data?.results?.map((contact: any) => (
              <Accordion.Panel key={contact.id}>
                <div className="sponsoritem__users">
                  <div className="sponsoritem__users-wrapper">
                    <div className="sponsoritem__users-left">
                      <img src={contact?.image} />

                      <div>
                        <p className="sponsoritem__fullname">
                          {contact.first_name}
                        </p>
                        <p className="sponsoritem__job">{contact.position}</p>
                      </div>
                      <div className="sponsoritem__pm-control">
                        <p className="sponsoritem__phone">
                          {contact.social_contacts.phone_number}
                        </p>
                        <p className="sponsoritem__mail">
                          {contact.social_contacts.email}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="sponsoritem__socicons">
                        {!!contact.social_contacts.facebook ? (
                          <a
                            href={
                              "https://www.facebook.com/" +
                              contact.social_contacts.facebook
                            }
                          >
                            <img src={facebook} />
                          </a>
                        ) : null}
                        {!!contact.social_contacts.telegram ? (
                          <a
                            href={
                              "https://www.instagram.com/" +
                              contact.social_contacts.telegram
                            }
                          >
                            <img src={instagram} />
                          </a>
                        ) : null}
                        {!!contact.social_contacts.phone_number ? (
                          <a
                            href={"tel:" + contact.social_contacts.phone_number}
                          >
                            <img src={phone} />
                          </a>
                        ) : null}
                      </div>
                    </div>
                    <button
                      className="sponsoritem__acc-delete"
                      onClick={() => deleteContactFunc(contact.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Accordion.Panel>
            ))}
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="sponsoritem__amount">
        <div className="sponsoritem__amount-info">
          <h3>The amount</h3>
          {/* <button onClick={() => setOpened(true)}>Add</button> */}
        </div>
        {item.amount?.map((i: any) => (
          <div className="sponsoritem__amount-budget">
            <p className="sponsor__amaount-date">{i.custom_date}</p>
            <span></span>
            <p className="sponsor__amaount-budget">{i.amount}</p>
          </div>
        ))}
      </div>
      {/* <AddAmountModal opened={opened} setOpened={setOpened} /> */}

      {/* <AddClient /> */}
    </div>
  );
};

export default SponsorsItem;
