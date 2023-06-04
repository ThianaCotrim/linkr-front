import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { RxMagnifyingGlass } from "react-icons/rx";

export default function SearchUsers() {
  const [searchQuery, setSearchQuery] = useState("");
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
      <InputContainer>
        <Input
          type="text"
          placeholder="Search for people"
          value={searchQuery}
          debounceTimeout={300}
          onChange={handleInputChange}
        />
        <StyledMagnifyingGlass size={30} color="#c6c6c6" />
      </InputContainer>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <UserList>
          {searchResults.map((user) => (
            <UserItem key={user.id}>
              <UserImage src={user.profileImage} alt="" width={39} height={39} />
              <UserName>{user.name}</UserName>
            </UserItem>
          ))}
        </UserList>
      )}
    </>
  );
}

const InputContainer = styled.div`
  position: relative;
`;

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
  top: 41px;
  width: 100%;
  max-width: 620px;
  left: 0;
`;

const UserItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;

const UserImage = styled.img`
  width: 39px;
  height: 39px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-size: 16px;
  color: #333;
`;
