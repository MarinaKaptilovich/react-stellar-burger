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

export const getUser = () => {
    return (dispatch) => {
        return requestGetUserWithRefresh()
            .then((res) => {
                dispatch(setLoaderActive(true))
                return res;
            })
            .then((res) => {
                dispatch(setUser(res.user));
            });
    };
};

export const changeUser = createAsyncThunk(
    "user/change",
    async (data) => {
        const res = await requestChangeUserWithRefresh(data);
        return res.user;
    }
);

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(setUser(null));
                })
                .finally(() => {
                    dispatch(setAuthChecked(true));
                    dispatch(setLoaderActive(false))
                });
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};

export const login = createAsyncThunk(
    "user/login",
    async (data) => {
        const res = await requestLogin(data);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        await requestLogout();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
);

export const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLoaderActive: (state, action) => {
            state.loaderActive = action.payload
        }
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
                state.isError =  true
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
