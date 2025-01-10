import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginState, User } from "../types/contentType";
import { loginUrl } from "../api/endPoint";
import {Credentials} from "../types/contentType"


// import { api } from "../../configuration/AxiosConfig";

const initialState: LoginState = {
    currentUser: JSON.parse(localStorage.getItem('userInfo') || 'null'),
    loading: false,
    error: null
};

export const login = createAsyncThunk<User, Credentials>(
    'auth/login',
    async (credentials: Credentials, thunkAPI) => {
        try {
            const api_url = `${import.meta.env.VITE_API_URL}${loginUrl}`;
            // return await api.post(endPoint.login, data);
          const response = await axios.post(api_url, credentials);
          console.log(response.data);
          return response.data;
        } catch (error: any) {
            console.log(error.response.data.errors);            
          return thunkAPI.rejectWithValue(error.response?.data?.errors || 'Login failed');
        }
      }
);


const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        logout(state) {
            state.currentUser = null;
            localStorage.removeItem('userInfo');
          },
        setUser: (state, action) => {
            const { id, name, isAdmin } = action.payload.profile;
            const token = action.payload.accessToken;
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify({
                token: token,
                role: isAdmin,
                name: name,
                id: id,
                // token: action.payload.token,
            })
            );
            state.currentUser!.name = action.payload.name;
            state.currentUser!.token = action.payload.token;
            state.currentUser!.role = action.payload.role;
            state.currentUser!.id = action.payload.id;

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, state => {
                state.currentUser = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                state.error = null;
                localStorage.setItem('userInfo', JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.currentUser = null;
                state.loading = false;
                if (action.payload) {
                    state.error = action.payload as string;
                } else {
                    state.error = 'Failed user to login';
                }
            });
    }
});

export const { setUser, logout } = loginSlice.actions
export default loginSlice.reducer