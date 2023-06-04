import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiLoader4Line } from "react-icons/ri";

function DeletePost({ id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  function handleDeleteClick() {
    setIsModalOpen(true);
  }

  async function handleConfirmDelete() {
    try {
      setIsDeleting(true);
      await axios.delete(`http://localhost:5000/posts/${id}`);
      setIsDeleting(false);
      setIsModalOpen(false);
      navigate("/posts");
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
      setIsModalOpen(false);
      alert("Unable to delete the post. Please try again.");
    }
  }

  function handleCancelDelete() {
    setIsModalOpen(false);
  }

  return (
    <>
      <DeleteButton onClick={handleDeleteClick}>
        {isDeleting ? <RiLoader4Line className="loading" /> : "Delete"}
      </DeleteButton>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancelDelete}
        style={customModalStyles}
        ariaHideApp={false}
      >
        <ModalTitle>Are you sure you want to delete this post?</ModalTitle>
        <ButtonContainer>
          <CancelButton onClick={handleCancelDelete}>No, go back</CancelButton>
          <DeleteButton onClick={handleConfirmDelete} disabled={isDeleting}>
            {isDeleting ? <RiLoader4Line className="loading" /> : "Yes, delete it"}
          </DeleteButton>
        </ButtonContainer>
      </Modal>
    </>
  );
}

const customModalStyles = {
  content: {
    width: "597px",
    height: "262px",
    backgroundColor: "#333333",
    borderRadius: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
  },
};

const ModalTitle = styled.h1`
  color: #fff;
  font-weight: 700;
  text-align: center;
  line-height: 41px;
  font-family: "Lato";
  font-size: 34px;
  margin-top: 38px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 39px;
`;

const CancelButton = styled.button`
  width: 134px;
  height: 37px;
  border-radius: 5px;
  background-color: #fff;
  color: #1877f2;
  font-family: "Lato";
  font-weight: 700;
  font-size: 18px;
  margin-right: 27px;
  cursor: pointer;
  border: none;
`;

const DeleteButton = styled.button`
  width: 134px;
  height: 37px;
  border-radius: 5px;
  background-color: #1877f2;
  color: #fff;
  font-family: "Lato";
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  border: none;

  .loading {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default DeletePost;
