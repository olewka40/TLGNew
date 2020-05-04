import { Component } from "react";
import withContextPage from "../components/HOC/Page";
import styled from "styled-components";
class App extends Component {
  render() {
    return (
      <>
        <Container>
          <MainDialog>
            <Text>Выберите,кому хотели бы написать</Text>
          </MainDialog>
        </Container>
      </>
    );
  }
}

export default withContextPage(App);

const Container = styled.div`
  background-color: #0e1621;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-content: center;
`;
const MainDialog = styled.div`
  background-color: #1c2c3a;
  border-radius: 40px;
`;
const Text = styled.div`
  color: #efe9e9;
  font-size: 14px;
  text-align: center;
  align-items: center;
  padding: 5px 12px;
`;
