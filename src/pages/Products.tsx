export default function Products() {
  return (
    <div className="w-full">
      <div>filters</div>
      <table className="table table-auto border-2 border-secondary w-full">
        <thead className="bg-primary">
          <tr>
            <th className="border-2 border-secondary">Song</th>
            <th className="border-2 border-secondary">Artist</th>
            <th className="border-2 border-secondary">Year</th>
          </tr>
        </thead>
        <tbody className="text-center border ">
          <tr className="hover:bg-secondary">
            <td className="border-2 border-secondary">
              The Sliding Mr. Bones (Next Stop, Pottersville)
            </td>
            <td className="border-2 border-secondary">Malcolm Lockyer</td>
            <td className="border-2 border-secondary">1961</td>
          </tr>
          <tr className="hover:bg-secondary">
            <td className="border-2 border-secondary">Witchy Woman</td>
            <td className="border-2 border-secondary">The Eagles</td>
            <td className="border-2 border-secondary">1972</td>
          </tr>
          <tr className="hover:bg-secondary">
            <td className="border-2 border-secondary">Shining Star</td>
            <td className="border-2 border-secondary">Earth, Wind, and Fire</td>
            <td className="border-2 border-secondary">1975</td>
          </tr>
        </tbody>
      </table>
      <div></div>
    </div>
  );
}
