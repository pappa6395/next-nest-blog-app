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