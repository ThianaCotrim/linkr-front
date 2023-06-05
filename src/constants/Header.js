import { useContext, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import hashtagContext from "../context/hashtag.context";
import SearchUsers from "../components/SearchUsers";

export default function Header() {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useContext(hashtagContext);
  const [searchQuery, setSearchQuery] = useState("");
  function exit() {
    navigate("/");
  }
  return (
    <>
      <HeaderStyle>
        <p onClick={() => navigate("/timeline")}>linkr</p>
        <SearchContainer>
          <SearchUsers searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </SearchContainer>

        {logout ? (
          <IoIosArrowUp
            onClick={() => setLogout(false)}
            style={{
              color: "white",
              marginLeft: "87%",
              width: "10%",
              height: "50%",
              cursor: "pointer",
            }}
          />
        ) : (
          <IoIosArrowDown
            onClick={() => setLogout(true)}
            style={{
              color: "white",
              marginLeft: "87%",
              width: "10%",
              height: "50%",
              cursor: "pointer",
            }}
          />
        )}
        <img src={userInfo.profileImage} alt="profileImage" />
      </HeaderStyle>
      {logout === true && (
        <LogoutDiv>
          <p onClick={exit}>Logout</p>
        </LogoutDiv>
      )}
    </>
  );
}
const HeaderStyle = styled.div`
  height: 72px;
  background-color: #151515;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
  flex: 1;

  img {
    width: 2.6%;
    height: 70%;
    border-radius: 100%;
    margin-right: 1%;
  }
  p {
    color: white;
    font-family: "Passion One", cursive;
    font-size: 49px;
    line-height: 54px;
    margin-left: 1%;
    cursor: pointer;
    flex: 1;
    display: flex;
    align-items: center;
  }
`;
const LogoutDiv = styled.div`
  background: #171717;
  border-radius: 0px 0px 20px 20px;
  width: 7%;
  height: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0%;
  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #ffffff;
    cursor: pointer;
  }
`;

const SearchContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
