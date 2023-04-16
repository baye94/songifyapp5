import React from "react";
import styled from "styled-components";
import Navbar from "../components/navBar";


const FavoriPage = () => {
  const musicList = [
    { id: 1, title: "Bohemian Rhapsody", artist: "Queen" },
    { id: 2, title: "Stairway to Heaven", artist: "Led Zeppelin" },
    { id: 3, title: "Hotel California", artist: "Eagles" },
    { id: 4, title: "Imagine", artist: "John Lennon" },
  ];

  return (
    <><Navbar /><Container>
      <Heading>Ma liste de musique</Heading>
      <MusicList>
        {musicList.map((music) => (
          <MusicListItem key={music.id}>
            <MusicTitle>{music.title}</MusicTitle>
            <MusicArtist>{music.artist}</MusicArtist>
          </MusicListItem>
        ))}
      </MusicList>
    </Container></>
  );
};

export default FavoriPage;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Heading = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const MusicList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MusicListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 600px;
  padding: 1rem;
  margin: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const MusicTitle = styled.p`
  font-size: 1.2rem;
  margin: 0;
`;

const MusicArtist = styled.p`
  font-size: 1rem;
  color: #777;
  margin: 0;
`;