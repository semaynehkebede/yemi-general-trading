import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ContactInput, ContactOutput, ContactState } from "../types/contentType";
import {createContactUrl, deleteContactUrl, updateContactUrl, viewContactUrl } from "../api/endPoint";
import { RootState } from "../app/store";
import api from "../configuration/axios";

// Async thunk for saving content data
export const createContact = async (contact: ContactInput) => {
  console.log("on function", contact);
  const api_url = `${import.meta.env.VITE_API_URL}${createContactUrl}`;
  console.log(api_url);
  const response = await api.post(api_url, contact);
  return response
};

export const updateContact = async (contact: any) => {
  console.log('uytgyhghj', contact);
  const id = contact.get("id"); // Get single field
  const updateContact_api = `${
    import.meta.env.VITE_API_URL
  }${updateContactUrl}${id}/`;
  console.log("update", updateContact_api, id);
  const response = await api.patch(updateContact_api, contact);
  return response;
};

export const deleteContact = async (id: string) => {
  const deleteContact_api = `${
    import.meta.env.VITE_API_URL
  }${deleteContactUrl}${id}/`;
  console.log(deleteContact_api, await axios.delete(deleteContact_api));
  await axios.delete(deleteContact_api);
  return id;
};

// Initial state
const initialState: ContactState = {
  isLoading: true,
  contact: {} as ContactOutput
};

export const createContactAction = createAsyncThunk(
  "contact/createContacts",
  async (data: any) => {
    console.log("on asy thunk", data);

    const response = await createContact(data);
    return response.data;
  }
);
// export const fetchPatientThunk = createAsyncThunk(
export const fetchContactThunk = createAsyncThunk(
  "contact/fetchcontacts",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}${viewContactUrl}`
    );
    console.log("on feach asynch", response.data);
    return response.data;
  }
);
export const updateContactAction = createAsyncThunk(
  "contact/updateContacts",
  async (data: any) => {
    console.log("up", data);

    const response = await updateContact(data);
    return response.data;
  }
);

export const deleteContactAction = createAsyncThunk(
  "contact/deleteContacts",
  async (id: string) => {
    await deleteContact(id);
    console.log("on asynch", id);
    return id;
  }
);
// Slice

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContactAction.fulfilled, (state, action) => {
        state.contact = action.payload;
        // state.contact.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createContactAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContactAction.rejected, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchContactThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contact = action.payload;
      })
      .addCase(fetchContactThunk.rejected, (state) => {
        state.isLoading = true;
      })

      .addCase(updateContactAction.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        // Update item in the state
        const index = state.contact.findIndex(
          (contact: any) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.contact[index] = action.payload;
        }
      })
      .addCase(updateContactAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContactAction.rejected, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteContactAction.fulfilled, (state, action) => {
        state.isLoading = false;
        // Delete item in the state
        // state.contact = state.contact.filter(
        //   (contact) => contact.id !== action.payload
        // );
        console.log("filtered", action.payload);
      })
      .addCase(deleteContactAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContactAction.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export default contactSlice.reducer;
export const imageData = (state: RootState) => state.contactData;
