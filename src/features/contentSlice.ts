import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Content, ContentResponse, ContentState } from "../types/contentType";
import { contentApi, deleteApi, viewContentApi } from "../api/endPoint";
import { RootState } from "../app/store";
import api from "../configuration/axios"

// Async thunk for saving content data
export const createContent = async (content: Content) => {
  console.log("on function", content);

  const api_url = `${import.meta.env.VITE_API_URL}${contentApi}`;
  console.log(api_url);
  // return await axios.post(api_url, content);
  return await api.post(api_url, content);
};

export const updateContent = async (content: any) => {
  const id = content.get("id"); // Get single field
  const update_api = `${import.meta.env.VITE_API_URL}${contentApi}${id}/`;
  console.log("update base url", update_api);
  const response = await api.patch(update_api, content); 
  return response;
};

export const deleteContent = async (id: string) => {
  const delete_api = `${import.meta.env.VITE_API_URL}${deleteApi}${id}/`;
  console.log(delete_api, await axios.delete(delete_api));
  await axios.delete(delete_api);
  return id;
};

export const deleteSlider = async (id: string) => {
  const delete_api = `${import.meta.env.VITE_API_URL}${deleteApi}${id}/`;
  console.log(delete_api, await axios.delete(delete_api));
  await axios.delete(delete_api);
  return id;
};

// Initial state
const initialState: ContentState = {
  isLoading: true,
  content: [] as ContentResponse[],
};

// export const fetchPatientThunk = createAsyncThunk(
export const fetchContentThunk = createAsyncThunk(
  "contents/fetchContents",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}${viewContentApi}`
    );
    console.log("on feach asynch", response.data);
    return response.data;
  }
);

export const createContentAction = createAsyncThunk(
  "contents/registerContent",
  async (data: any) => {
    console.log("on asy thunk", data);

    const response = await createContent(data);
    return response.data;
  }
);

export const updateContentAction = createAsyncThunk(
  "contents/updateContents",
  async (data: any) => {
    console.log("up on thunk", data);

    const response = await updateContent(data);
    return response.data;
  }
);

export const deleteContentAction = createAsyncThunk(
  "contents/deleteContents",
  async (id: string) => {
    const response = await deleteContent(id);
    console.log("on asynch", id);
    return id;
  }
);
export const deleteSliderAction = createAsyncThunk(
  "sliders/deleteContents",
  async (id: string) => {
    const response = await deleteContent(id);
    console.log("on asynch", id);
    return id;
  }
);
// Slice

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContentThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.content = action.payload;
        // state.patient.count = action.payload
      })
      .addCase(fetchContentThunk.rejected, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createContentAction.fulfilled, (state, action) => {
        // state.patient = (...state.patient, action.payload)
        state.content.push(action.payload);
        state.isLoading = false;

        // state.patient.data= ...state.patient.data +;
      })
      .addCase(createContentAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createContentAction.rejected, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateContentAction.fulfilled, (state: any, action: any) => {
        // state.patient.push(action.payload);
        state.isLoading = false;
        // Update item in the state
        const index = state.content.findIndex(
          (content: any) => content.id === action.payload.id
        );
        if (index !== -1) {
          state.content[index] = action.payload;
        }
      })
      .addCase(updateContentAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateContentAction.rejected, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteContentAction.fulfilled, (state, action) => {
        state.isLoading = false;
        // Delete item in the state
        state.content = state.content.filter(
          (content) => content.id !== action.payload
        );
        console.log("filtered", action.payload);
      })
      .addCase(deleteContentAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteContentAction.rejected, (state, action) => {
        state.isLoading = true;
      });
  },
});

export default contentSlice.reducer;
export const contentData = (state: RootState) => state.content;
