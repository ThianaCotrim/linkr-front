import React, { useState, useRef } from "react";
import axios from "axios";

function EditPost({ id, description }) {
  const token = localStorage.getItem("userToken");
  const [text, setText] = useState(description);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveChanges();
    } else if (event.key === "Escape") {
      event.preventDefault();
    }
  };

  const saveChanges = async () => {
    try {
      setIsSaving(true);
      const url = `http://localhost:5000/posts/${id}`;
      const headers = { headers: { authorization: `Bearer ${token}` } };
      await axios.put(url, { id, description: text }, { headers });
      setIsSaving(false);
    } catch (error) {
      console.error(error);
      setIsSaving(false);
      setError("Não foi possível salvar as alterações. Por favor, tente novamente.");
    }
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <textarea
        ref={inputRef}
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={isSaving}
        autoFocus
      />
      {error && <p>{error}</p>}
    </>
  );
}

export default EditPost;
