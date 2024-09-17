import * as React from "react";
import { type DataItem, generateMockData } from "../tests/mockDataGenerator";

export function useDataManagement() {
  const itemsPerPage = 20;
  const [items, setItems] = React.useState<DataItem[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Filters and sorting state
  const [search, setSearch] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [sortBy, setSortBy] = React.useState<string>("name");

  // Fetch data asynchronously
  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await generateMockData();
        setItems(response);
        setTotalPages(Math.ceil(response.length / itemsPerPage));
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Pagination logic
  const paginatedItems = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  // Filter items based on search and category
  const filteredItems = React.useMemo(() => {
    let result = [...items];

    if (search) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(item => item.category === category);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "category") {
        return a.category.localeCompare(b.category);
      } else if (sortBy === "dateAdded") {
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      }
      return 0;
    });

    return result;
  }, [items, search, category, sortBy]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    items: filteredItems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ),
    totalItems: filteredItems.length,
    totalPages,
    isLoading,
    error,
    search,
    setSearch,
    category,
    setCategory,
    sortBy,
    setSortBy,
    currentPage,
    nextPage,
    previousPage,
  };
}
