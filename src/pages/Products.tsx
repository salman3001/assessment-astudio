import useFetchProducts from "@src/hooks/products/useFetchProducts";
import {
  selectProductTableRows,
  setProductsFilters,
} from "@src/store/slices/productsSlice";
import { RootState } from "@src/store/store";
import { useDispatch, useSelector } from "react-redux";
import AdvanceDataTable from "@src/components/AdvanceDataTable";
import { Filter } from "@src/components/SortFilters";

export default function Products() {
  const { rows, headers } = useSelector(selectProductTableRows);
  const total = useSelector((state: RootState) => state.products.data?.total);
  const loading = useSelector((state: RootState) => state.products.loading);
  const limit = useSelector((state: RootState) => state.products.filters.limit);
  const skip = useSelector((state: RootState) => state.products.filters.skip);

  const dispatch = useDispatch();
  useFetchProducts();

  const onLimitChange = (val: number) => {
    dispatch(
      setProductsFilters({
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
      setProductsFilters({
        skip: 0,
        search: "",
        limit: limit,
        sortBy: filter.value,
        order: order,
      }),
    );
  };

  const onSearch = (val: string) => {
    dispatch(
      setProductsFilters({
        limit: limit,
        skip: 0,
        search: val,
        sortBy: undefined,
        order: undefined,
      }),
    );
  };

  const onSkipChange = (newSkip: number) => {
    dispatch(
      setProductsFilters({
        skip: newSkip,
        search: "",
        limit: limit,
        sortBy: undefined,
        order: undefined,
      }),
    );
  };

  const sortFilters: Filter[] = [
    { title: "Title", value: "title" },
    { title: "Brand", value: "brand" },
    { title: "Category", value: "category" },
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
