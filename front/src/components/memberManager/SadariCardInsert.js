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
  Form,
  Checkbox,
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
    <Card color="blue" fluid>
      <Card.Content>
        <Form>
          <Form.Field>
            <label>사다리 이름</label>
            <input placeholder="철수의 사다리" />
          </Form.Field>
          <Form.Field>
            <label>코드</label>
            <input placeholder="사다리 명단을 불러올 때 필요한 코드를 입력해주세요" />
          </Form.Field>
          <Button size="mini" color="blue" floated="right" type="submit">
            저장
          </Button>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default SadariCard;
