import styled from "styled-components";
import { useState, useEffect } from "react";
import React from "react";
import Postmodal from "./Postmodal";
import { connect } from "react-redux";
import { getArticleAPI } from "../actions";
import ReactPlayer from "react-player";

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <>
      {props.article.length === 0 ? (
        <p>No article </p>
      ) : (
        <Container>
          <SharedBox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} />
              ) : (
                <img src="/images/user.svg" alt="" />
              )}
              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
              >
                Start a post
              </button>
            </div>
            <div>
              <button>
                <img src="/images/photo-icon.svg" alt="" />
                <span>Photo</span>
              </button>
              <button>
                <img src="/images/video-icon.svg" alt="" />
                <span>Video</span>
              </button>
              <button>
                <img src="/images/event-icon.svg" alt="" />
                <span>Event</span>
              </button>
              <button>
                <img src="/images/article-icon.svg" alt="" />
                <span>Article</span>
              </button>
            </div>
          </SharedBox>
          <Content>
            {props.loading && <h4>Loading....</h4>}
            {props.article.length > 0 &&
              props.article.map((article, key) => (
                <Article key={key}>
                  <Sharedactor>
                    <a>
                      <img src={article.actor.image} alt="" />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toDateString()}
                        </span>
                      </div>
                    </a>
                    <button>...</button>
                  </Sharedactor>
                  <Discription>{article.description}</Discription>
                  <Sharedimg>
                    <a>
                      {!article.sharedImg && article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />
                      ) : (
                        article.sharedImg && <img src={article.sharedImg} />
                      )}
                    </a>
                  </Sharedimg>
                  <Socialcount>
                    <li>
                      {/* <button>
                        <img src="" alt="" />
                        <span>76</span>
                      </button> */}
                    </li>
                    <li>{/* <a>2 comments</a> */}</li>
                  </Socialcount>
                  <Socialactions>
                    <button>
                      <img src="/images/like.svg" alt="" />
                      <span>like</span>
                    </button>
                    <button>
                      <img src="/images/comment.svg" alt="" />
                      <span>comment</span>
                    </button>
                    <button>
                      <img src="/images/repost.svg" alt="" />
                      <span>repost</span>
                    </button>
                    <button>
                      <img src="/images/send.svg" alt="" />
                      <span>share</span>
                    </button>
                  </Socialactions>
                </Article>
              ))}
          </Content>
          <Postmodal showModal={showModal} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const Commoncard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
`;

const SharedBox = styled(Commoncard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: #fff;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background: #fff;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }
`;

const Article = styled(Commoncard)`
  padding: 0;
  /* margin: 0 8px; */
  overflow: visible;
`;

const Sharedactor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 20px;
  }
`;

const Discription = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const Sharedimg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const Socialcount = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
    }
  }
`;

const Socialactions = styled.div`
  align-items: center;
  display: flex;
  margin: 0;
  justify-content: space-around;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    background: transparent;
    border: none;
    outline: none;
    padding: 8px;
    color: rgba(0, 0, 0, 0.6);
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  font-weight: 600;
`;

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    article: state.articleState.article,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticleAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
