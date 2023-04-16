import styled from 'styled-components';
import { useSearchGifsQuery } from '../services/api/gif/gitApi';

const GifImage = ({ searchQuery }: { searchQuery: string }) => {
  // Appel de l'API à l'aide de useSearchGifsQuery
  const encodedTitle = encodeURIComponent(searchQuery);

  const { data, error, isLoading } = useSearchGifsQuery(encodedTitle);

  try {
    // Gestion de l'état de chargement
    if (isLoading) {
      return <div>Loading...</div>;
    }

    // Récupération de l'URL de l'image GIF
    const gifUrl = data?.[0]?.original?.url;
    console.log('dat' , data)
    console.log(' url ', gifUrl)

    // Affichage de l'image
    return (
      <MusicImage
        src={gifUrl} 
        alt="GIF"
      />
    );
  } catch (error) {
    // Gestion des erreurs de l'API
    return <div>Error:</div>;
  }
};
 export default GifImage
const MusicImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;
