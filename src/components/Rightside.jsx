import styled from "styled-components";

import React from "react";

const Rightside = () => {
  return (
    <Container>
      <Followcard>
        <Title>
          <h2>Add to your feed</h2>
          <img src="/images/feed-icon.svg" alt="" />
        </Title>
        <Feedlist>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#linkedin</span>
              <button>Follow</button>
            </div>
          </li>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#video</span>
              <button>Follow</button>
            </div>
          </li>
        </Feedlist>
        <Recomendation>
          view all recomendations
          <img src="/images/right-icon.svg" alt="" />
        </Recomendation>
      </Followcard>
      <Bannercard>
        <img src="" alt="" />
      </Bannercard>
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightside;
`;

const Followcard = styled.div`
  margin-bottom: 8px;
  text-align: center;
  overflow: hidden;
  background: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  padding: 12px;
`;
const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
`;

const Feedlist = styled.ul`
  margin-top: 16px;
  li {
    display: flex;
    align-items: center;
    margin: 12px 0;
    position: relative;
    font-size: 14px;
    div {
      display: flex;
      flex-direction: column;
    }
    button {
      background: transparent;
      color: rgba(0, 0, 0, 0.6);
      padding: 16px;
      align-items: center;
      border-radius: 15px;
      box-sizing: border-box;
      display: inline-flex;
      font-weight: 600;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
    }
  }
`;

const Avatar = styled.div`
  background-image: url("https://static-expl.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 48px;
  height: 48px;
  margin-right: 8px;
`;

const Recomendation = styled.a`
  color: #0a66c2;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const Bannercard = styled(Followcard)``;

export default Rightside;
