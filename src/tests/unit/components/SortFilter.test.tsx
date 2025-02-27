import SortFilters, { Filter } from "@src/components/SortFilters";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

const filters: Filter[] = [
  { title: "Title", value: "title" },
  { title: "Brand", value: "brand" },
  { title: "Category", value: "category" },
];

describe("component SortFilter", () => {
  test("should render filters", () => {
    render(<SortFilters filters={filters} onSelection={() => {}} />);

    const filterList = screen.getAllByRole("listitem");
    expect(filterList.length).toBe(3);
    expect(filterList[0].textContent).toBe("Title");
  });

  test("should call onSelection handler with proper args", () => {
    const onSelectionHanlder = vi.fn();
    render(<SortFilters filters={filters} onSelection={onSelectionHanlder} />);

    const filterList = screen.getAllByRole("listitem");
    expect(filterList[0]).toBeInTheDocument();
    fireEvent.click(filterList[0]);
    expect(onSelectionHanlder).toHaveBeenCalled();
    expect(onSelectionHanlder).toHaveBeenCalledWith(
      { title: "Title", value: "title" },
      "asc",
    );
    fireEvent.click(filterList[0]);
    expect(onSelectionHanlder).toHaveBeenCalledWith(
      { title: "Title", value: "title" },
      "desc",
    );
  });
});
