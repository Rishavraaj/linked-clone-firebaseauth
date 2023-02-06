import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import firebase from "firebase/compat/app";
import React from "react";
import { connect } from "react-redux";
import { postArticleAPI } from "../actions";

const Postmodal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const swithchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };
    props.postArticle(payload);
    console.log(props.postArticle(payload));
    reset(e);
  };

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(e) => reset(e)}>
                <img src="/images/close.svg" alt="" />
              </button>
            </Header>
            <Sharedcontent>
              <Userinfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{props.user.displayName}</span>
              </Userinfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="lets post buddy"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <Uploadimage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">select an image</label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </Uploadimage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="please input aa video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </Sharedcontent>
            <Sharedcreation>
              <Attachassets>
                <Assetbutton onClick={() => swithchAssetArea("image")}>
                  <img src="/images/photo-icon.svg" alt="" />
                </Assetbutton>
                <Assetbutton onClick={() => swithchAssetArea("media")}>
                  <img src="/images/video-icon.svg" alt="" />
                </Assetbutton>
              </Attachassets>
              <Sharecomment>
                <Assetbutton>
                  <img src="/images/comment.svg" alt="" />
                  Anyone
                </Assetbutton>
              </Sharecomment>
              <Postbutton
                disabled={!editorText ? true : false}
                onClick={(e) => postArticle(e)}
              >
                post
              </Postbutton>
            </Sharedcreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    background: none;
    outline: none;
    border: none;
    color: rgba(0, 0, 0, 0.15);
    svg,
    img {
      pointer-events: none;
      height: 90%;
      width: 90%;
    }
  }
`;

const Sharedcontent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const Userinfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const Sharedcreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const Assetbutton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  background: none;
  border: 1px solid black;
  border-radius: 4px;
  outline: none;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
`;

const Attachassets = styled.div`
  align-items: center;
  display: flex;
  gap: 15px;
  padding-right: 8px;
  ${Assetbutton} {
    width: 40px;
  }
`;

const Sharecomment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1 px solid rgba(0, 0, 0, 0.15);
  ${Assetbutton} {
    svg {
      margin-right: 5px;
    }
  }
`;

const Postbutton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: #0a66c2;
  color: #fff;
  &:hover {
    background: #004182;
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const Uploadimage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Postmodal);
