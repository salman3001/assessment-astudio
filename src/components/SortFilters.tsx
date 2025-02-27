import CheveronDownIcon from "@src/assets/svg/chevron-down.svg?react";
import CheveronUpIcon from "@src/assets/svg/chevron-up.svg?react";
import { useState } from "react";

export type Filter = { title: string; value: string };

interface SortFiltersProps {
  filters: Filter[];
  onSelection: (filter: Filter, order: "asc" | "desc") => void;
}

export default function SortFilters(props: SortFiltersProps) {
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);

  const handelSelection = (filter: Filter, order: "asc" | "desc") => {
    setSelectedFilter(filter);
    props.onSelection(filter, order);
  };

  return (
    <ul className="flex gap-2 flex-wrap text-nowrap">
      {props.filters.map((filter, i) => (
        <SortFilter
          filter={filter}
          selected={selectedFilter?.value === filter.value}
          onSelection={handelSelection}
          key={i}
        />
      ))}
    </ul>
  );
}

interface SortFilterProps {
  filter: Filter;
  selected: boolean;
  onSelection: (filter: Filter, order: "asc" | "desc") => void;
}

const SortFilter = (props: SortFilterProps) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handelClick = () => {
    if (props.selected) {
      setOrder(order === "asc" ? "desc" : "asc");
      props.onSelection(props.filter, order === "asc" ? "desc" : "asc");
    } else {
      props.onSelection(props.filter, order);
    }
  };
  return (
    <li
      className={`flex justify-center items-center gap-1 cursor-pointer capitalize`}
      onClick={handelClick}
    >
      {props.filter.title}
      {order === "asc" ? (
        <CheveronDownIcon className="size-4" />
      ) : (
        <CheveronUpIcon className="size-4" />
      )}
    </li>
  );
};
