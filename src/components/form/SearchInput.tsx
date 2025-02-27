import { useState } from "react";
import SearchIcon from "@src/assets/svg/search.svg?react";

interface SearchInputProps {
  value: string | number;
  onChange: (val: string) => void;
}

export default function SearchInput(props: SearchInputProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex justify-center items-center gap-2">
      {expanded && (
        <input
          autoFocus
          className="border border-gray-400 rounded-sm"
          onBlur={() => setExpanded(false)}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )}
      <div>
        <SearchIcon
          className="size-5 text-gray-400 cursor-pointer"
          onClick={() => setExpanded(true)}
          onBlur={() => setExpanded(false)}
        />
      </div>
    </div>
  );
}
