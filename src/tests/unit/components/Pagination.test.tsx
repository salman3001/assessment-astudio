import Pagination from "@src/components/Pagination";
import { render, screen } from "@testing-library/react";
import { describe } from "node:test";
import { expect, test } from "vitest";

describe("components Pagination", () => {
  test("should render buttons", () => {
    render(
      <Pagination
        limit={2}
        siblingCount={1}
        onPageChange={() => {}}
        skip={0}
        totalItems={20}
      />,
    );

    const buttons = screen.getAllByRole("button");

    expect(buttons.length).toBeGreaterThan(2);
  });
});
