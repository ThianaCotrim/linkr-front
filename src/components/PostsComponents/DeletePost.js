import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";

function DeletePost({ id, onCancel, isModalOpen }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirmDelete() {
    try {
      setIsDeleting(true);

      const token = localStorage.getItem("userToken");
      await axios.delete(`http://localhost:5000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsDeleting(false);
      window.location.reload(true);
      onCancel();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
      onCancel();
      alert("Unable to delete the post. Please try again.");
    }
  }

  function handleCancelDelete() {
    onCancel();
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCancelDelete}
      style={customModalStyles}
      ariaHideApp={false}
    >
      <ModalTitle>Are you sure you want to delete this post?</ModalTitle>
      <ButtonContainer>
        <CancelButton onClick={handleCancelDelete} data-test="cancel">
          No, go back
        </CancelButton>
        <DeleteButton onClick={handleConfirmDelete} disabled={isDeleting} data-test="confirm">
          {isDeleting ? <div className="loading" /> : "Yes, delete it"}
        </DeleteButton>
      </ButtonContainer>
    </Modal>
  );
}

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10000,
    border: "none",
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
