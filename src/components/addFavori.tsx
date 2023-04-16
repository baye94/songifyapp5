import { useState } from "react";
import styled from 'styled-components';


type AddToFavoritesButtonProps = {
  isFavorite: boolean;
  onClick: () => void;
};

const AddToFavoritesButton = ({ isFavorite, onClick }: AddToFavoritesButtonProps) => {
  const [hovered, setHovered] = useState(false);

  // Utilisation d'un state pour stocker l'état de l'ajout aux favoris
  const [isInLocalStorage, setIsInLocalStorage] = useState(() => {
    try {
      // Tentative de récupération de l'élément 'favorites' du local storage
      const favorites = window.localStorage.getItem('favorites');
      if (favorites) {
        // Si 'favorites' existe, on vérifie s'il contient l'ID de la musique
        return favorites.includes('YourMusicID');
      }
    } catch (error) {
      // En cas d'erreur, on log l'erreur et on renvoie false pour le state
      console.error('Error while accessing local storage:', error);
    }
    return false;
  });

  // Fonction pour gérer l'entrée de la souris sur le bouton
  const handleMouseEnter = () => {
    setHovered(true);
  };

  // Fonction pour gérer la sortie de la souris du bouton
  const handleMouseLeave = () => {
    setHovered(false);
  };

  // Fonction pour gérer le clic sur le bouton
  const handleClick = () => {
    try {
      // Appel de la fonction onClick passée en props
      onClick();
      
      // Mise à jour du state isInLocalStorage
      setIsInLocalStorage(!isInLocalStorage);
      
      // Tentative de mise à jour du local storage
      const favorites = window.localStorage.getItem('favorites') || '';
      if (isInLocalStorage) {
        // Si l'ID est déjà présent, on le retire de la liste des favoris
        const newFavorites = favorites.replace('YourMusicID,', '').replace(',YourMusicID', '').replace('YourMusicID', '');
        window.localStorage.setItem('favorites', newFavorites);
      } else {
        // Sinon, on ajoute l'ID à la liste des favoris
        const newFavorites = favorites ? `${favorites},YourMusicID` : 'YourMusicID';
        window.localStorage.setItem('favorites', newFavorites);
      }
    } catch (error) {
      // En cas d'erreur, on log l'erreur et on ne fait rien
      console.error('Error while updating local storage:', error);
    }
  };

  return (
    <Button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isFavorite={isInLocalStorage}
      hovered={hovered}
    >
      {isInLocalStorage ? "Retirer des favoris" : "Ajouter des favoris"}
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
