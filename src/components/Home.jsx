import styled from "styled-components";
import React from "react";
import Leftside from "./Leftside";
import Main from "./Main";
import Rightside from "./Rightside";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const Home = (props) => {
  return (
    <Container>
      {!props.user && <Navigate replace to="/" />}
      <Section>
        <h5>
          <a>Hiring in a Hurry? - </a>
        </h5>
        <p>
          Find talented pros in a record time with Upwork and keep business
          moiving.
        </p>
      </Section>
      <Layout>
        <Leftside />
        <Main />
        <Rightside />
      </Layout>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 52px;
  /* padding-left: 115px;
  padding-right: 115px; */
  max-width: 100%;
  @media (max-width: 768px) {
    padding-top: 52px;
    padding-left: 5px;
    padding-right: 5px;
  }
`;

const Content = styled.div`
  max-width: 1128px;
  margin-left: auto;
  margin-right: auto;
`;

const Section = styled.section`
  min-height: 50px;
  padding: 16px;
  box-sizing: content-box;
  align-items: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 225px) minmax(0, 540px) minmax(0, 325px);
  justify-content: center;
  column-gap: 25px;
  row-gap: 25px;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(Home);
