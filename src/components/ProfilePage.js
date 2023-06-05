import React from "react";
import styled from "styled-components";
import PostsList from "./PostsList";
import { useLocation } from "react-router-dom";
import Header from "./Header";

export default function ProfilePage() {
  const location = useLocation();
  const { username, image, id } = location.state;

  return (
    <>
      <Header />
      <MainContainer>
        <Container>
          <ProfilePhoto src={image} alt={username} />
          <MainTitle>{username}'s posts</MainTitle>
        </Container>
        <PostsListContainer>
          <PostsList userId={id} />
        </PostsListContainer>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  min-height: 100vh;
  height: 100%;
  background: #333333;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
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
