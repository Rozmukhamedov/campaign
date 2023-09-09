import React, { FC } from "react";
import { Avatar } from "@mantine/core";
import { Accordion } from "@mantine/core";
import { useGetElectionQuery } from "hooks/query";
import IMG from "../../../assets/images/default_user.png";

type UsersItemProps = {
  setView?: any;
  setOnChangeMail?: any;
  userInfo: any;
  setElectionId: any;
};

const UsersItem: FC<UsersItemProps> = ({
  setView,
  setOnChangeMail,
  userInfo,
  setElectionId,
}) => {
  const electionList = useGetElectionQuery({
    page: 1,
    userId: userInfo?.id,
    enabled: !!userInfo,
  });

  return (
    <section className="useritem__wrapper">
      <Accordion>
        <div className="Profile__sidebar-left">
          <Accordion.Item value="customization">
            <Accordion.Control>
              <div
                className="sidebar__user"
                onClick={() => {
                  setView("account");
                  setOnChangeMail("");
                }}
              >
                <Avatar
                  radius="xl"
                  size="md"
                  src={userInfo?.image ? `${userInfo?.image}` : IMG}
                  alt="user"
                />
                <p>
                  {userInfo?.first_name} {userInfo?.last_name}
                </p>
              </div>
            </Accordion.Control>
            <Accordion.Panel>
              <div className="sidebar__user-info">
                <ul>
                  {electionList?.data?.results.map((election: any) => (
                    <li
                      key={election.title}
                      onClick={() => {
                        setView("edit");
                        setElectionId(election.id);
                      }}
                    >
                      {election.title}
                    </li>
                  ))}
                </ul>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </div>
      </Accordion>
    </section>
  );
};

export default UsersItem;
