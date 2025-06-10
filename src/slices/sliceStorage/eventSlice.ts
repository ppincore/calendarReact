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
      })
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload!;
        console.log(action, state);
      })
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload!;
        console.log(action, state);
      });
  },
});

export const fetchGuests = createAsyncThunk("guests/get", async () => {
  try {
    const res = getUsers();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return res;
  } catch {
    return [];
  }
});

export const createEvent = createAsyncThunk(
  "event/create",
  async (event: TEvent) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as TEvent[];
      json.push(event);
      localStorage.setItem("events", JSON.stringify(json));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return json;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchEvents = createAsyncThunk(
  "event/get",
  async (username:string) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as TEvent[];
      const currentUserEvents = json.filter(
        (ev) => ev.author !== username || ev.guest !== username
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return currentUserEvents;
    } catch (e) {
      console.log(e);
    }
  }
);

export const { setGuests, setEvents } = eventSlice.actions;
export const { selectGuests, selectEvents } = eventSlice.selectors;
export default eventSlice.reducer;
