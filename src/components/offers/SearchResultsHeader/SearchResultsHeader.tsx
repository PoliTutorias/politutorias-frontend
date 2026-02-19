'use client';

interface SearchResultsHeaderProps {
  totalResults: number;
}

export function SearchResultsHeader({ totalResults }: SearchResultsHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800">
        {totalResults} resultados
      </h2>
    </div>
  );
}
