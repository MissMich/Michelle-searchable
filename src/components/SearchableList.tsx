import { useDataManagement } from "../hooks/useDataManagement";

export const SearchableList = () => {
  const {
    items,
    isLoading,
    error,
    totalPages,
    currentPage,
    setSearch,
    setCategory,
    setSortBy,
    nextPage,
    previousPage,
  } = useDataManagement();

  return (
    <div className="rounded-md border border-neutral-200 text-sm">
      <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2 border-b border-b-neutral-200 p-4">
        <input
          type="search"
          placeholder="Search by name..."
          className="h-9 w-full rounded-md border px-2 text-sm placeholder:text-xs sm:basis-1/4"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="block h-9 w-full appearance-none rounded-md border bg-white px-2 text-sm"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
        </select>

        <select
          className="block h-9 w-full appearance-none rounded-md border bg-white px-2 text-sm"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="dateAdded">Date</option>
        </select>
      </div>

      <div className="p-4">
        {isLoading && <p data-test-id="loading-indicator">Loading...</p>}
        {error && <p data-test-id="error-indicator">{error}</p>}
        {items.map((item) => (
          <div key={item.id} data-test-id="list-item">
            <p data-test-id="list-item-name">{item.name}</p>
            <p data-test-id="list-item-description">{item.description}</p>
            <p data-test-id="list-item-category">{item.category}</p>
            <p data-test-id="list-item-date">{item.dateAdded}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between p-4">
        <button
          disabled={currentPage === 1}
          onClick={previousPage}
          data-test-id="previous-page-button"
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          disabled={currentPage === totalPages}
          onClick={nextPage}
          data-test-id="next-page-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};
