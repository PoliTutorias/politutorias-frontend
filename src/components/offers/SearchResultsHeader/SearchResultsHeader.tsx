'use client';

interface SearchResultsHeaderProps {
  totalResults: number;
}

export function SearchResultsHeader({ totalResults }: SearchResultsHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-sm font-medium text-gray-700">
        {totalResults} resultados
      </h2>
    </div>
  );
}
