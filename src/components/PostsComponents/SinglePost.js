import React, { useContext, useState } from "react";
import reactStringReplace from "react-string-replace";
import styled from "styled-components";
import { SlPencil, SlTrash } from "react-icons/sl";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import hashtagContext from "../../context/hashtag.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineComment } from "react-icons/ai";

export default function SinglePost({ post, loggedUser }) {
  const [allComents, setAllComments] = useState(false);
  const [commnetCounter, setCommentCounter] = useState(Number(post?.comments || 0));
  const { setHashtagsInfo, setHashtagTitle } = useContext(hashtagContext);
  const { id, description, link, likes, metatitle, metadescript, metaimage } = post;
  const [heart, setHeart] = useState("heart-outline");
  const [lik, setLik] = useState(post.likes);
  const [cor, setCor] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPostClicked, setIsPostClicked] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  const handleEditClick = () => {
    if (loggedUser !== post.userId) {
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedDescription(description);
  };

  const handlePostClick = () => {
    if (loggedUser !== post.userId) {
      setIsPostClicked(!isPostClicked);
      setIsEditing(true);
    }
  };

  const handleDeleteIconClick = () => {
    if (loggedUser !== post.userId) {
      setIsModalOpen(false);
    }
  };

  const handleDeleteModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleMetaClick = () => {
    window.open(link, "_blank");
  };

  function specificPage(hashtag) {
    const PORT = "http://localhost:5000";
    axios
      .get(`${PORT}/hashtag/${hashtag}`)
      .then((r) => {
        setHashtagsInfo(r.data);
        setUserInfo(r.data);
        setHashtagTitle(hashtag);
        navigate(`/hashtag/${hashtag}`);
      })
      .catch((e) => console.log(e));
  }

  const like = () => {
    if (heart === "heart-outline") {
      setHeart("heart");
      setCor(true);
      setLik(lik + 1);
    } else {
      setHeart("heart-outline");
      setCor(false);
      setLik(lik - 1);
    }
  };

  const { profileImage, name } = userInfo || {};

  return (
    <ContainerSinglePost>
      <Post data-test="post">
        <SideBar>
          <ProfilePhoto src={profileImage} />
          <AiOutlineComment
            color="white"
            onClick={() => setAllComments(!allComents)}
            data-test="comment-btn"
          />
          <p data-test="comment-counter">{commnetCounter} comments</p>
          <ion-icon
            style={cor ? { color: "red" } : { color: "white" }}
            onClick={like}
            name={heart}
          ></ion-icon>
          {lik} likes
        </SideBar>
        <ContentBox>
          <PostTop>
            <UserName data-test="username" onClick={() => handleUserClick(post.userId)}>
              {name}
            </UserName>

            {loggedUser === post.userId ? (
              <IconContainer
                style={{
                  display: "none",
                }}
              ></IconContainer>
            ) : (
              <IconContainer>
                <EditIcon size={16} onClick={handleEditClick} data-test="edit-btn" />
                <DeleteIcon size={16} onClick={handleDeleteIconClick} data-test="delete-btn" />
              </IconContainer>
            )}
          </PostTop>
          {isEditing ? (
            <EditPost
              id={id}
              description={editedDescription}
              onCancel={handleEditCancel}
              data-test="edit-input"
            />
          ) : (
            <DescriptionContainer onClick={handlePostClick}>
              <Description data-test="description">
                {reactStringReplace(description, description.match(/#(\w+)/g), (match) => (
                  <span
                    onClick={() => specificPage(match.slice(1))}
                    style={{
                      fontFamily: "Lato",
                      fontWeight: "700",
                      fontSize: "19px",
                      lineHeight: "23px",
                      letterSpacing: "0.05em",
                      color: "#FFFFFF",
                    }}
                  >
                    {match}
                  </span>
                ))}
              </Description>
            </DescriptionContainer>
          )}

          <ContainerMetadata data-test="link" onClick={handleMetaClick}>
            <MetadataBox>
              <MetaTitle>{metatitle}</MetaTitle>
              <MetaDescrip>{metadescript}</MetaDescrip>
              <MetaLink>{link}</MetaLink>
            </MetadataBox>

            <MetaPhoto src={metaimage} />
          </ContainerMetadata>
        </ContentBox>
      </Post>
      {isModalOpen && (
        <DeletePost id={id} onCancel={handleDeleteModalCancel} isModalOpen={isModalOpen} />
      )}
    </ContainerSinglePost>
  );
}

const ContainerSinglePost = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 275px;
  border-radius: 16px;
  margin-bottom: 15px;
`;

const Post = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 275px;
  border-radius: 16px;
  background: #171717;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 2;
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 17px;
  padding-right: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 17px;
  padding-right: 0px;
  color: white;

  ion-icon {
    font-size: 25px;
    margin-bottom: 7px;
    color: white;
    :hover {
      cursor: pointer;
    }
  }
`;

const PostTop = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

const ContentBox = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 1rem;
  @media (max-width: 710px) {
    width: 80%;
    margin-right: 3rem;
  }
`;

const ProfilePhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  margin-bottom: 20px;
`;

const UserName = styled.p`
  height: 23px;
  font-family: "Lato";
  font-weight: 400;
  font-size: 19px;
  line-height: 22px;
  color: #ffffff;
  margin-top: 20px;
  :hover {
    cursor: pointer;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const Description = styled.p`
  width: 100%;
  min-height: 45px;
  font-family: "Lato";
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #b7b7b7;
  margin-top: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 15px;
`;

const EditIcon = styled(SlPencil)`
  margin-right: 10px;
  cursor: pointer;
  color: #fff;
`;

const DeleteIcon = styled(SlTrash)`
  cursor: pointer;
  color: #fff;
`;

const ContainerMetadata = styled.div`
  width: 100%;
  height: 155px;
  background: #171717;
  border-radius: 11px;
  border: 1px solid #c4c4c4;
  margin-bottom: 20px;
  margin-top: 1rem;
  cursor: pointer;
  display: flex;
`;
const MetadataBox = styled.div`
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MetaPhoto = styled.img`
  width: 150px;
  height: 100%;
  border-top-right-radius: 11px;
  border-bottom-right-radius: 11px;
`;
const MetaTitle = styled.p`
  width: 300px;
  height: 40px;
  max-height: 40px;
  overflow: hidden;
  font-family: "Lato";
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #cecece;
`;
const MetaDescrip = styled.p`
  width: 300px;
  height: 40px;
  max-height: 40px;
  overflow: hidden;
  font-family: "Lato";
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #9b9595;
`;
const MetaLink = styled.p`
  width: 300px;
  height: 40px;
  max-height: 40px;
  overflow: hidden;
  font-family: "Lato";
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #cecece;
  margin-top: 0.5rem;
`;
