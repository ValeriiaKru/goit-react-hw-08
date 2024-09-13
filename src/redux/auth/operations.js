import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
baseURL: 'https://connections-api.goit.global/',
});

const setAuthHeders = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const apiRegister = createAsyncThunk(
    'auth/register',
    async (formData, thunkAPI) => {
        try {
            const { data } = await instance.post('users/signup', formData);
            setAuthHeders(data.token);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

export const apiLogin = createAsyncThunk(
    'auth/login',
    async (formData, thunkAPI) => {
        try {
            const { data } = await instance.post('users/login', formData);
            setAuthHeders(data.token);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

export const apiLogout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await instance.post('/users/logout');
            return;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

export const apiRefreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.token;
            setAuthHeders(token);
            const { data } = await instance.get('users/current');
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    },
    {
        condition: (_, thunkApi) => {
            const state = thunkApi.getState();
            const token = state.auth.token;
            if (token) return true;
            return false;
    }
}
);