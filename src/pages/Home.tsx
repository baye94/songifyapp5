import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Music, useFetchMusicsQuery } from "../services/api/music/musicApi";
import Navbar from "../components/navBar";
import AddToFavoritesButton from "../components/addFavori";
import Autosuggest from "react-autosuggest";
import { FaSearch } from "react-icons/fa";
import { giphyApi, useSearchGifsQuery } from "../services/api/gif/gitApi";
import GifImage from "../components/gifImage";

const HomePage = () => {
  const dispatch = useDispatch();

  // Utilisation du hook useFetchMusicsQuery pour récupérer les données de musiques
  // isLoading : indique si les données sont en cours de chargement
  // isError : indique si une erreur s'est produite lors du chargement des données
  // error : l'erreur éventuelle retournée par le serveur
  const { data, isLoading, isError, error } = useFetchMusicsQuery();

  // Utilisation du localStorage pour stocker les musiques favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const localStorageValue = window.localStorage.getItem("favorites");

      console.log("init", localStorageValue);

      if (localStorageValue && localStorageValue !== "undefined") {
        return JSON.parse(localStorageValue);
      }
      return [];
    } catch (error) {
      console.error("Erreur lors du chargement des données favorites", error);
      return [];
    }
  });

  // Initialisation des champs de recherche et de suggestion
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Music[]>([]);
  const [searchResults, setSearchResults] = useState<Music[]>([]);

  // Fonction qui retourne une liste de suggestions de musiques en fonction d'une chaîne de recherche
  const getSuggestions = (value: string): Music[] => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : data?.filter(
          (music: Music) =>
            music.title.toLowerCase().slice(0, inputLength) === inputValue
        ) ?? [];
  };

  // Fonction appelée lorsqu'une suggestion est sélectionnée dans le champ de recherche
  const handleChange = (
    event: React.FormEvent<HTMLElement>,
    { newValue }: Autosuggest.ChangeEvent
  ) => {
    setValue(newValue);
    searchMusicByTitle(newValue);
  };

  // Fonction appelée lorsqu'un utilisateur tape dans le champ de recherche
  const onSuggestionsFetchRequested = ({
    value,
  }: Autosuggest.SuggestionsFetchRequestedParams) => {
    const newSuggestions = getSuggestions(value);
    setSuggestions(newSuggestions);
  };

  // Fonction appelée lorsqu'un utilisateur supprime la recherche actuelle
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Utilisation du hook useEffect pour sauvegarder les musiques favorites dans le localStorage
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error(
        "Erreur lors de la sauvegarde des données favorites",
        error
      );
    }
  }, [favorites]);

  // Fonction qui ajoute une musique aux favoris
  function addToFavorites(item: Music) {
    if (
      !favorites.some((favorite: { id: string }) => favorite.id === item.id)
    ) {
      setFavorites([...favorites, item]);
    }
  }

  // Fonction qui effectue une recherche de musiques en fonction d'une chaîne de recherche
  const searchMusicByTitle = (value: string) => {
    try {
      if (data) {
        const results = data.filter((music: Music) =>
          music.title.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche de musiques", error);
      setSearchResults([]);
    }
  };

  // Utilisation du hook useEffect pour initialiser les résultats de recherche avec les données récupérées
  useEffect(() => {
    try {
      if (data) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'initialisation des résultats de recherche",
        error
      );
      setSearchResults([]);
    }
  }, [data]);

  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Heading>Ma liste de musique</Heading>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(music: Music) => music.title}
          renderSuggestion={(music: Music) => (
            <SuggestionItem>{music.title}</SuggestionItem>
          )}
          inputProps={{
            placeholder: "Recherche",
            value: value,
            onChange: handleChange,
          }}
          renderInputComponent={(inputProps) => (
            <SearchContainer>
              <SearchInput {...inputProps} />
              <SearchIcon />
            </SearchContainer>
          )}
          renderSuggestionsContainer={({ containerProps, children, query }) => (
            <SuggestionsContainer {...containerProps}>
              {children}
            </SuggestionsContainer>
          )}
        />
        <br></br>
        <MusicList>
          {searchResults?.map((music) => (
            <MusicCard key={music.id}>
              <GifImage searchQuery={music.title}/>
              
              <MusicTitle>{music.title}</MusicTitle>
              <MusicArtist>{music.artist}</MusicArtist>
              <AddToFavoritesButton
                isFavorite={favorites.some(
                  (favorite: { id: string }) => favorite.id === music.id
                )}
                onClick={() => addToFavorites(music)}
              />
            </MusicCard>
          ))}
        </MusicList>
      </Container>
    </>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Heading = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const MusicList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const MusicCard = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: 300px;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const MusicImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const MusicTitle = styled.h3`
  font-size: 1.5rem;
  margin: 1rem 0 0 0;
  text-align: center;
`;

const MusicArtist = styled.p`
  font-size: 1rem;
  color: #777;
  margin: 0.5rem 0 0 0;
  text-align: center;
`;

const Button = styled.button`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #008cba;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #004e6b;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 5px;
  background-color: #fff;
  width: 300px;
  height: 40px;
  &:focus-within {
    box-shadow: 0 0 0 2px #00bcd4;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
`;

const SearchIcon = styled(FaSearch)`
  color: #999;
  font-size: 20px;
  margin-right: 10px;
`;

const SuggestionsContainer = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
`;

const SuggestionItem = styled.div`
  padding: 8px;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    background-color: #f1f1f1;
  }
`;
