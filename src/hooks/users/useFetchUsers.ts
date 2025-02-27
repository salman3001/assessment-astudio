import { apiRoutes } from "@src/libs/apiRoutes";
import createQs from "@src/libs/createQs";
import {
  setUsers,
  setUsersError,
  setUsersLoading,
} from "@src/store/slices/usersSlice";
import { RootState } from "@src/store/store";
import { PaginatedRes } from "@src/types";
import { User } from "@src/types/modals";
import getAxiosErrorMessage from "@src/utils/getAxiosErrorMessage";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useFetchUsers() {
  const dispatch = useDispatch();
  const limit = useSelector((state: RootState) => state.users.filters.limit);
  const skip = useSelector((state: RootState) => state.users.filters.skip);
  const order = useSelector((state: RootState) => state.users.filters.order);
  const sortBy = useSelector((state: RootState) => state.users.filters.sortBy);

  const fetchUsers = useCallback(async () => {
    dispatch(setUsersLoading(true));
    try {
      const res = await axios.get<PaginatedRes<{ users: User[] }>>(
        apiRoutes.users() +
          `?${createQs({
            limit,
            skip,
            order: order || "",
            sortBy: sortBy || "",
          })}`,
      );

      dispatch(setUsers(res.data));
    } catch (error) {
      dispatch(setUsersError(getAxiosErrorMessage(error)));
    }
    dispatch(setUsersLoading(false));
  }, [limit, skip, order, sortBy, dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
}
