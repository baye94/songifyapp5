import React, { useState } from "react";
import styled from "styled-components";

type AddToFavoritesButtonProps = {
  isFavorite: boolean;
  onClick: () => void;
};

const AddToFavoritesButton = ({ isFavorite, onClick }: AddToFavoritesButtonProps) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isFavorite={isFavorite}
      hovered={hovered}
    >
      {isFavorite ? "Remove from favorites" : "Add to favorites"}
    </Button>
  );
};

const Button = styled.button<{ isFavorite: boolean; hovered: boolean }>`
  background-color: ${(props) =>
    props.isFavorite ? "#e74c3c" : props.hovered ? "#2ecc71" : "#3498db"};
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.isFavorite ? "#c0392b" : props.hovered ? "#27ae60" : "#2980b9"};
  }
`;

export default AddToFavoritesButton;
