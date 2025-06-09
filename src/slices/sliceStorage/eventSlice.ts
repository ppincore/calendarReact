import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { type TUser, type TEvent } from "../../types";
import { getUsers } from "../../utils/fakeAPI";

export type TEventInitialState = {
  guests: TUser[];
  events: TEvent[];
  isLoading: boolean;
  error: string;
};

const initialState: TEventInitialState = {
  guests: [],
  events: [],
  isLoading: false,
  error: "",
};

const eventSlice = createSlice({
  name: "eventSlice",
  initialState,
  reducers: {
    setGuests(state, action: PayloadAction<TUser[]>) {
      state.guests = action.payload;
    },
    setEvents(state, action: PayloadAction<TEvent[]>) {
      state.events = action.payload;
    },
  },
  selectors: {
    selectGuests: (state) => state.guests,
    selectEvents: (state) => state.events,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGuests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guests = action.payload;
        console.log(state.guests)
      });
  },
});

export const fetchGuests = createAsyncThunk("guests/get", async () => {
  try {
    const res = getUsers();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(res)
    return res;
  } catch {
    return [];
  }
});

export const { setGuests, setEvents } = eventSlice.actions;
export const { selectGuests, selectEvents } = eventSlice.selectors;
export default eventSlice.reducer;
