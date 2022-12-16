import React from "react";
import { Label } from "semantic-ui-react";
import { getColorById } from "../../utils/ColorTable";

const QuestionItem = ({ question, member }) => {
  const { id, name, active } = member || {};

  const color = () => {
    if (!member) {
      return "grey";
    } else {
      return getColorById(id);
    }
  };

  return (
    <Label
      size={"massive"}
      image
      color={color()}
      style={{
        display: "table-cell",
        verticalAlign: "middle",
        height: "300px",
      }}
    >
      {member && (
        <>
          <img
            src={"https://avatars.dicebear.com/api/avataaars/" + name + ".svg"}
          />
          {name}
          <br />
          <br />
          <br />
        </>
      )}

      {question}
    </Label>
  );
};

export default QuestionItem;
