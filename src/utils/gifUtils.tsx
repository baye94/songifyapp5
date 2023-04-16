import { useSearchGifsQuery } from "../services/api/gif/gitApi";

const useGifUrl = (title: string) => {
  const { data } = useSearchGifsQuery(title);
  const gifUrl = data?.[0]?.original?.url;
  return gifUrl;
}

export default useGifUrl;