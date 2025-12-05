import Link from "next/link";
import { cn } from "@/lib/css";
import { calculateTotalPages, getPageNumbers } from "./utils";

type Props = {
  currentPage: number;
  totalCount: number;
  perPage: number;
  buildUrl: (page: number) => string;
};

export const Pagination = ({
  currentPage,
  totalCount,
  perPage,
  buildUrl,
}: Props) => {
  const totalPages = calculateTotalPages(totalCount, perPage);

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="mt-16 flex flex-wrap items-center justify-center gap-2 font-[family-name:var(--font-body)] sm:gap-3">
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1)}
          className="group inline-flex items-center gap-2 rounded-lg border border-[var(--color-racing-cyan)]/30 bg-[var(--color-dark-elevated)]/60 px-3 py-2.5 font-medium text-[var(--color-racing-cyan)] backdrop-blur-md transition-all hover:border-[var(--color-racing-cyan)] hover:bg-[var(--color-racing-cyan)]/10 hover:shadow-[var(--color-racing-cyan)]/20 hover:shadow-lg sm:px-5"
        >
          <svg
            className="group-hover:-translate-x-1 h-4 w-4 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">前へ</span>
        </Link>
      )}

      <div className="flex gap-1.5 sm:gap-2">
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span
                key={`ellipsis-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: Ellipsis is not a unique identifier
                  index
                }`}
                className="flex items-center px-2 text-gray-500 sm:px-3"
              >
                ...
              </span>
            );
          }

          const isCurrentPage = page === currentPage;

          return (
            <Link
              key={page}
              href={buildUrl(page)}
              className={cn(
                "min-w-9 rounded-lg border px-3 py-2.5 text-center font-medium text-sm transition-all sm:min-w-10 sm:px-4 sm:text-base",
                isCurrentPage
                  ? "border-[var(--color-racing-cyan)] bg-[var(--color-racing-cyan)]/20 text-[var(--color-racing-cyan)] shadow-[var(--color-racing-cyan)]/20 shadow-lg"
                  : "border-[var(--color-racing-cyan)]/30 bg-[var(--color-dark-elevated)]/60 text-gray-300 backdrop-blur-md hover:border-[var(--color-racing-cyan)] hover:bg-[var(--color-racing-cyan)]/10 hover:text-[var(--color-racing-cyan)]",
              )}
              aria-current={isCurrentPage ? "page" : undefined}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {currentPage < totalPages && (
        <Link
          href={buildUrl(currentPage + 1)}
          className="group inline-flex items-center gap-2 rounded-lg border border-[var(--color-racing-cyan)]/30 bg-[var(--color-dark-elevated)]/60 px-3 py-2.5 font-medium text-[var(--color-racing-cyan)] backdrop-blur-md transition-all hover:border-[var(--color-racing-cyan)] hover:bg-[var(--color-racing-cyan)]/10 hover:shadow-[var(--color-racing-cyan)]/20 hover:shadow-lg sm:px-5"
        >
          <span className="hidden sm:inline">次へ</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      )}
    </nav>
  );
};
