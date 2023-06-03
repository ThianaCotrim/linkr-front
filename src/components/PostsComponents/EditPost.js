import React, { useState, useRef } from "react";
import axios from "axios";

function EditPost({ id, description }) {
  const token = localStorage.getItem("userToken");
  const [text, setText] = useState(description);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsSaving(false);
    setError(null);
    focusInput();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveChanges();
    } else if (event.key === "Escape") {
      event.preventDefault();
      cancelEditing();
    }
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  const saveChanges = async () => {
    try {
      setIsSaving(true);
      const url = `https://localhost:5000/timeline`;
      const headers = { headers: { authorization: `Bearer ${token}` } };
      await axios.put(url, { id, description: text }, { headers });
      setIsEditing(false);
      setIsSaving(false);
    } catch (error) {
      console.error(error);
      setIsSaving(false);
      setError("Não foi possível salvar as alterações. Por favor, tente novamente.");
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setIsSaving(false);
    setError(null);
    setText(description);
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      {isEditing ? (
        <>
          <textarea
            ref={inputRef}
            value={text}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isSaving}
          />
          {error && <p>{error}</p>}
        </>
      ) : (
        <p onClick={handleEditClick}>{text}</p>
      )}
    </>
  );
}

export default EditPost;
