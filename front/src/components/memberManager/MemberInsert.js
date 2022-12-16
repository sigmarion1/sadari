import React, { useCallback } from "react";
import { Form } from "semantic-ui-react";

import faker from "faker";
import useInput from "../../utils/useInput";

faker.locale = "ko";

const UserInsert = ({ onCreate, memberList }) => {
  const [name, onChangeName, setName] = useInput("");

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (name) {
        onCreate(name);
        setName("");
      } else {
        onCreate(faker.name.firstName());
        setName("");
      }
    },
    [name, memberList]
  );

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group unstackable>
        <Form.Input
          placeholder="이름을 입력해 주세요"
          value={name}
          onChange={onChangeName}
          // fluid
          width={13}
          // unstackable
        />
        <Form.Button
          width={3}
          icon="plus"
          // unstackable
          fluid
          primary
        />
      </Form.Group>
    </Form>
  );
};

export default UserInsert;
