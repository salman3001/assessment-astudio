export interface DataTableProps {
  headers: string[];
  rows: (string | number)[][];
}

export default function DataTable(props: DataTableProps) {
  return (
    <table className="table table-auto border-2 border-secondary w-full">
      <thead className="bg-primary">
        <tr>
          {props.headers.map((header, i) => (
            <th className="border-2 border-secondary" key={i}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-center border ">
        {props.rows.map((data, i) => (
          <tr className="hover:bg-secondary" key={i}>
            {data.map((val, i) => (
              <td className="border-2 border-secondary" key={i}>
                {val}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
