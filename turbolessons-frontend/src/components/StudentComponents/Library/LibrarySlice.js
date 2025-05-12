import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchVideos, getVideo, uploadVideo } from "../../../service/videoService";

// Thunks
export const fetchVideosThunk = createAsyncThunk(
  "videos/fetchVideos",
  async () => {
    const response = await fetchVideos();
    return response;
  }
);

export const getVideoThunk = createAsyncThunk(
  "videos/getVideo",
  async (videoSrc) => {
    const response = await getVideo(videoSrc);
    return { url: response, src: videoSrc };
  }
);

export const uploadVideoThunk = createAsyncThunk(
  "videos/uploadVideo",
  async (formState) => {
    const response = await uploadVideo(formState);
    return response;
  }
);

// Slice
const librarySlice = createSlice({
  name: "library",
  initialState: {
    videos: [],
    videoUrls: {}, // Map of video src to blob URLs
    currentVideo: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentVideo(state, action) {
      state.currentVideo = action.payload;
    },
    clearVideoUrls(state) {
      // Clean up blob URLs to prevent memory leaks
      Object.values(state.videoUrls).forEach(url => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
      state.videoUrls = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Videos
      .addCase(fetchVideosThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideosThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideosThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Get Video
      .addCase(getVideoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.videoUrls[action.payload.src] = action.payload.url;
      })
      .addCase(getVideoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const {
  setCurrentVideo,
  clearVideoUrls,
} = librarySlice.actions;

// Selectors
export const selectVideos = (state) => state.library.videos;
export const selectVideoUrls = (state) => state.library.videoUrls;
export const selectCurrentVideo = (state) => state.library.currentVideo;
export const selectLoading = (state) => state.library.loading;
export const selectError = (state) => state.library.error;

export default librarySlice.reducer;