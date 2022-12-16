import React from "react";
import {
  Divider,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

const Info = () => {
  const disqusShortname = "sadari";

  return (
    <>
      <Segment vertical basic>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                완전 무료 사다리 '그냥' 사다리
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                이 사이트는 취미로 만들어진 사이트입니다. <br />
                사다리 타기 외에도 다양한 기능을 탑재하여 원격수업과
                랜선회식에서 사용할 수 있습니다! <br />
                많이 많이 쓰고 주변에 알려주세요
              </p>
              <Header as="h3" style={{ fontSize: "2em" }}>
                매번 이름 입력하기 힘드시죠?
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                csv 업로드통해 한번에 관리하고 로그인 기능(추가 예정)을 통해
                명단을 저장해놓을 수 있습니다.
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image bordered rounded size="massive" src="/sadari.png" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column floated="left" width={6}>
              <Image bordered rounded size="massive" src="/sadari2.png" />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                참가자 관리는 한 번만
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                다양한 게임들이 참가자 데이터를 공유합니다. 모임 친구들을
                등록하고 다양한 게임을 진행해보세요!
              </p>
              <Header as="h3" style={{ fontSize: "2em" }}>
                아바타로 더 잘 구분하자
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                참가자를 추가될 대 랜덤으로 아바타가 생성됩니다. 무엇이
                만들어지는지 한번 지켜보세요!
              </p>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Message negative style={{ width: "100%" }}>
              <Message.Header>정보 및 공지 페이지 입니다.</Message.Header>
              <p>업데이트 상황 및 건의사항은 아래 내용을 참고해주세요!!</p>
            </Message>
          </Grid.Row>

          <Grid.Row>
            <Segment style={{ width: "100%" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                업데이트 일정
              </Header>

              <p style={{ fontSize: "1.33em" }}>
                사다리타기 - 구현 완료 <br />
                순서뽑기 - 구현 완료 <br />
                랜덤뽑기 - 구현 완료 <br />
                팀나누기 - 구현 완료 <br />
                자리배치 - 구현 완료 <br />
                로그인 및 명단 저장 - 구현 예정
              </p>

              <Header as="h3" style={{ fontSize: "2em" }}>
                공지사항
              </Header>

              <p style={{ fontSize: "1.33em" }}>
                건의사항이 있을 경우 아래에 코멘트로 달아주세요!!
              </p>
            </Segment>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
};

export default Info;
