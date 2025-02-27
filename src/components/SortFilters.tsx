import CheveronDownIcon from "@src/assets/svg/chevron-down.svg?react";
import CheveronUpIcon from "@src/assets/svg/chevron-up.svg?react";
import { useState } from "react";

interface SortFiltersProps {
  values: string[];
  onSelection: (name: string, order: "asc" | "desc") => void;
}

export default function SortFilters(props: SortFiltersProps) {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handelSelection = (name: string, order: "asc" | "desc") => {
    setSelectedFilter(name);
    props.onSelection(name, order);
  };

  return (
    <div className="flex gap-2">
      {props.values.map((filter, i) => (
        <SortFilter
          name={filter}
          selected={selectedFilter === filter}
          onSelection={handelSelection}
          key={i}
        />
      ))}
    </div>
  );
}

interface SortFilterProps {
  name: string;
  selected: boolean;
  onSelection: (name: string, order: "asc" | "desc") => void;
}

const SortFilter = (props: SortFilterProps) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handelClick = () => {
    if (props.selected) {
      setOrder(order === "asc" ? "desc" : "asc");
      props.onSelection(props.name, order === "asc" ? "desc" : "asc");
    } else {
      props.onSelection(props.name, order);
    }
  };
  return (
    <div
      className="flex justify-center items-center gap-1 cursor-pointer capitalize"
      onClick={handelClick}
    >
      {props.name}{" "}
      {order === "asc" ? (
        <CheveronDownIcon className="size-4" />
      ) : (
        <CheveronUpIcon className="size-4" />
      )}
    </div>
  );
};
