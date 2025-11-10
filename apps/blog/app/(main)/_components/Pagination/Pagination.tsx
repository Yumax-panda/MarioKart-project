import Link from "next/link";
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
    <nav className="mt-12 flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1)}
          className="rounded-lg border border-teal-400/20 bg-[#1a1a2e]/60 px-4 py-2 text-teal-300 backdrop-blur-lg transition-all hover:border-teal-400/40 hover:bg-[#1a1a2e]/80"
        >
          ← 前へ
        </Link>
      )}

      <div className="flex gap-2">
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span
                key={`ellipsis-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: Ellipsis is not a unique identifier
                  index
                }`}
                className="px-3 py-2 text-gray-500"
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
              className={`min-w-10 rounded-lg border px-3 py-2 text-center transition-all ${
                isCurrentPage
                  ? "border-teal-400 bg-teal-400/10 font-bold text-teal-300"
                  : "border-teal-400/20 bg-[#1a1a2e]/60 text-gray-300 backdrop-blur-lg hover:border-teal-400/40 hover:bg-[#1a1a2e]/80"
              }`}
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
          className="rounded-lg border border-teal-400/20 bg-[#1a1a2e]/60 px-4 py-2 text-teal-300 backdrop-blur-lg transition-all hover:border-teal-400/40 hover:bg-[#1a1a2e]/80"
        >
          次へ →
        </Link>
      )}
    </nav>
  );
};
