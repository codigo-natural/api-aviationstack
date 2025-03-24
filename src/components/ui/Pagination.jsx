// src/components/ui/Pagination.jsx
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <nav className="flex space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700"
            }`}
          data-testid="prev-page"
        >
          Anterior
        </button>

        <button
          onClick={() => onPageChange(page)}
          className="text-sm"
          data-testid="current-page"
        >
          Pagina {currentPage} de {totalPages}
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700"
            }`}
        >
          Siguiente
        </button>
      </nav>
    </div>
  );
}
