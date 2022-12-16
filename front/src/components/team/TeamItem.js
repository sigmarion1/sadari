import React from "react";
import { Header, Segment } from "semantic-ui-react";
import MemberItem from "../memberManager/MemberItem";

const TeamItem = ({ team, id }) => {
  return (
    <>
      <Header as="h3" textAlign="left">
        {id + 1} 팀 : {team.length} 명
      </Header>

      <Segment stacked>
        {team &&
          team.map((member, index) => (
            <MemberItem key={index} member={member} />
          ))}
      </Segment>
    </>
  );
};

export default TeamItem;
