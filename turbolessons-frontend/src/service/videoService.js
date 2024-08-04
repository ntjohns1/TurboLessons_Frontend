import api from "./axiosConfig";

export const fetchVideos = async () => {
  try {
    const response = await api.get("/video");
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const getVideo = async (videoSrc) => {
  try {
    const response = await api.get(videoSrc, { responseType: "blob" });
    const url = window.URL.createObjectURL(response.data);
    return url;
  } catch (error) {
    console.error("Error fetching video:", error);
    throw error;
  }
};

export const uploadVideo = async (formState) => {
  try {
    const formData = new FormData();
    formData.append("file", formState);

    const response = await api.post("/video", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};
