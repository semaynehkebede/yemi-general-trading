import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ServiceInput, ServiceOutput, ServiceState } from "../types/contentType";
import {createServiceContUrl, deleteServiceContUrl, viewServiceContUrl } from "../api/endPoint";
import { RootState } from "../app/store";
import api from "../configuration/axios";

// Async thunk for saving content data
export const createServiceContent = async (serviceCont: ServiceInput) => {
  console.log("on function", serviceCont);
  const api_url = `${import.meta.env.VITE_API_URL}${createServiceContUrl}`;
  console.log(api_url);
  return await api.post(api_url, serviceCont);
};

export const updateServiceContent = async (serviceCont: any) => {
  const id = serviceCont.get("id"); // Get single field
  const updateServiceCont_api = `${
    import.meta.env.VITE_API_URL
  }${createServiceContUrl}${id}/`;
  console.log("update", updateServiceCont_api);
  return await api.patch(updateServiceCont_api, serviceCont);
};

export const deleteServiceContent = async (id: string) => {
  const deleteServiceCon_api = `${
    import.meta.env.VITE_API_URL
  }${deleteServiceContUrl}${id}/`;
  console.log(deleteServiceCon_api, await api.delete(deleteServiceCon_api));
  await api.delete(deleteServiceCon_api);
  return id;
};

// Initial state
const initialState: ServiceState = {
  isLoading: true,
  serviceCont: [] as ServiceOutput[],
};

export const createServiceAction = createAsyncThunk(
  "createServiceAction",
  async (data: any) => {
    console.log("on asy thunk", data);

    const response = await createServiceContent(data);
    return response.data;
  }
);
// export const fetchPatientThunk = createAsyncThunk(
export const fetchServiceThunk = createAsyncThunk(
  "service/fetchServices",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}${viewServiceContUrl}`
    );
    console.log("on feach asynch", response.data);
    return response.data;
  }
);
export const updateServiceAction = createAsyncThunk(
  "service/updateServices",
  async (data: any) => {
    console.log("up", data);

    const response = await updateServiceContent(data);
    return response.data;
  }
);

export const deleteServiceAction = createAsyncThunk(
  "service/deleteServices",
  async (id: string) => {
    const response = await deleteServiceContent(id);
    console.log("on asynch", id);
    return id;
  }
);
// Slice

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createServiceAction.fulfilled, (state, action) => {
        state.serviceCont.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createServiceAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createServiceAction.rejected, (state, action) => {
        state.isLoading = true;
      })

      .addCase(fetchServiceThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchServiceThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.serviceCont = action.payload;
      })
      .addCase(fetchServiceThunk.rejected, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateServiceAction.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        // Update item in the state
        const index = state.serviceCont.findIndex(
          (serviceCont: any) => serviceCont.id === action.payload.id
        );
        if (index !== -1) {
          state.serviceCont[index] = action.payload;
        }
      })
      .addCase(updateServiceAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateServiceAction.rejected, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteServiceAction.fulfilled, (state, action) => {
        state.isLoading = false;
        // Delete item in the state
        state.serviceCont = state.serviceCont.filter(
          (serviceCon) => serviceCon.id !== action.payload
        );
        console.log("filtered", action.payload);
      })
      .addCase(deleteServiceAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteServiceAction.rejected, (state, action) => {
        state.isLoading = true;
      });
  },
});

export default serviceSlice.reducer;
export const imageData = (state: RootState) => state.serviceContentData;
