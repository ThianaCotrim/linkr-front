import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { RxMagnifyingGlass } from "react-icons/rx";

export default function SearchUsers({ searchQuery, setSearchQuery }) {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const searchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5000/search", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            name: searchQuery,
          },
        });
        setSearchResults(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error searching users:", error);
        setIsLoading(false);
      }
    };

    if (searchQuery.length >= 3) {
      const debounceTimeout = setTimeout(searchUsers, 300);

      return () => clearTimeout(debounceTimeout);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, token]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <SearchArea>
        <InputContainer>
          <Input
            type="text"
            placeholder="Search for people"
            value={searchQuery}
            debounceTimeout={300}
            onChange={handleInputChange}
            data-test="search"
          />
          <StyledMagnifyingGlass size={30} color="#c6c6c6" />
        </InputContainer>
      </SearchArea>

      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : (
        <UserList>
          {searchResults.map((user) => (
            <UserItem key={user.id} data-test="user-search">
              <UserImage src={user.profileImage} alt="erro" />
              <UserName>{user.name}</UserName>
            </UserItem>
          ))}
        </UserList>
      )}
    </>
  );
}

const Input = styled(DebounceInput)`
  color: #515151;
  width: 563px;
  height: 45px;
  border-radius: 8px;
  font-family: "Lato";
  font-weight: 400;
  font-size: 19px;
  line-height: 30px;
  padding-left: 7px;
  padding-right: 40px;
  border: none;
  box-sizing: border-box;

  ::placeholder {
    color: #c6c6c6;
  }

  :focus {
    outline: none;
  }
`;

const StyledMagnifyingGlass = styled(RxMagnifyingGlass)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const UserList = styled.ol`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: #e7e7e7;
  border-radius: 8px;
  position: absolute;
  top: 50px;
  width: 100%;
  left: 0;
`;

const UserItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  height: 40px;
`;

const UserImage = styled.img`
  width: 39px !important;
  height: 39px !important;
  border-radius: 26.5px;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-size: 18px;
  margin-left: 10px;
  color: #333;
`;

const SearchArea = styled.div`
  display: flex;
`;

const InputContainer = styled.div`
  position: relative;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  padding-left: 10px;
`;

const LoadingSpinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 0.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
