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

const MemberItem = ({ member, onClick, isBig, size, manage }) => {
  const { id, name, active } = member;

  const color = (id, active) => {
    if (active === false) {
      return ColorTable[1];
    } else {
      return getColorById(id);
    }
  };

  const shortedName = () => {
    if (name.length > 6) {
      return name.slice(0, 6) + "..";
    }

    return name;
  };

  return (
    <Label
      size={size ? size : "small"}
      image
      color={color(id, active)}
      key={id}
      as="a"
      onClick={onClick ? () => onClick(id) : {}}
      style={
        isBig
          ? { display: "table-cell", verticalAlign: "middle", height: "150px" }
          : { margin: "0.1em" }
      }
    >
      <img
        src={"https://avatars.dicebear.com/api/avataaars/" + name + ".svg"}
      />
      {shortedName()}
      {manage && <Label.Detail>대기</Label.Detail>}
      {!active && <Label.Detail>참가</Label.Detail>}
      {!active && <Label.Detail>삭제</Label.Detail>}
    </Label>
  );
};

export default MemberItem;
