import React, { useCallback, useState } from "react";
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
  Message,
  Transition,
  Checkbox,
  Modal,
  Form,
  TextArea,
} from "semantic-ui-react";

import fetcher from "../../utils/fetcher";
import useSWR from "swr";

import axios from "axios";

import ColorTable, { getColorById } from "../../utils/ColorTable";

import { timeout } from "../../utils/Timeout";

import useMemberList from "../../contexts/memberList";
import MemberItem from "../memberManager/MemberItem";
import QuestionItem from "./QuestionItem";
// import QuestionList from "./QuestionList";

const OrderComponent = () => {
  const defaultQuestion = "여기에 질문이 나타납니다";

  const { memberList } = useMemberList();
  const activeMemberList = memberList.filter(
    (member) => member.active === true
  );

  // const [currentIndex, setcurrentIndex] = useState(0)
  const [question, setQuestion] = useState(defaultQuestion);
  const [questionList, setQuestionList] = useState([]);
  const [currentMember, setCurrentMember] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [withMember, setWithMember] = useState(false);

  const [textValue, setTextValue] = useState("");
  const handleTextValue = (e) => {
    setTextValue(e.target.value);
  };

  // const { data: membersData, mutate } = useSWR('/api/members', fetcher)

  const [visible, setVisible] = useState(false);

  const onSelect = useCallback(async () => {
    setVisible(true);
    await timeout(1500);

    if (questionList.length == 0) {
      setCurrentMember(null);
      setQuestion("질문이 없어요! 질문 추가하기 버튼을 눌러서 추가해주세요");
    } else {
      const currentQuestion =
        questionList[Math.floor(Math.random() * questionList.length)];

      setQuestion(currentQuestion);

      if (withMember) {
        setCurrentMember(
          activeMemberList[Math.floor(Math.random() * activeMemberList.length)]
        );
      } else {
        setCurrentMember(null);
      }

      setQuestionList(
        questionList.filter((question) => question !== currentQuestion)
      );
    }

    setVisible(false);
  }, [question, questionList, memberList, withMember]);

  const onReset = useCallback(() => {
    setQuestion(defaultQuestion);
    setQuestionList([]);
    setCurrentMember(null);
  }, [question, questionList, memberList]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (textValue) {
        const textValueArray = textValue.split(/\r?\n/).filter(Boolean);
        setQuestionList([...questionList, ...textValueArray]);
        setTextValue("");
        setIsOpen(false);
      }
    },
    [textValue, questionList]
  );

  return (
    <>
      <Grid.Column>
        <Header as="h1" textAlign="center" style={{ margin: "1em" }}>
          그냥 질문지
        </Header>

        <Grid.Row style={{ marginTop: "2em" }}>
          <Button
            fluid
            style={{ height: "50px" }}
            primary
            onClick={() => onSelect()}
            disabled={visible}
          >
            질문지 뽑기
          </Button>
        </Grid.Row>

        <Grid.Row style={{ marginTop: "1em" }}>
          <Checkbox
            checked={withMember}
            disabled={visible}
            onChange={() => {
              setWithMember(!withMember);
            }}
            label="답변자도 같이 뽑기"
          ></Checkbox>
        </Grid.Row>

        <Grid.Row style={{ marginTop: "1em" }}>
          <Button onClick={() => setIsOpen(true)} disabled={visible}>
            질문 추가하기
          </Button>{" "}
          <Button
            // negative
            onClick={() => onReset()}
            // floated="right"
            disabled={visible}
          >
            질문지 초기화
          </Button>
        </Grid.Row>

        <Message info>
          <Message.Header>
            아이스브레이킹, 자기소개를 위한 질문지 뽑기!
          </Message.Header>
          <p>질문지 뽑기 버튼을 눌러서 다양한 질문들을 뽑아보세요!</p>
        </Message>
      </Grid.Column>
      <Grid.Column>
        <br></br>

        <Segment
          raised
          textAlign="center"
          style={{
            display: "table",
            width: "100%",
            // height: "300px",
            padding: "0",
          }}
          stacked
          inverted={visible}
        >
          {!visible && (
            <QuestionItem question={question} member={currentMember} />
          )}

          {visible && <Image size="medium" src="/loading.gif" centered />}
        </Segment>
      </Grid.Column>

      <Modal
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        open={isOpen}
      >
        <Modal.Header>질문을 입력해주세요 - 엔터로 구분됩니다</Modal.Header>

        <Modal.Content>
          {" "}
          <Form onSubmit={onSubmit}>
            <TextArea
              style={{ minHeight: 200 }}
              placeholder="여기에 입력하세요"
              value={textValue}
              onChange={(e) => handleTextValue(e)}
            />

            <Form.Button style={{ marginTop: "1em" }} fluid>
              {" "}
              추가하기
            </Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default OrderComponent;
