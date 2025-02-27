import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@src/types/modals";
import { RootState } from "../store";

export type UsersState = {
  data?: {
    users: User[];
    skip: number;
    limit: number;
    total: number;
  };
  filters: {
    skip: number;
    limit: number;
    search: string;
    sortBy?: string;
    order?: "asc" | "desc";
  };
  loading: boolean;
  error?: string;
};

const initialState: UsersState = {
  loading: false,
  filters: {
    skip: 0,
    limit: 5,
    search: "",
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (
      state: UsersState,
      action: PayloadAction<UsersState["data"]>,
    ) => {
      state.data = action.payload;
    },
    setUsersFilters: (
      state: UsersState,
      action: PayloadAction<UsersState["filters"]>,
    ) => {
      state.filters = action.payload;
    },
    setUsersLoading: (state: UsersState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUsersError: (
      state: UsersState,
      action: PayloadAction<string | undefined>,
    ) => {
      state.error = action.payload;
    },
    setUsersSearch: (state: UsersState, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
  },
});

export const { setUsers, setUsersLoading, setUsersError, setUsersFilters } =
  usersSlice.actions;

export default usersSlice.reducer;

export const selectUserTableRows = createSelector(
  [
    (state: RootState) => state.users.data,
    (state: RootState) => state.users.filters,
  ],
  (usersData, filters) => {
    const headers = [
      "First Name",
      "Last Name",
      "Maiden Name",
      "Birth Date",
      "Age",
      "Gender",
      "email",
      "Username",
      "Bloodgroup",
      "Eye color",
    ];

    const rows =
      usersData?.users.map((user) => [
        user.firstName,
        user.lastName,
        user.maidenName,
        user.birthDate,
        user.age,
        user.gender,
        user.email,
        user.username,
        user.bloodGroup,
        user.eyeColor,
      ]) || [];

    const lowerSearchTerm = filters.search.toLowerCase();
    if (!lowerSearchTerm || lowerSearchTerm === "") {
      return { headers, rows };
    } else {
      const filteredRows = rows.filter((row) =>
        row.some((val: string | number) =>
          String(val).toLowerCase().includes(lowerSearchTerm),
        ),
      );

      return {
        headers,
        rows: filteredRows,
      };
    }
  },
);
