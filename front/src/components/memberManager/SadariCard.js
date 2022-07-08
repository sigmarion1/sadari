import React, { useCallback } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment,
  Sidebar,
  Visibility,
  Dropdown,
  Card,
  CardDescription,
  Label,
  Input,
  Statistic,
} from "semantic-ui-react";
import ColorTable, { getColorById } from "../../utils/ColorTable";

const SadariCard = ({ member, onClick, isBig, size, manage }) => {
  // const { id, name, active } = member;

  // const color = (id, active) => {
  //   if (active === false) {
  //     return ColorTable[1];
  //   } else {
  //     return getColorById(id);
  //   }
  // };

  // const shortedName = () => {
  //   if (name.length > 6) {
  //     return name.slice(0, 6) + "..";
  //   }

  //   return name;
  // };

  return (
    <Card color="green" fluid>
      <Card.Content>
        <Card.Header>
          민수님의 사다리 <Icon link name="delete" size="tiny" fitted></Icon>{" "}
        </Card.Header>
        <Card.Meta>
          <span className="date">2022/7/2 에 업데이트</span>
        </Card.Meta>
        {/* <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description> */}
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        22명
        <Button.Group color="green" floated="right" size="mini">
          <Button>불러오기</Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default SadariCard;
