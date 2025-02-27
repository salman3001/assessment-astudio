import { RootState } from "@src/store/store";
import { useDispatch, useSelector } from "react-redux";
import AdvanceDataTable from "@src/components/AdvanceDataTable";
import {
  selectUserTableRows,
  setUsersFilters,
  setUsersSearch,
} from "@src/store/slices/usersSlice";
import useFetchUsers from "@src/hooks/users/useFetchUsers";
import { Filter } from "@src/components/SortFilters";

export default function Users() {
  const { rows, headers } = useSelector(selectUserTableRows);
  const total = useSelector((state: RootState) => state.users.data?.total);
  const loading = useSelector((state: RootState) => state.users.loading);
  const limit = useSelector((state: RootState) => state.users.filters.limit);
  const skip = useSelector((state: RootState) => state.users.filters.skip);

  const dispatch = useDispatch();
  useFetchUsers();

  const onLimitChange = (val: number) => {
    dispatch(
      setUsersFilters({
        skip: 0,
        search: "",
        limit: val,
        sortBy: undefined,
        order: undefined,
      }),
    );
  };

  const onSortFilterSelection = (filter: Filter, order: "asc" | "desc") => {
    dispatch(
      setUsersFilters({
        skip: 0,
        search: "",
        limit: limit,
        sortBy: filter.value,
        order: order,
      }),
    );
  };

  const onSearch = (val: string) => {
    dispatch(setUsersSearch(val));
  };

  const onSkipChange = (newSkip: number) => {
    dispatch(
      setUsersFilters({
        skip: newSkip,
        search: "",
        limit: limit,
        sortBy: undefined,
        order: undefined,
      }),
    );
  };

  const sortFilters: Filter[] = [
    { title: "First Name", value: "firstName" },
    { title: "Email", value: "email" },
    { title: "Birth Date", value: "birthDate" },
    { title: "Gender", value: "gender" },
  ];

  return (
    <AdvanceDataTable
      sortFilters={sortFilters}
      limitOptions={["5", "10", "20", "50"]}
      limit={limit}
      skip={skip}
      total={total || 0}
      headers={headers}
      rows={rows}
      loading={loading}
      onLimitChange={onLimitChange}
      onSortFilterSelection={onSortFilterSelection}
      onSearch={onSearch}
      onSkipChange={onSkipChange}
    />
  );
}
