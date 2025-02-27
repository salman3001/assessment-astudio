import { ChangeEventHandler } from "react";

interface AppSelectProps {
  options: (number | string)[];
  value: string | number;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export default function AppSelect(props: AppSelectProps) {
  return (
    <select value={props.value} onChange={props.onChange} className="bg-white">
      {props.options.map((opt, i) => (
        <option value={opt} key={i}>
          {opt}
        </option>
      ))}
    </select>
  );
}
