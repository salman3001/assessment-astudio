import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@src/types/modals";

export type UsersState = User[] | null;

const initialState: UsersState = null;

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state: UsersState, action: PayloadAction<User[]>) => {
      state = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
