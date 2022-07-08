import React, { useCallback, useRef, useState, useContext } from "react";
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
  GridRow,
  Pagination,
  Modal,
  Form,
} from "semantic-ui-react";

import fetcher from "../../utils/fetcher";
import useSWR from "swr";

import axios from "axios";

import MemberItem from "./MemberItem";
import MemberInsert from "./MemberInsert";
import useMemberList from "../../contexts/memberList";

import CSVReader from "react-csv-reader";
import styles from "./styles.css";
import Info from "../../pages/Info";
import SadariCard from "./SadariCard";
import SadariCardInsert from "./SadariCardInsert";

const MemberManager = (props) => {
  const { memberList, setMemberList } = useMemberList();

  const handleForce = (data, fileInfo) => {
    const newMemberList = [];

    data.map((row, id) => {
      newMemberList.push({
        id,
        name: row[0],
        active: true,
        once: false,
      });
    });

    setMemberList(newMemberList);
  };

  const papaparseOptions = {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
    // transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
  };

  // const [memberList, setMemberList] = useState([
  //     {
  //         id: 1,
  //         name: '철수',
  //         active: true,
  //         once: true,
  //     },
  //     {
  //         id: 2,
  //         name: '영희',
  //         active: true,
  //         once: true,
  //     },
  //     {
  //         id: 3,
  //         name: '민수',
  //         active: false,
  //         once: true,
  //     },
  //     {
  //         id: 4,
  //         name: '수연',
  //         active: true,
  //         once: true,
  //     },
  // ])

  // const nextId = useRef(5)

  // const { data: membersData, mutate } = useSWR('/api/members', fetcher)

  // const onCreate = useCallback(
  //     (name) => {
  //         axios
  //             .post('/api/members', { name })
  //             .then(() => mutate())
  //     }, [membersData]
  // )

  // const onActivate = useCallback(
  //     (id) => {
  //         axios
  //             .patch('/api/members/' + id, { status: 1 })
  //             .then(() => mutate())
  //     }, [membersData]
  // )

  // const onDeActivate = useCallback(
  //     (id) => {
  //         axios
  //             .patch('/api/members/' + id, { status: 0 })
  //             .then(() => mutate())
  //     }, [membersData]
  // )

  // const onDelete = useCallback(
  //     (id) => {
  //         axios
  //             .delete('/api/members/' + id)
  //             .then(() => mutate())
  //     }, [membersData]
  // )

  const onDelete = useCallback(() => {
    setMemberList(memberList.filter((member) => member.active === true));
  }, [memberList]);

  const onToggle = useCallback(
    (id) => {
      setMemberList(
        memberList.map((member) =>
          member.id === id ? { ...member, active: !member.active } : member
        )
      );
    },
    [memberList]
  );

  const onCreate = useCallback(
    (name) => {
      const member = {
        id: memberList[memberList.length - 1].id + 1,
        name,
        active: true,
        once: false,
      };
      setMemberList(memberList.concat(member));
    },
    [memberList]
  );

  return (
    <Grid columns="equal" stackable relaxed>
      <Grid.Row>{React.cloneElement(props.children)}</Grid.Row>

      <Divider />

      <Grid.Row>
        <Grid.Column>
          <Segment secondary>
            <Header as="h3" textAlign="center">
              참가자 명단 :{" "}
              {memberList.filter((member) => member.active === true).length} 명
            </Header>
            <Segment textAlign="center">
              {memberList
                .filter((member) => member.active === true)
                .map((member) => (
                  <MemberItem
                    member={member}
                    onClick={onToggle}
                    manage={true}
                  />
                ))}
            </Segment>

            <MemberInsert onCreate={onCreate} memberList={memberList} />

            <Divider />

            <Header as="h3" textAlign="center">
              대기자 명단 :{" "}
              {memberList.filter((member) => member.active === false).length} 명
            </Header>
            <Segment textAlign="center">
              {memberList
                .filter((member) => member.active === false)
                .map((member) => (
                  <MemberItem member={member} onClick={onToggle} />
                ))}
            </Segment>

            <Divider />

            <Header as="h3" textAlign="center">
              csv 업로드 [
              <a href="/csv_sample.csv" download>
                샘플파일
              </a>
              ]
            </Header>

            <CSVReader
              //   cssClass="react-csv-input"
              //   label="Select CSV with secret Death Star statistics"
              onFileLoaded={handleForce}
              parserOptions={papaparseOptions}
              //   style={{width: '100%'}}
              //   cssInputClass={styles.csvInput}
            />
          </Segment>
        </Grid.Column>

        <Grid.Column>
          <Segment secondary>
            <SadariCardInsert />
            <Divider />
            <SadariCard />
            <SadariCard />
            <SadariCard />
            <SadariCard />
            <SadariCard />
            <SadariCard />
            <SadariCard />
            <SadariCard />
            <SadariCard />
            <SadariCard />
            <Divider />
            <Container textAlign="center">
              <Pagination
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={10}
              />{" "}
            </Container>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Divider />

      <Modal
        basic
        // onClose={() => setOpen(false)}
        // onOpen={() => setOpen(true)}
        open={true}
        size="tiny"
        style={{ margin: "1em" }}
      >
        <Header icon>
          <Icon name="road" />
          철수의 사다리
        </Header>
        <Modal.Content>
          <Form onSubmit={() => null} size="large">
            <Form.Field>
              <Form.Input
                required
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="코드를 입력해 주세요"
                // value={password}
                // onChange={onChangePassword}
                style={{ marginBottom: "1em" }}
              />
            </Form.Field>

            <Grid textAlign="right">
              <Grid.Column>
                <Button type="submit" color="green" inverted>
                  <Icon name="checkmark" /> 확인
                </Button>
                <Button color="red" inverted onClick={() => null}>
                  <Icon name="remove" /> 취소
                </Button>
              </Grid.Column>
            </Grid>
          </Form>

          <Message negative>
            <Message.Header>사다리 생성 실패!!</Message.Header>
            <p>중복된 이름입니다. 다른 이름을 넣어주세요.</p>
          </Message>

          {/* {signUpError && (
            <Message negative>
              <Message.Header>사다리 생성 실패!!</Message.Header>
              <p>중복된 이름입니다. 다른 이름을 넣어주세요.</p>
            </Message>
          )}
          {signUpSuccess && (
            <Message positive>
              <Message.Header>사다리 생성 성공!!</Message.Header>
              <p>
                <mark>
                  <a href={"/sadari?name=" + name}>여기</a>
                </mark>
                를 눌러 사다리로 이동합니다.
              </p>
            </Message>
          )} */}
        </Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </Grid>

    // <Grid>
    //     <Grid.Column style={{ maxWidth: 1000 }}>
    //         <Header as='h1' textAlign='center' style={{ margin: '1em' }}>
    //             사다리 참가자
    //     </Header>
    //         <Segment stacked>
    //             <List
    //                 // celled
    //                 divided
    //                 // selection
    //                 size="massive"
    //                 // inverted
    //                 relaxed
    //             // verticalAlign="middle"
    //             >
    //                 {
    //                     membersData &&
    //                     membersData.filter((user) => user.status === 1).map((user) => (
    //                         <UserItem
    //                             user={user}
    //                             key={user.id}
    //                             onActivate={onActivate}
    //                             onDeActivate={onDeActivate}
    //                             onDelete={onDelete}
    //                         />
    //                     )
    //                     )
    //                 }
    //             </List>
    //             <UserInsert onCreate={onCreate} />
    //         </Segment>

    //         <Header as='h1' textAlign='center' style={{ margin: '1em' }}>
    //             대기자
    //     </Header>
    //         <Segment stacked>
    //             <List
    //                 // celled
    //                 divided
    //                 // selection
    //                 size="massive"
    //                 // inverted
    //                 relaxed
    //             // verticalAlign="middle"
    //             >
    //                 {
    //                     membersData &&
    //                     membersData.filter((user) => user.status === 0).map((user) => (
    //                         <UserItem
    //                             user={user}
    //                             key={user.id}
    //                             onActivate={onActivate}
    //                             onDeActivate={onDeActivate}
    //                             onDelete={onDelete}
    //                         />
    //                     )
    //                     )
    //                 }
    //             </List>
    //         </Segment>
    //     </Grid.Column>
    // </Grid>
  );
};

export default MemberManager;
