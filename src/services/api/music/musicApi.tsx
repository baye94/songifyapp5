import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Recording  {
    id: number;
    title: string;
    duration: number;
    format: string;
  };
  
   export interface Music {
    id: string;
    title: string;
    artist: string;
    description: string;
  }
  
  
  export const musicApi = createApi({
    reducerPath: "music",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://musicbrainz.org/ws/2/",
    }),
    endpoints: (builder) => ({
      fetchMusics: builder.query<Music[], void>({
        query: () => ({
          url: `recording/?query=artist:Queen&fmt=json&inc=artist-credits+isrcs+release-groups`,
          method: "GET",
        }),
        transformResponse: (response: { recordings: { id: string, title: string, 'artist-credit': { name: string }[], 'release-groups': { title: string, disambiguation: string }[] }[] }) => {
          return response.recordings.map((recording) => ({
            id: recording.id,
            title: recording.title,
            artist: recording['artist-credit'] && recording['artist-credit'][0] ? recording['artist-credit'][0].name : 'Unknown',
            description: recording['release-groups'] && recording['release-groups'][0] ? recording['release-groups'][0].title + ' - ' + recording['release-groups'][0].disambiguation : 'Unknown'
          }));
        }
      }),
    }),
  });
  
  export const { useFetchMusicsQuery } = musicApi;
  