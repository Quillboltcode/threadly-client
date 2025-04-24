import React, { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import SearchService from '../services/searchService';
import { Post } from '../types/post';
import LoadingSpinner from '../components/LoadingSpinner';
import PostCard from '../components/PostCard';
import { useSearchParams } from 'react-router';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>('');
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false); // Track if a search has been triggered

  // Use React Query with manual refetching
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['search', query],
    queryFn: () => SearchService.searchPosts(query),
    enabled: false, // Disable automatic fetching
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10, // Cache results for 10 minutes
  });

  const searchResults: Post[] = data || [];

  // Extract query from URL when component mounts or URL changes
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setQuery(urlQuery);
      // Trigger search with the URL query
      setSearchTriggered(true);
      // Use setTimeout to ensure state is updated before refetch
      setTimeout(() => {
        refetch();
      }, 0);
    }
  }, [searchParams, refetch]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      // Clear results and reset the UI state
      setSearchTriggered(false);
      setSearchParams({});
      return;
    }

    // Trigger the API call
    await refetch();
    setSearchTriggered(true); // Mark that a search has been triggered
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* Loading/Error States */}
      {isLoading && <LoadingSpinner />}
      {isError && (
        <div className="text-center text-red-500">
          {(error as Error).message || 'An error occurred while searching.'}
        </div>
      )}

      {/* Results or Empty State */}
      {searchTriggered && searchResults.length > 0 ? (
        searchResults.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        searchTriggered && !isLoading && (
          <div className="text-center text-gray-500">No results found.</div>
        )
      )}
    </div>
  );
};

export default SearchPage;