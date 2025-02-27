import { useState } from "react";
import AppSelect from "./form/AppSelect";
import SearchInput from "./form/SearchInput";
import { useDebouncedCallback } from "use-debounce";
import SortFilters from "./SortFilters";
import DataTable from "./DataTable";
import Pagination from "./Pagination";

interface AdvanceDataTableProps {
  limit: number;
  limitOptions: string[];
  onLimitChange: (newLimit: number) => void;
  skip: number;
  onSkipChange: (newSkip: number) => void;
  filters: string[];
  onFilterSelection: (filter: string, order: "asc" | "desc") => void;
  onSearch: (val: string) => void;
  loading: boolean;
  headers: string[];
  rows: (string | number)[][];
  total: number;
}

/**
 * It uses the datatable component and adds aditional funtionalities
 * likes, filters, search and pagination
 * @param props
 * @returns
 */
export default function AdvanceDataTable(props: AdvanceDataTableProps) {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebouncedCallback((value) => {
    props.onSearch(value);
  }, 800);

  return (
    <div className="w-full space-y-12 py-4">
      <div className="flex gap-4">
        <AppSelect
          options={props.limitOptions}
          value={props.limit}
          onChange={(e) => {
            props.onLimitChange(Number(e.target.value));
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
        <div className="h-7 border-2"></div>
        <SortFilters
          values={props.filters}
          onSelection={props.onFilterSelection}
        />
      </div>
      <div>
        {props.loading && <div>Loading...</div>}
        <DataTable headers={props.headers} rows={props.rows} />
      </div>
      <div className="flex justify-center items-center">
        <Pagination
          skip={props.skip}
          limit={props.limit}
          totalItems={props.total}
          siblingCount={1}
          onPageChange={props.onSkipChange}
        />
      </div>
    </div>
  );
}
