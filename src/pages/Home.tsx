import { useEffect, useState } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { Music, useFetchMusicsQuery } from "../services/api/music/musicApi";
import Navbar from "../components/navBar";
import AddToFavoritesButton from "../components/addFavori";

const HomePage = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useFetchMusicsQuery();
  const [favorites, setFavorites] = useState(() => {
    const localStorageValue = window.localStorage.getItem("favorites")
    console.log('init' , localStorageValue)

    if (localStorageValue && localStorageValue !== 'undefined') {
      return JSON.parse(localStorageValue)
    }
    return []
  });
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  
  function addToFavorites(item: Music) {
    if (!favorites.some((favorite: { id: string; }) => favorite.id === item.id)) {
      setFavorites([...favorites, item]);
    }
  }
  
  function removeFromFavorites(item: Music) {
    setFavorites(favorites.filter((favorite: { id: string; }) => favorite.id !== item.id));
  }
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    const myJSON = JSON.stringify(data);
    return <div>{myJSON}</div>;
  }
  
  


  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Heading>Ma liste de musique</Heading>
        <MusicList>
          {data?.map((music) => (
            <MusicCard key={music.id}>
              <MusicImage src="https://via.placeholder.com/300x300"  alt={music.title}  />
              <MusicTitle>{music.title}</MusicTitle>
              <MusicArtist>{music.artist}</MusicArtist>
              <AddToFavoritesButton isFavorite={favorites.some((favorite: { id: string; }) => favorite.id === music.id)} onClick={() => addToFavorites(music)} />
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
  background-color: #008CBA;
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

