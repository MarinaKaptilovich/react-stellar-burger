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
    isError: false
};

export const getUser = () => {
    return (dispatch) => {
        return requestGetUserWithRefresh()
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
        }
    },
      extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                return {
                    ...state,
                    user: action.payload,
                    isAuthChecked: true
                }
            })
            .addCase(login.rejected, (state) => {
                return {
                    ...state,
                    isError: true
                }
            })
            .addCase(logout.fulfilled, (state) => {
                return {
                    ...state,
                    user: null,
                    isAuthChecked: false
                }
            })
            .addCase(logout.rejected, (state) => {
                return {
                    ...state,
                    isError: true
                }
            })
            .addCase(changeUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    user: action.payload
                }
            })
            .addCase(changeUser.rejected, (state) => {
                return {
                    ...state,
                    isError: true
                }
            })
      }
});

export const {
    setUser,
    setAuthChecked
} = userSlice.actions;
export const userReducer = userSlice.reducer;
