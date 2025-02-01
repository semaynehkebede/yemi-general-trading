import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AboutInput, AboutOutput, AboutState } from "../types/contentType";
import {
  createAboutConUrl,
  deleteAboutConUrl,
  updateAboutConUrl,
  viewAboutUrl,
} from "../api/endPoint";
import { RootState } from "../app/store";
import api from "../configuration/axios";
import axios from "axios";

// Async thunk for saving content data
export const createAboutContent = async (aboutCon: AboutInput) => {
  console.log("on function", aboutCon);
  const api_url = `${import.meta.env.VITE_API_URL}${createAboutConUrl}`;
  console.log(api_url);
  return await api.post(api_url, aboutCon);
};

export const updateAboutContent = async (aboutCon: any) => {
  const id = aboutCon.get("id"); // Get single field
  const updateAboutCon_api = `${
    import.meta.env.VITE_API_URL
  }${updateAboutConUrl}${id}/`;
  console.log("update", updateAboutCon_api);
  const response = await api.patch(updateAboutCon_api, aboutCon);
  return response;
};

export const deleteAboutContent = async (id: string) => {
  console.log("deleted data", id);
  const deleteAboutCon_api = `${
    import.meta.env.VITE_API_URL
  }${deleteAboutConUrl}${id}/`;
  console.log("url", deleteAboutCon_api);
  const response = await api.delete(deleteAboutCon_api);
  console.log("res", response.data);
  return response;
};

// Initial state
const initialState: AboutState = {
  isLoading: true,
  aboutContent: [] as AboutOutput[],
};

export const createAboutAction = createAsyncThunk(
  "createAboutAction",
  async (data: any) => {
    console.log("on asy thunk", data);

    const response = await createAboutContent(data);
    return response.data;
  }
);
// export const fetchPatientThunk = createAsyncThunk(
export const fetchAboutThunk = createAsyncThunk(
  "about/fetchAbouts",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}${viewAboutUrl}`
    );
    console.log("on feach asynch", response.data);
    return response.data;
  }
);
export const updateAboutAction = createAsyncThunk(
  "about/updateAbouts",
  async (data: any) => {
    console.log("up", data);

    const response = await updateAboutContent(data);
    return response.data;
  }
);

export const deleteAboutAction = createAsyncThunk(
  "about/deleteAbouts",
  async (id: string) => {
    console.log("on action");
    
    const response = await deleteAboutContent(id);
    return response.data;
  }
);
// Slice

const aboutSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAboutAction.fulfilled, (state, action) => {
        state.aboutContent.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createAboutAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createAboutAction.rejected, (state, action) => {
        state.isLoading = true;
      })

      .addCase(fetchAboutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAboutThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.aboutContent = action.payload;
      })
      .addCase(fetchAboutThunk.rejected, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateAboutAction.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        // Update item in the state
        const index = state.aboutContent.findIndex(
          (aboutCont: any) => aboutCont.id === action.payload.id
        );
        if (index !== -1) {
          state.aboutContent[index] = action.payload;
        }
      })
      .addCase(updateAboutAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateAboutAction.rejected, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteAboutAction.fulfilled, (state, action) => {
        state.isLoading = false;
        // Delete item in the state
        state.aboutContent = state.aboutContent.filter(
          (aboutCon) => aboutCon.id !== action.payload
        );
        console.log("filtered", action.payload);
      })
      .addCase(deleteAboutAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteAboutAction.rejected, (state, action) => {
        state.isLoading = true;
      });
  },
});

export default aboutSlice.reducer;
export const imageData = (state: RootState) => state.imageContent;
