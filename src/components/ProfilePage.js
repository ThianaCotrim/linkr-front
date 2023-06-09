import React, { useContext } from "react";
import styled from "styled-components";
import Header from "../constants/Header";
import HashtagsBox from "../constants/HashtagsBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SinglePost from "../components/PostsComponents/SinglePost";
import hashtagContext from "../context/hashtag.context";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const { id } = useParams();
  const { user } = useContext(hashtagContext);
  const loggedUser = user?.id;

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
        setUserPosts(response.data.posts);
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfo();
  }, [id]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const { profileImage, name } = userInfo;
  const hasPosts = userPosts.length > 0;

  return (
    <>
      <Header />
      <Wrapper>
        <MainContainer>
          {hasPosts ? (
            <>
              <UserContainer>
                <ProfilePhoto src={profileImage} alt={name} />
                <MainTitle>{name}'s posts</MainTitle>
              </UserContainer>
              <PostsListContainer>
                {userPosts.map((post) => (
                  <SinglePost key={post.id} post={post} loggedUser={loggedUser} />
                ))}
              </PostsListContainer>
            </>
          ) : (
            <UserContainer
              style={{
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                top: "160px",
                left: "calc(50% - 300px)",
              }}
            >
              <ProfilePhoto src={profileImage} alt={name} />
              <MainTitle>{name}'s posts</MainTitle>
            </UserContainer>
          )}
        </MainContainer>
        <HashtagsBox
          
        />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  background: #333333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 28px;
`;

const ProfilePhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
`;

const MainTitle = styled.h1`
  font-family: "Oswald";
  font-weight: 700;
  font-size: 43px;
  line-height: 60px;
  color: #ffffff;
  margin: 0;
  margin-left: 20px;
`;

const PostsListContainer = styled.div`
  margin-top: 20px;
`;

const MainContainer = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
`;
