import { apiRoutes } from "@src/libs/apiRoutes";
import createQs from "@src/libs/createQs";
import {
  setProducts,
  setProductsError,
  setProductsLoading,
} from "@src/store/slices/productsSlice";
import { RootState } from "@src/store/store";
import { PaginatedRes } from "@src/types";
import { Product } from "@src/types/modals";
import getAxiosErrorMessage from "@src/utils/getAxiosErrorMessage";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useFetchProducts() {
  const dispatch = useDispatch();
  const limit = useSelector((state: RootState) => state.products.filters.limit);
  const skip = useSelector((state: RootState) => state.products.filters.skip);
  const order = useSelector((state: RootState) => state.products.filters.order);
  const sortBy = useSelector(
    (state: RootState) => state.products.filters.sortBy
  );

  const fetchProducts = useCallback(async () => {
    dispatch(setProductsLoading(true));
    try {
      const res = await axios.get<PaginatedRes<{ products: Product[] }>>(
        apiRoutes.products() +
          `?${createQs({
            limit,
            skip,
            order: order || "",
            sortBy: sortBy || "",
          })}`
      );

      dispatch(setProducts(res.data));
    } catch (error) {
      dispatch(setProductsError(getAxiosErrorMessage(error)));
    }
    dispatch(setProductsLoading(false));
  }, [limit, skip, order, sortBy, dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
}
