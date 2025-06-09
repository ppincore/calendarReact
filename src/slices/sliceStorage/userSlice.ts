import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { type TUser, type TLoginData } from "../../types";
import { loginUserApi } from "../../utils/fakeAPI";

export type TUserInitialState = {
  isLoading: boolean;
  isInit: boolean;
  isAuth: boolean;
  userInfo: TUser;
  error: string;
};

const initialState: TUserInitialState = {
  isLoading: false,
  isInit: false,
  isAuth: false,
  userInfo: {
    email: "",
    username: "",
  },
  error: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
  },
  selectors: {
    selectUserInfo: (state) => state.userInfo,
    selectIsAuth: (state) => state.isAuth,
    selectIsInit: (state) => state.isInit,
    selectUserLoading: (state) => state.isLoading,
    selectUserError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.userInfo = { name: "", email: "" };
        state.isAuth = false;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.userInfo = {
            username: action.payload.username,
            email: action.payload.email,
          };
          state.isAuth = true;
        } else {
          state.userInfo = {
            username: "",
            email: "",
          };
          state.error = "Неверный логин или пароль";
          state.isAuth = false;
        }
      });
  },
});

export const fetchUser = createAsyncThunk(
  "user/login",
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const res = loginUserApi(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("userName", res.username);
      localStorage.setItem("password", res.password);
      localStorage.setItem("auth", "true");
      return res;
    } catch {
      rejectWithValue("Некорректные данные для входа.");
    }
  }
);

export const fetchLogout = createAsyncThunk("user/logout", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  localStorage.removeItem("userName");
  localStorage.removeItem("password");
  localStorage.removeItem("auth");
  return { success: true };
});

export const { clearError } = userSlice.actions;
export const {
  selectIsAuth,
  selectUserInfo,
  selectIsInit,
  selectUserLoading,
  selectUserError,
} = userSlice.selectors;
export default userSlice.reducer;
