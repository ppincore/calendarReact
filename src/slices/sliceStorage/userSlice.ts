import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { type TUser, type TLoginData } from "../../types";

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
    name: "",
  },
  error: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    initUser(state) {
      state.isInit = true;
    },
    authUser(state, action: PayloadAction<TUser>) {
      state.isAuth = true;
      state.userInfo = action.payload;
    },
  },
  selectors: {
    selectUserInfo: (state) => state.userInfo,
    selectIsAuth: (state) => state.isAuth,
    selectIsInit: (state) => state.isInit,
    selectUserLoading: (state) => state.isLoading,
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
        state.userInfo = {name: action.payload.name, email: action.payload.email};
        state.isAuth = true;
      });
  },
});

export const fetchUser = createAsyncThunk('user/login', 
  async () => {
    const user:TUser = {email:'admin@example.ru', name:'Admin'}
    await new Promise( (resolve) => setTimeout(resolve,1000));
    return user
  }
)

export const fetchLogout = createAsyncThunk("user/logout", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true };
});

export const { initUser, authUser } = userSlice.actions;
export const { selectIsAuth, selectUserInfo, selectIsInit, selectUserLoading } = userSlice.selectors;
export const userSliceInitialState = initialState;
export default userSlice.reducer;
