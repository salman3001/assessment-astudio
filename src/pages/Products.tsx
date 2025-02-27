import DataTable from "@src/components/DataTable";
import AppSelect from "@src/components/form/AppSelect";
import SearchInput from "@src/components/form/SearchInput";
import Pagination from "@src/components/Pagination";
import { useAxios } from "@src/hooks/useAxios";
import { apiRoutes } from "@src/libs/apiRoutes";
import createQs from "@src/libs/createQs";
import { searchProducts, setProducts } from "@src/store/slices/productsSlice";
import { RootState } from "@src/store/store";
import { PaginatedRes } from "@src/types";
import { Product } from "@src/types/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

export default function Products() {
  const { exec, loading } = useAxios();

  const defaultFilters = {
    skip: 0,
    limit: 5,
    sortBy: "",
    order: "",
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebouncedCallback((value) => {
    dispatch(searchProducts(value));
  }, 500);

  const productData = useSelector((state: RootState) => state.products.data);

  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const data = await exec<PaginatedRes<{ products: Product[] }>>({
      url: apiRoutes.products() + `?${createQs(filters)}`,
    });

    if (data) {
      dispatch(setProducts(data));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <div className="w-full">
      <div className="flex gap-4 py-4">
        <AppSelect
          options={["5", "10", "25", "50"]}
          value={filters.limit}
          onChange={(e) => {
            setFilters({ ...defaultFilters, limit: Number(e.target.value) });
          }}
        />
        <div className="h-7 border-2"></div>
        <SearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            debouncedSearch(val);
          }}
        />
      </div>
      <div>
        {loading && <div>Loading...</div>}
        {productData && (
          <DataTable
            headers={[
              "sku",
              "Title",
              "Category",
              "Price",
              "rating",
              "stock",
              "brand",
            ]}
            rows={productData.products.map((product) => [
              product.sku,
              product.title,
              product.category,
              product.price,
              product.rating,
              product.stock,
              product.brand,
            ])}
          />
        )}
      </div>
      <br />
      <br />
      <div className="flex justify-center items-center">
        {productData && (
          <Pagination
            skip={productData.skip}
            limit={filters.limit}
            totalItems={productData.total}
            siblingCount={1}
            onPageChange={(newSkip) => {
              setFilters({
                ...defaultFilters,
                limit: filters.limit,
                skip: newSkip,
              });
            }}
          />
        )}
      </div>
    </div>
  );
}
