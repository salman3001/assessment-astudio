export interface DataTableProps {
  headers: string[];
  rows: (string | number)[][];
}

export default function DataTable(props: DataTableProps) {
  return (
    <div className="overflow-x-scroll">
      <table className="table table-auto border-2 border-secondary w-full min-w-max">
        <thead className="bg-primary uppercase">
          <tr>
            {props.headers.map((header, i) => (
              <th className="border-2 border-secondary font-bold p-3" key={i}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center border ">
          {props.rows.map((data, i) => (
            <tr className="hover:bg-secondary" key={i}>
              {data.map((val, i) => (
                <td className="border-2 border-secondary py-1 px-1" key={i}>
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
