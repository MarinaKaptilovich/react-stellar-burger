import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
    requestLogin,
    requestLogout,
    requestGetUserWithRefresh,
    requestChangeUserWithRefresh
} from "../utils/api";

const initialState = {
    user: null,
    isAuthChecked: false,
    isError: false,
    loaderActive: false
};

const getIngredientsId = (array) => {
    return array.filter(item => item).map(item => item._id);
};

// Утилита для упрощения создания редукторов
const createSimpleReducer = (stateField) => (state, action) => {
    state[stateField] = action.payload;
};

// Утилита для упрощения создания асинхронных экшенов
const createAsyncThunkWithLoader = (name, asyncThunk) => {
    return createAsyncThunk(`user/${name}`, async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoaderActive(true));
            const result = await asyncThunk(data, thunkAPI);
            thunkAPI.dispatch(setLoaderActive(false));
            return result;
        } catch (error) {
            thunkAPI.dispatch(setLoaderActive(false));
            throw error;
        }
    });
};

export const getUser = createAsyncThunkWithLoader('getUser', async (ingredients, thunkAPI) => {
    const ingredientsId = getIngredientsId(ingredients);
    const orderData = await requestGetUserWithRefresh(ingredientsId);
    return orderData;
});

export const changeUser = createAsyncThunkWithLoader('changeUser', async (data) => {
    const res = await requestChangeUserWithRefresh(data);
    return res.user;
});

export const checkUserAuth = createAsyncThunkWithLoader('checkUserAuth', async (_, thunkAPI) => {
    if (localStorage.getItem("accessToken")) {
        await thunkAPI.dispatch(getUser())
            .catch(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                thunkAPI.dispatch(setUser(null));
            });
    }

    thunkAPI.dispatch(setAuthChecked(true));
});

export const login = createAsyncThunkWithLoader('login', async (data) => {
    const res = await requestLogin(data);
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    return res.user;
});

export const logout = createAsyncThunkWithLoader('logout', async (_, thunkAPI) => {
    await requestLogout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
});

export const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setAuthChecked: createSimpleReducer('isAuthChecked'),
        setUser: createSimpleReducer('user'),
        setLoaderActive: createSimpleReducer('loaderActive')
    },
      extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuthChecked = true
                state.loaderActive = false
            })
            .addCase(login.pending, (state) => {
                state.loaderActive = true
            })
            .addCase(login.rejected, (state) => {
                state.isError = true
                state.loaderActive = false
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.isAuthChecked = false
                state.loaderActive = false
            })
            .addCase(logout.pending, (state) => {
                state.loaderActive = true
            })
            .addCase(logout.rejected, (state) => {
                state.isError = true
                state.loaderActive = false
            })
            .addCase(changeUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loaderActive = false
            })
            .addCase(changeUser.pending, (state) => {
                state.loaderActive = true
            })
            .addCase(changeUser.rejected, (state) => {
                state.isError = true
                state.loaderActive = false
            })
      }
});

export const {
    setUser,
    setAuthChecked,
    setLoaderActive
} = userSlice.actions;
export const userReducer = userSlice.reducer;
