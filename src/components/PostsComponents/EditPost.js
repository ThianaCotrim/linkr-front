import styled from "styled-components";
import React, { useState, useRef } from "react";
import axios from "axios";

export default function EditPost({ id, description, onCancel }) {
  const token = localStorage.getItem("userToken");
  const [text, setText] = useState(description);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const inputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveChanges();
    } else if (event.key === "Escape") {
      event.preventDefault();
      onCancel();
    }
  };

  const saveChanges = async () => {
    try {
      setIsSaving(true);
      const url = `http://localhost:5000/posts/${id}`;
      const headers = { Authorization: `Bearer ${token}` };
      const updatedPost = {
        description: text,
      };
      await axios.put(url, updatedPost, { headers });
      setIsSaving(false);
      setIsEditing(false);
      console.log("Changes saved successfully");
    } catch (error) {
      console.error(error);
      setIsSaving(false);
      setError("It was not possible to save the changes. Please try again.");
    }
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  if (!isEditing) {
    return (
      <p
        style={{
          fontFamily: "Lato",
          fontWeight: "400",
          fontSize: "17px",
          lineHeight: "20px",
          letterSpacing: "0.05em",
          color: "#FFFFFF",
        }}
      >
        {text}
      </p>
    );
  }

  return (
    <>
      <TextArea
        ref={inputRef}
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={isSaving}
        autoFocus
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
}

const TextArea = styled.textarea`
  font-size: 18px;
  color: #b7b7b7;
  background-color: #fff;
  border-radius: 5px;
  padding: 5px;
  max-height: 200px;
  max-width: 490px;

  &:focus {
    outline: none;
    border: none;
  }
`;

const ErrorMessage = styled.p`
  color: #ffbf00;
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
`;
