import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ImageInput, ImageOutput, ImageState } from "../types/contentType";
import { createImageApi, deleteImageApi, updateImageApi, viewImageApi } from "../api/endPoint";
import { RootState } from "../app/store";
import api from "../configuration/axios";

// Async thunk for saving content data
export const createImage = async (image: ImageInput) => {
  console.log("on function", image);
  const api_url = `${import.meta.env.VITE_API_URL}${createImageApi}`;
  console.log(api_url);
  const response = await api.post(api_url, image);  
  return response;
};

export const updateImage = async (image: any) => {
  const id = image.get("id"); // Get single field
  const updateImage_api = `${
    import.meta.env.VITE_API_URL
  }${updateImageApi}${id}/`;
  console.log("update", updateImage_api);
  const response = await api.patch(updateImage_api, image);
  return response;
};

export const deleteImage = async (id: string) => {
  console.log("deleted data", id);
  const deleteImage_api = `${
    import.meta.env.VITE_API_URL
  }${deleteImageApi}${id}/`;
  console.log("url", deleteImage_api);
  const response = await api.delete(deleteImage_api);
  console.log("res", response.data);
  return response;
};

// Initial state
const initialState: ImageState = {
  isLoading: true,
  image: [] as ImageOutput[],
};

export const createImageAction = createAsyncThunk(
  "image/createImage",
  async (data: any, { rejectWithValue }) => {
    try {
      console.log("on asynch", data);
    const response = await createImage(data);
      console.log("on asy", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data); // Backend's error response
    }
  }
);
// export const fetchPatientThunk = createAsyncThunk(
export const fetchImageThunk = createAsyncThunk(
  "image/fetchimages",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}${viewImageApi}`
    );
    console.log("on feach asynch", response.data);
    return response.data;
  }
);
export const updateImageAction = createAsyncThunk(
  "images/updateImages",
  async (data: any) => {
    console.log("up", data);

    const response = await updateImage(data);
    return response.data;
  }
);

export const deleteImageAction = createAsyncThunk(
  "images/deleteImages",
  async (id: string, { rejectWithValue }) => {
    try {
    console.log("on asynch", id);
    const response = await deleteImage(id);
    console.log("on asy", response.data);
    
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data); // Backend's error response
  }
  }
);
// Slice

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createImageAction.fulfilled, (state, action) => {
        state.image.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createImageAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createImageAction.rejected, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchImageThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchImageThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.image = action.payload;
      })
      .addCase(fetchImageThunk.rejected, (state) => {
        state.isLoading = true;
      })

      .addCase(updateImageAction.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        // Update item in the state
        const index = state.image.findIndex(
          (image: any) => image.id === action.payload.id
        );
        if (index !== -1) {
          state.image[index] = action.payload;
        }
      })
      .addCase(updateImageAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateImageAction.rejected, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteImageAction.fulfilled, (state, action) => {
        state.isLoading = false;
        // Delete item in the state
        console.log("before filtered", action.payload);
        state.image = state.image.filter(
          (image) => image.id !== action.payload
        );
        console.log("filtered", action.payload);
      })
      .addCase(deleteImageAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImageAction.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export default imageSlice.reducer;
export const imageData = (state: RootState) => state.imageContent;
