import React, { useState } from "react";
import styled from "styled-components";
import { SlPencil, SlTrash } from "react-icons/sl";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

export default function SinglePost({ post }) {
  const { id, username, description, link, image, likes, metatitle, metadescript, metaimage } =
    post;
  const [isEditing, setIsEditing] = useState(false);
  const [isPostClicked, setIsPostClicked] = useState(false);
  const [hasClicked, setHasClicked] = useState(true);
  const [editedDescription, setEditedDescription] = useState(description);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(false);
    setHasClicked(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setHasClicked(false);
    setEditedDescription(description);
  };

  const handlePostClick = () => {
    setIsPostClicked(!isPostClicked);
    setIsEditing(true);
    setHasClicked(true);
  };

  const handleDeleteIconClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <ContainerSinglePost>
      <Post data-test="post" onClick={handlePostClick}>
        <SideBar>
          <ProfilePhoto src={image} />
        </SideBar>

        <ContentBox>
          <PostTop>
            <UserName data-test="username">{username}</UserName>
            {hasClicked && (
              <IconContainer>
                <EditIcon size={16} onClick={handleEditClick} />
                <DeleteIcon size={16} onClick={handleDeleteIconClick} />
              </IconContainer>
            )}
          </PostTop>
          {isEditing ? (
            <EditPost id={id} description={editedDescription} onCancel={handleEditCancel} />
          ) : (
            <DescriptionContainer>
              <Description data-test="description">{description}</Description>
            </DescriptionContainer>
          )}

          <ContainerMetadata data-test="link">
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
