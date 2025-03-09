import { DEFAULT_PAGE_SIZE } from "./constants";

export function transformTakeSkip({page, pageSize=DEFAULT_PAGE_SIZE}: {page?: number; pageSize?: number}) {
    
    const skip = page ? (page - 1) * pageSize : 0;
    return {
        skip, 
        take: pageSize
    };
}

export function calculatePageNumbers({
    pageNeighbors,
    totalPages,
    currentPage,
  }: {
    pageNeighbors: number;
    totalPages: number;
    currentPage: number;
  }) {
    const totalNumbers = pageNeighbors * 2 + 3;
    const totalBlocks = totalNumbers + 2;
  
  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - pageNeighbors);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);

    let pages: (number | string)[] = Array.from(
      {
        length: endPage - startPage + 1,
      },
      (_, i) => startPage + i
    );
    if (startPage > 2) pages = ["...", ...pages];
    if (endPage < totalPages - 1) pages = [...pages, "..."];
    return [1, ...pages, totalPages];
  }
  
  return Array.from({ length: totalPages }, (_, i) => i + 1);
}

export function formatCreatedDate(createdDate: Date | undefined): string {
  const day = createdDate?.getDate()?? undefined;
  const month = createdDate?.toLocaleString('default', { month: 'short' })?? undefined;
  const year = createdDate?.getFullYear()?? undefined;

  const daySuffix = (day: number | undefined): string => {
      if (day && day >= 11 && day <= 13) return "th";
      switch (day && day % 10) {
          case 1: return "st";
          case 2: return "nd";
          case 3: return "rd";
          default: return "th";
      }
  };

  return `${day}-${month}-${year}`;
}