import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Content, ContentState } from "../types/contentType";
import { contentApi } from "../api/endPoint";
import { RootState } from "../app/store";

// Async thunk for saving content data
export const createContent = async (content: Content) => {
  console.log("on function", content);

  const api_url = `${import.meta.env.VITE_REACT_APP_URL}${contentApi}/`;
  console.log(api_url);

  return await axios.post(api_url, content);
};

// Initial state
const initialState: ContentState = {
  status: "idle",
  error: null,
  content: [] as Content[],
};

// export const fetchPatientThunk = createAsyncThunk(
export const fetchContentThunk = createAsyncThunk<Content[]>(
  "contents/fetchContents",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_URL}${contentApi}`
    );
    return response.data;
  }
);

export const createContentAction = createAsyncThunk(
  "contents/registerContent",
  async (data: Content) => {
    console.log("on asy thunk", data);

    const response = await createContent(data);
    return response.data;
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
        state.status = "loading";
      })
      .addCase(fetchContentThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.content = action.payload;
        // state.patient.count = action.payload
      })
      .addCase(fetchContentThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch content";
      })

      .addCase(createContentAction.fulfilled, (state, action) => {
        // state.patient = (...state.patient, action.payload)
        state.content.push(action.payload);
        state.status = "succeeded";
        // state.patient.data= ...state.patient.data +;
      })
      .addCase(createContentAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createContentAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Registration Faild";
      });

    // .addCase(updatePatientAction.fulfilled, (state, action) => {
    //   // state.patient.push(action.payload);
    //   state.status = "succeeded";
    //   // Update item in the state
    //   const index = state.patient.findIndex(
    //     (patient) => patient.id === action.payload.id
    //   );
    //   if (index !== -1) {
    //     state.patient[index] = action.payload;
    //   }
    // })
    // .addCase(updatePatientAction.pending, (state, action) => {
    //   state.status = "loading";
    // })
    // .addCase(updatePatientAction.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message || "Failed to Update";
    // })

    // .addCase(deletePatientAction.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   // Delete item in the state
    //   state.patient = state.patient.filter(
    //     (patient) => patient.id !== action.payload
    //   );
    //   console.log("filtered", action.payload);
    // })
    // .addCase(deletePatientAction.pending, (state, action) => {
    //   state.status = "loading";
    // })
    // .addCase(deletePatientAction.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message || "Failed to Delete";
    // });
  },
});

export default contentSlice.reducer;
export const contentData = (state: RootState) => state.content;

