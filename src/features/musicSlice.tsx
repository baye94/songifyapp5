import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface Recording  {
    id: number;
    title: string;
    duration: number;
    format: string;
  };
interface Music {
  id: string;
  title: string;
  artist: string;
  image: string;
  recording: Recording[];

}

interface MusicState {
  musics: Music[];
  status: "idle" | "loading" | "failed";
  error: string | undefined;
}

const initialState: MusicState = {
  musics: [],
  status: "idle",
  error: undefined,
};

export const fetchMusics = createAsyncThunk("music/fetchMusics", async () => {
  const response = await fetch(
    "https://musicbrainz.org/ws/2/recording/?query=artist:Queen&fmt=json&inc=artist-credits+isrcs"
  );
  const data = await response.json();
  return data.recordings;
});

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMusics.fulfilled, (state, action) => {
        state.status = "idle";
        state.musics = action.payload;
      })
      .addCase(fetchMusics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const musicReducer = musicSlice.reducer;
