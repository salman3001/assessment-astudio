import ArrowLeft from "@src/assets/svg/arrow-narrow-left.svg?react";
import ArrowRight from "@src/assets/svg/arrow-narrow-right.svg?react";

export interface PaginationProps {
  totalItems: number;
  skip: number;
  limit: number;
  onPageChange: (skip: number) => void;
  siblingCount: number;
}

export default function Pagination(props: PaginationProps) {
  const { totalItems, skip, limit, onPageChange, siblingCount = 5 } = props;

  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(totalItems / limit);

  const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const generatePageNumbers = (): (number | "...")[] => {
    const totalPageCount = Math.ceil(totalItems / limit);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, "...", totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );
      return [firstPageIndex, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }

    return [];
  };

  const handleClick = (page: number | "...") => {
    if (
      page !== "..." &&
      page !== currentPage &&
      page >= 1 &&
      page <= totalPages
    ) {
      const newSkip = (page - 1) * limit;
      const adjustedSkip = Math.min(newSkip, (totalPages - 1) * limit);
      onPageChange(adjustedSkip);
    }
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex gap-8">
      {/* Previous Page Button */}
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:text-gray-300"
      >
        <ArrowLeft />
      </button>

      {/* Page Number Buttons */}
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => handleClick(page)}
          disabled={page === "..." || page === currentPage}
          className={`pagination-button disabled:text-blue-500 disabled:font-bold ${
            page === currentPage ? "text-blue-500" : ""
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Page Button */}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="disabled:text-gray-300"
      >
        <ArrowRight />
      </button>
    </div>
  );
}
