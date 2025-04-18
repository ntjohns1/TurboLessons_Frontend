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
const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    videoUrls: {}, // Map of video src to blob URLs
    currentVideo: null,
    loading: false,
    error: null,
    uploadProgress: 0,
    uploadStatus: 'idle', // 'idle' | 'uploading' | 'success' | 'error'
  },
  reducers: {
    setCurrentVideo(state, action) {
      state.currentVideo = action.payload;
    },
    setUploadProgress(state, action) {
      state.uploadProgress = action.payload;
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
    resetUploadStatus(state) {
      state.uploadProgress = 0;
      state.uploadStatus = 'idle';
      state.error = null;
    }
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
      // Upload Video
      .addCase(uploadVideoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadStatus = 'uploading';
      })
      .addCase(uploadVideoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.videos.push(action.payload);
        state.uploadStatus = 'success';
      })
      .addCase(uploadVideoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.uploadStatus = 'error';
      });
  },
});

export const {
  setCurrentVideo,
  setUploadProgress,
  clearVideoUrls,
  resetUploadStatus
} = videoSlice.actions;

// Selectors
export const selectVideos = (state) => state.videos.videos;
export const selectVideoUrls = (state) => state.videos.videoUrls;
export const selectCurrentVideo = (state) => state.videos.currentVideo;
export const selectLoading = (state) => state.videos.loading;
export const selectError = (state) => state.videos.error;
export const selectUploadProgress = (state) => state.videos.uploadProgress;
export const selectUploadStatus = (state) => state.videos.uploadStatus;

export default videoSlice.reducer;