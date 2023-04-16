import { useState } from "react";
import styled from 'styled-components';


type AddToFavoritesButtonProps = {
  isFavorite: boolean;
  onClick: () => void;
};

const AddToFavoritesButton = ({ isFavorite, onClick }: AddToFavoritesButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const [isInLocalStorage, setIsInLocalStorage] = useState(
    () => window.localStorage.getItem('favorites')?.includes('YourMusicID') || false
  );

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    onClick();
    setIsInLocalStorage(!isInLocalStorage);
  };

  return (
    <Button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isFavorite={isInLocalStorage}
      hovered={hovered}
    >
      Retirer des favoris" ou "Ajouter aux favoris".
      {isInLocalStorage ? "Retirer des favori" : "Ajouter des favori"}
    </Button>
  );
};

const Button = styled.button<{ isFavorite: boolean; hovered: boolean }>`
  background-color: ${(props: { isFavorite: any; hovered: any; }) =>
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
