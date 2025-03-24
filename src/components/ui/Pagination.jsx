import { useMemo } from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxVisiblePages = 3;

  const visiblePages = useMemo(() => {
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <nav className="flex space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 bg-blue-500 rounded-md ${currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-white dark:hover:bg-gray-700"
            }`}
          data-testid="prev-page"
        >
          Anterior
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md ${currentPage === page
              ? "bg-blue-500 text-white"
              : "text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700"
              }`}
            data-testid="page"
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 bg-blue-500 rounded-md ${currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "dark:hover:bg-blue-700"
            }`}
          data-testid="next-page"
        >
          Siguiente
        </button>
      </nav>
    </div>
  );
}
