import "./style.css";
import React, { useState } from "react";
import { Grid } from "@mantine/core";
import ElectionCard from "./Card/ElectionCard";
import { useGetElectionQuery } from "hooks/query";
import { Link } from "react-router-dom";

function ElectionPage() {
  const [mainUser, setMainUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}") || {}
  );
  const electionList = useGetElectionQuery({
    page: 1,
    userId: mainUser.id,
    enabled: true,
  });

  return (
    <div className="election__page">
      <h3>Elections in this account</h3>
      <Grid>
        <Grid.Col span={3}>
          <Link to="/election/create">
            <div className="election__page-create">
              <h5>+</h5>
              <p>New election</p>
            </div>
          </Link>
        </Grid.Col>
        {electionList?.data?.results?.map((item: any) => (
          <Grid.Col key={item.id} span={3}>
            <ElectionCard item={item} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}

export default ElectionPage;
